import { TimetableDay, DayOfWeek, DayPeriods } from './TimetableDay';

// TODO: remove this stuff when it isn't needed anymore
const tuesday = new TimetableDay(DayOfWeek.Tuesday, [
	{
		classname: '5M1',
		period: DayPeriods.THREE,
		teacher: 'Am',
		isfree: false,
	},
	{
		classname: '5M1',
		period: DayPeriods.FOUR,
		teacher: 'Am',
		isfree: false,
	},
	{
		period: DayPeriods.FIVE,
		isfree: true,
	},
	{
		period: DayPeriods.SIX,
		isfree: true,
	},
	{
		period: DayPeriods.SEVEN,
		isfree: true,
	},
	{
		classname: '3Ph3',
		period: DayPeriods.EIGHT,
		teacher: 'Mu',
		isfree: false,
	},
	{
		classname: '3SF1',
		period: DayPeriods.NINE,
		teacher: 'Ga/Egg',
		isfree: false,
	},
	{
		classname: '3SF1',
		period: DayPeriods.TEN,
		teacher: 'Ga/Egg',
		isfree: false,
	},
	{
		classname: '3SF1',
		period: DayPeriods.ELEVEN,
		teacher: 'Ga/Egg',
		isfree: false,
	},
]);

const timetable = [tuesday];

export { timetable };
