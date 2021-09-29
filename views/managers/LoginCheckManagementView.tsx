import { Spinner } from 'native-base';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Screen } from '../../components/Screen';
import { useNavigation } from '@react-navigation/native';
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type loginCheckViewProp = NativeStackNavigationProp<
	RootStackParamList,
	'LoginCheck'
>;

const LoginCheckManagementView = () => {
	const navigation = useNavigation<loginCheckViewProp>();
	React.useEffect(() => {
		console.log('LoginCheckManagementView');
		async function checkLoginCreds() {
			console.log('checking login creds');
			const loginData = await SecureStore.getItemAsync('login_creds');
			if (loginData !== null) {
				navigation.replace('Home');
			} else {
				navigation.replace('Login');
			}
		}
		checkLoginCreds();
	}, []);
	return <Screen></Screen>;
};

export { LoginCheckManagementView };
