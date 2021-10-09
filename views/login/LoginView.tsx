import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	Box,
	Button,
	Center,
	Container,
	Input,
	Spinner,
	Text,
	View,
} from 'native-base';
import * as React from 'react';
import { RootStackParamList } from '../../App';
import { Screen } from '../../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import GlobalEdupageAPI from '../../edupage/api';

type loginViewProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginView = () => {
	const navigation = useNavigation<loginViewProp>();
	const { colors, isDark } = useTheme();

	const [enteredUsername, setEnteredUsername] = React.useState('');
	const [enteredPassword, setEnteredPassword] = React.useState('');

	const signingInMessages = [
		'Talking to Edupage',
		'Contacting Space Commander',
		'Calculating the answer to life, the universe and everything',
		'owo?',
	];

	const [isSigningIn, setIsSigningIn] = React.useState(false);
	const [error, setError] = React.useState('');

	function signIn() {
		setIsSigningIn(true);
		setError('');
		// check if username and password were entered
		if (enteredUsername !== '' && enteredPassword !== '') {
			// owo?
			if (
				enteredUsername.toLowerCase() === 'owo' &&
				enteredPassword.toLowerCase() === 'owo'
			) {
				// owo time
				setError('nani?');
				setIsSigningIn(false);
			} else {
				// sign in with Edupage
				/*
				TODO:

				The library I wanted to use doesn't work on iOS because of Regex.
				I didn't find a way to fix it yet, but the current plan is to create an independent HTTP API for the app.
				It's supposed to be something between the app and Edupage.
				The library can't be used for that because the way it works is that you create an instance of `Edupage`
				and sign in. The user information including the Cookie needed for authentication is stored in this instance.

				That won't work with a separate HTTP API because you'd have to send your username and password to the server
				every time you make a request. This would mean that the device has to store the username and password, which is bad.

				So TL;DR: I'm too lazy to write the API now, but I'll do that asap.

				(The code below is the sign in code from the library I used.)
				*/
				/*GlobalEdupageInstance.login(enteredUsername, enteredPassword)
					.then((user: any) => {
						// success
						navigation.replace('Home');
					})
					.catch((err: any) => {
						setIsSigningIn(false);
						setError(err);
					});*/

				GlobalEdupageAPI.login(enteredUsername, enteredPassword)
					.then((result) => {
						navigation.replace('Home');
					})
					.catch((err) => {
						console.log(err);
						setIsSigningIn(false);
						setError(`An error occurred: ${err}`);
					});
			}
		} else {
			setError('Please enter a username and password');
			setIsSigningIn(false);
		}
	}

	return (
		<Screen>
			<Container
				justifyContent="space-between"
				height="100%"
				width="100%"
				maxWidth="100%"
			>
				<Box marginX="4" marginY="4" marginTop="16">
					<Text w="100%" fontWeight="bold" fontSize="4xl" color={colors.label}>
						Login
					</Text>
				</Box>
				<View
					style={{
						alignContent: 'center',
						display: 'flex',
						width: '100%',
					}}
				>
					<Container alignSelf="center" width="100%">
						<Text underline color={colors.label}>
							Username
						</Text>
						<Input
							value={enteredUsername}
							onChangeText={(text) => setEnteredUsername(text)}
							color={colors.label}
							placeholder="Username"
							width="100%"
							marginTop="2"
							type="username"
						></Input>
					</Container>
					<Container alignSelf="center" width="100%" marginTop="4">
						<Text underline color={colors.label}>
							Password
						</Text>
						<Input
							value={enteredPassword}
							type="password"
							color={colors.label}
							onChangeText={(text) => setEnteredPassword(text)}
							placeholder="Password"
							width="100%"
							marginTop="2"
						></Input>
					</Container>
					{isSigningIn ? (
						<Container
							width="200px"
							alignSelf="center"
							marginTop="8"
							alignItems="center"
						>
							<Spinner />
							<Text
								textAlign="center"
								color={colors.secondaryLabel}
								marginTop="2"
							>
								{
									signingInMessages[
										Math.floor(Math.random() * signingInMessages.length)
									]
								}
							</Text>
						</Container>
					) : (
						<Button
							width="200px"
							alignSelf="center"
							marginTop="8"
							bg={colors.systemBlue}
							borderRadius="12px"
							onPress={() => {
								signIn();
							}}
						>
							<Text color="#fff">Sign in</Text>
						</Button>
					)}
					<Text
						alignSelf="center"
						marginTop="4"
						marginX="4"
						color={colors.systemRed}
					>
						{error}
					</Text>
				</View>
				<Container />
			</Container>
		</Screen>
	);
};

export { LoginView };
