import { TimetableSlot, TimetableSlotTimes } from './TimetableSlot';

// a day of the timetable
export class TimetableDay {
	day: DayOfWeek;
	slots: TimetableSlot[];

	constructor(day: DayOfWeek, slots: TimetableSlot[]) {
		this.day = day;
		this.slots = slots;
	}

	get getStartOfDay(): number {
		if (typeof this.slots[0] === 'object') {
			return this.slots[0].period.start;
		} else {
			return 0;
		}
	}

	get getEndOfDay(): number {
		let lastEntry = this.slots[this.slots.length - 1];
		if (typeof lastEntry === 'object') {
			return lastEntry.period.end;
		} else {
			return 0;
		}
	}
}

// all days of the week
export enum DayOfWeek {
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
	Sunday = 0,
}

// standard lesson periods
// TODO: replace this with edupage
export class DayPeriods {
	static readonly ONE: TimetableSlotTimes = {
		humanReadable: '1',
		start: 755,
		end: 840,
	};
	static readonly TWO: TimetableSlotTimes = {
		humanReadable: '2',
		start: 845,
		end: 930,
	};
	static readonly THREE: TimetableSlotTimes = {
		humanReadable: '3',
		start: 945,
		end: 1030,
	};
	static readonly FOUR: TimetableSlotTimes = {
		humanReadable: '4',
		start: 1035,
		end: 1120,
	};
	static readonly FIVE: TimetableSlotTimes = {
		humanReadable: '5',
		start: 1135,
		end: 1220,
	};
	static readonly SIX: TimetableSlotTimes = {
		humanReadable: '6',
		start: 1225,
		end: 1305,
	};
	static readonly SEVEN: TimetableSlotTimes = {
		humanReadable: '7',
		start: 1310,
		end: 1355,
	};
	static readonly EIGHT: TimetableSlotTimes = {
		humanReadable: '8',
		start: 1400,
		end: 1445,
	};
	static readonly NINE: TimetableSlotTimes = {
		humanReadable: '9',
		start: 1450,
		end: 1535,
	};
	static readonly TEN: TimetableSlotTimes = {
		humanReadable: '10',
		start: 1550,
		end: 1635,
	};
	static readonly ELEVEN: TimetableSlotTimes = {
		humanReadable: '11',
		start: 1640,
		end: 1725,
	};
}
