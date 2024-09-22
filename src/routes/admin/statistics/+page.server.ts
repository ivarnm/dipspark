import type { PageServerLoad } from './$types';
import {
	GetThemeStatistics,
	GetBookingStatistics,
	GetParkingSpotUtilizationStatistics
} from '$lib/Api';

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const { user, users } = await parent();

	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

	let themeStatistics = null;
	let parkingSpotUtilizationStatistics = null;
	let allTimeBookingStatistics = null;
	let weeklyBookingStatsistics = null;

	if (user && users) {
		[
			themeStatistics,
			parkingSpotUtilizationStatistics,
			allTimeBookingStatistics,
			weeklyBookingStatsistics
		] = await Promise.all([
			GetThemeStatistics(fetch),
			GetParkingSpotUtilizationStatistics(fetch, users),
			GetBookingStatistics(fetch),
			GetBookingStatistics(fetch, oneWeekAgo.toISOString().split('T')[0])
		]);
	}

	return {
		themeStatistics,
		parkingSpotUtilizationStatistics,
		allTimeBookingStatistics,
		weeklyBookingStatsistics
	};
};
