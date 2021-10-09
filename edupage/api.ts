import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

class EdupageAPI {
	apiUrl: string;
	apiKey: string | null;
	edupageOrigin: string | null;
	constructor() {
		this.apiUrl =
			'https://rainloreley-edupageapi-rwggq9qqcx99g-8080.githubpreview.dev';
		this.apiKey = null;
		this.edupageOrigin = null;
		this.getApiKey();
	}

	async getApiKey() {
		this.apiKey = await SecureStore.getItemAsync('edupage_apiKey');
		this.edupageOrigin = await SecureStore.getItemAsync('edupage_origin');
	}

	async login(username: string, password: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.post<any>(`${this.apiUrl}/user/login`, {
					username: username,
					password: password,
				})
				.then(async (response) => {
					const sessionid = response.data.sessionid;
					const origin = response.data.origin;

					if (typeof origin !== 'string' || typeof sessionid !== 'string')
						return reject('invalid response');

					await SecureStore.setItemAsync('edupage_apiKey', sessionid);
					await SecureStore.setItemAsync('edupage_origin', origin);

					resolve(true);
				})
				.catch((err) => {
					const errdata = err.response.data;
					if (errdata !== undefined && errdata.hasOwnProperty('err')) {
						console.log(errdata.err);
						reject(errdata.err);
					} else {
						console.log(err);
						reject(err);
					}
				});
		});
	}
}

const GlobalEdupageAPI = new EdupageAPI();

export default GlobalEdupageAPI;
