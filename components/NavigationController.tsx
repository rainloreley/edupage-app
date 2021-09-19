import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { MainView } from '../views/MainView';
import { Box, Text } from 'native-base';

const Stack = createNativeStackNavigator();
export function NavigationController() {
	const { colors, isDark } = useTheme();
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerLargeTitle: true }}>
				<Stack.Screen
					name="Home"
					component={MainView}
					options={{
						headerShown: false,
						headerLargeTitle: true,
						title: `${isDark}`,
						headerShadowVisible: false,
						headerTitleAlign: 'left',
						headerBlurEffect: 'extraLight',
						headerSearchBarOptions: {
							placeholder: 'Search',
						},
						headerStyle: {
							backgroundColor: colors.secondarySystemBackground,
						},
						headerTitleStyle: {
							color: colors.label,
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
