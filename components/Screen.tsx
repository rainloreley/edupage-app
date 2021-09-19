import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export const Screen = (props: any) => {
	const { children } = props;

	const { colors, isDark } = useTheme();

	const containerStyle = {
		flex: 1,
		width: '100%',
		backgroundColor: colors.systemBackground,
	};

	return <View style={containerStyle}>{children}</View>;
};
