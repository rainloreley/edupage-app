import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Screen } from '../components/Screen';
import { useTheme } from '../theme/ThemeProvider';
import {
	Center,
	NativeBaseProvider,
	ScrollView,
	VStack,
	Text,
	Box,
	HStack,
	ZStack,
} from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import * as Icon from 'react-native-feather';
import { DayOfWeek } from '../data/TimetableDay';
import { timetable as sampletimetable } from '../data/sampledata';
import { TimetableSlot } from '../data/TimetableSlot';

const MainView = () => {
	const { colors, isDark } = useTheme();
	const [remainingLessons, setRemainingLessons] = React.useState<
		TimetableSlot[]
	>([]);
	const [currentTimetableSlot, setCurrentTimetableSlot] = React.useState<
		TimetableSlot | undefined
	>(undefined);
	const [dayPercentageDone, setDayPercentageDone] = React.useState(0);
	const [nextLesson, setNextLesson] = React.useState<string | undefined>(
		undefined
	);
	const [titleText, setTitleText] = React.useState<string>('');

	const styles = StyleSheet.create({
		listitembox: {
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.29,
			shadowRadius: 4.65,

			elevation: 7,
			backgroundColor: colors.tertiarySystemBackground,
			borderColor: colors.separator,
			borderRadius: 8,
			margin: 8,
			padding: 6,
		},
	});

	function calculateDayProgressColors(): string[] {
		// add colors to the day progress bar based on the percentage done
		var array = [colors.systemPurple, colors.systemRed];
		if (dayPercentageDone > 0.25) {
			array.push(colors.systemOrange);
		}
		if (dayPercentageDone > 0.5) {
			array.push(colors.systemYellow);
		}
		if (dayPercentageDone > 0.75) {
			array.push(colors.systemGreen);
		}
		return array;
	}

	function formatTime(time: number): string {
		// formats the stored times (hhmm) to a human readable format (hh:mm)

		// convert the number to a string
		var _timeToString = `${time}`;
		var hour = _timeToString.substring(0, _timeToString.length - 2);
		var minutes = _timeToString.substring(
			_timeToString.length - 2,
			_timeToString.length
		);
		var output = `${hour}:${minutes}`;
		return output;
	}

	React.useEffect(() => {
		var d = new Date();
		d.setDate(d.getDate() - 2);
		d.setHours(14);
		d.setMinutes(0);
		var weekday: DayOfWeek = d.getDay();
		console.log(weekday);
		const timetable = sampletimetable.find((e) => e.day === weekday);
		if (typeof timetable !== 'undefined') {
			// found a timetable for the current day
			var formattedMinutes = '';
			if (d.getMinutes() < 10) {
				formattedMinutes = `0${d.getMinutes()}`;
			} else {
				formattedMinutes = `${d.getMinutes()}`;
			}
			const currentTime = parseInt(`${d.getHours()}${formattedMinutes}`);
			console.log(currentTime);
			const _remainingLessons = timetable.slots.filter(
				(e) => e.period.end >= currentTime
			);
			setRemainingLessons(_remainingLessons);
			console.log('list');
			for (var lesson of _remainingLessons) {
				if (
					lesson.period.start <= currentTime &&
					lesson.period.end >= currentTime
				) {
					// found the current lesson
					console.log(lesson);
					setCurrentTimetableSlot(lesson);
				}
			}

			// calculate the percentage of the day done
			const dayStart = timetable.getStartOfDay;
			const dayEnd = timetable.getEndOfDay;

			const dayLength = dayEnd - dayStart;
			const alreadyPassed = currentTime - dayStart;
			var _percentageDone = alreadyPassed / dayLength;
			if (_percentageDone > 1) {
				_percentageDone = 1;
			}
			setDayPercentageDone(_percentageDone);

			// set title text
			console.log(_percentageDone);
			if (_percentageDone === 0) {
				setTitleText('Guten Morgen!');
			} else if (currentTimetableSlot?.isfree) {
				setTitleText('Zeit für eine Pause');
			} else if (_percentageDone < 0.5) {
				setTitleText('Wie gehts?');
			} else if (_percentageDone < 0.75) {
				setTitleText('Guten Tag!');
			} else if (_percentageDone < 1) {
				setTitleText('Endspurt!');
			} else if (_percentageDone >= 1) {
				setTitleText('Fertig!!');
			}

			// get next lesson
			const _nextlesson = timetable.slots.filter(
				(e) => e.period.start > currentTime && !e.isfree
			)[0];
			console.log(_nextlesson);
			const _nextlessonname =
				typeof _nextlesson !== 'undefined' ? _nextlesson.classname : undefined;
			setNextLesson(_nextlessonname);
		} else {
			setTitleText('Keinen Stundenplan für heute');
		}
	}, []);

	return (
		<Screen>
			<Box marginX="4" marginY="4" marginTop="16">
				<Text w="100%" fontWeight="bold" fontSize="4xl" color={colors.label}>
					{titleText}
				</Text>

				<Box w="80%" h="3" display="flex" marginTop={2}>
					<ZStack>
						<Box bg={colors.systemGray2} borderRadius={12} h="3" w="100%" />
						<Box
							h="3"
							borderRadius={12}
							width={`${100 * dayPercentageDone}%`}
							bg={{
								linearGradient: {
									colors: calculateDayProgressColors(),
									start: [0, 0],
									end: [1, 0],
								},
							}}
						></Box>
					</ZStack>
				</Box>
				{nextLesson ? (
					<HStack marginTop="2">
						<Text color={colors.secondaryLabel}>Gleich: </Text>
						<Text color={colors.secondaryLabel} fontWeight="bold">
							{nextLesson}
						</Text>
					</HStack>
				) : (
					<Text></Text>
				)}
			</Box>
			<FlatGrid
				itemDimension={150}
				style={{ flex: 1, flexGrow: 0.5 }}
				data={[
					{
						title: 'Stundenplan',
						icon: <Icon.Clock stroke="#ff0000" />,
					},
					{
						title: 'Vertretungsplan',
						icon: <Icon.Edit stroke="#ff0000" />,
					},
					{
						title: 'Noten',
						icon: <Icon.Info stroke="#ff0000" />,
					},
					{
						title: 'Hausaufgaben',
						icon: <Icon.BookOpen stroke="#ff0000" />,
					},
					{
						title: 'Kurse',
						icon: <Icon.Star stroke="#ff0000" />,
					},
				]}
				renderItem={({ item }) => (
					<Box style={styles.listitembox} key={item.title}>
						<HStack>
							{item.icon}
							<Text marginLeft={4} color={colors.label}>
								{item.title}
							</Text>
						</HStack>
					</Box>
				)}
			/>
			{remainingLessons.length > 0 && dayPercentageDone < 1 ? (
				<Text
					fontWeight="700"
					fontSize="2xl"
					color={colors.label}
					marginX={3}
					marginTop={4}
				>
					Verbleibende Stunden:
				</Text>
			) : (
				<Text></Text>
			)}
			{remainingLessons.length > 0 && dayPercentageDone < 1 ? (
				<ScrollView marginTop={4} flex={1}>
					{remainingLessons.map((e) => (
						<HStack marginX={4} key={e.period.humanReadable}>
							<Center>
								<Text
									color={
										e.period.humanReadable ===
										currentTimetableSlot?.period.humanReadable
											? colors.systemYellow
											: colors.secondaryLabel
									}
									fontWeight="300"
									fontSize="xl"
									w={6}
								>
									{e.period.humanReadable}
								</Text>
							</Center>
							{e.isfree ? (
								<Box margin={2} paddingY={4}></Box>
							) : (
								<Box
									flex={1}
									style={{
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 4 },
										shadowOpacity: 0.3,
										shadowRadius: 4.65,
										elevation: 4,
									}}
									bg={colors.secondarySystemBackground}
									borderRadius={8}
									borderColor={
										e.period.humanReadable ===
										currentTimetableSlot?.period.humanReadable
											? colors.systemYellow
											: colors.systemGray
									}
									borderWidth={
										e.period.humanReadable ===
										currentTimetableSlot?.period.humanReadable
											? 1
											: 0
									}
									margin={2}
									paddingY={4}
								>
									<VStack marginX={2}>
										<Text color={colors.label} fontWeight="700" fontSize="lg">
											{e.classname}
										</Text>
										<Text fontSize="sm" color={colors.secondaryLabel}>
											{formatTime(e.period.start)} - {formatTime(e.period.end)}{' '}
											• {e.teacher}
										</Text>
									</VStack>
								</Box>
							)}
						</HStack>
					))}
				</ScrollView>
			) : (
				<Center>
					<VStack alignItems="center">
						<Text fontSize={40}>🎉</Text>
						<Text
							color={colors.label}
							fontSize={23}
							fontWeight="bold"
							marginTop={2}
						>
							Keine Stunden mehr!
						</Text>
					</VStack>
				</Center>
			)}
		</Screen>
	);
};

export { MainView };
