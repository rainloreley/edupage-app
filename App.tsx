import * as React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationController } from './components/NavigationController';
import { ThemeProvider } from './theme/ThemeProvider';
import { NativeBaseProvider } from 'native-base';

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
					<NavigationController />
				</ThemeProvider>
			</AppearanceProvider>
		</NativeBaseProvider>
	);
}
