import { useState, useEffect, useContext, createContext } from 'react';
import * as React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { useColorScheme } from 'react-native-appearance';
import { lightColors, darkColors } from './colorThemes';

export const ThemeContext = createContext({
	isDark: false,
	colors: lightColors,
	setScheme: (scheme: string) => {},
});

export const ThemeProvider = (props: any) => {
	const colorScheme = useColorScheme();

	const [isDark, setIsDark] = useState(colorScheme === 'dark');
	useEffect(() => {
		console.log(colorScheme);
		setIsDark(colorScheme === 'dark');
	}, [colorScheme]);

	const defaultTheme = {
		isDark,
		colors: isDark ? darkColors : lightColors,
		setScheme: (scheme: string) => setIsDark(scheme === 'dark'),
	};

	return (
		<ThemeContext.Provider value={defaultTheme}>
			<StatusBar
				backgroundColor={defaultTheme.colors.systemBackground}
				barStyle={isDark ? 'light-content' : 'dark-content'}
			/>
			{props.children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
