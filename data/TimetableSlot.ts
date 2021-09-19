// a single lesson in a timetable
export class TimetableSlot {
	classname?: string;
	period: TimetableSlotTimes;
	teacher?: string;
	isfree: boolean;

	constructor(
		classname: string,
		period: TimetableSlotTimes,
		teacher: string,
		isfree: boolean = false
	) {
		this.classname = classname;
		this.period = period;
		this.teacher = teacher;
		this.isfree = isfree;
	}
}

export interface TimetableSlotTimes {
	humanReadable: string;
	start: number;
	end: number;
}
