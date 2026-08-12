import type { ClubStat } from './clubStat';

export type ClubData = {
	name: string;
	noOfAttendees: number;
	clubStatus: string;
	country: string;
	level: string;
	stats: ClubStat[];
};
