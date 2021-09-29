import * as React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationController } from './components/NavigationController';
import { ThemeProvider } from './theme/ThemeProvider';
import { NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainView } from './views/MainView';
import { LoginView } from './views/login/LoginView';
import { LoginCheckManagementView } from './views/managers/LoginCheckManagementView';
import { Edupage } from './edupage/api';

type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	LoginCheck: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
//const GlobalEdupageInstance = new Edupage();

export default function App() {
	const nativebaseConfig = {
		dependencies: {
			'linear-gradient': require('expo-linear-gradient').LinearGradient,
		},
	};

	return (
		<NativeBaseProvider config={nativebaseConfig}>
			<AppearanceProvider>
				<ThemeProvider>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName="LoginCheck"
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Screen
								name="LoginCheck"
								component={LoginCheckManagementView}
							/>
							<Stack.Screen name="Home" component={MainView} />
							<Stack.Screen name="Login" component={LoginView} />
						</Stack.Navigator>
					</NavigationContainer>
				</ThemeProvider>
			</AppearanceProvider>
		</NativeBaseProvider>
	);
}

export { RootStackParamList };
