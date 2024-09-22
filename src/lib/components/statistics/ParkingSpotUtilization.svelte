<script lang="ts">
	import { TOTAL_PARKING_SPOTS } from '$lib/constants';
	import type { ParkingSpotUtilizationStatistic } from '$lib/model/models';

	export let parkingSpotUtilization: ParkingSpotUtilizationStatistic[];

	const now = new Date();

	const isSameMonthAndYear = (date: Date, referenceDate: Date): boolean => {
		return (
			date.getFullYear() === referenceDate.getFullYear() &&
			date.getMonth() === referenceDate.getMonth()
		);
	};

	const calculateAverageSpotsUsed = (stats: ParkingSpotUtilizationStatistic[]): number => {
		if (stats.length === 0) return 0;
		return stats.reduce((sum, stat) => sum + stat.spotsUsed, 0) / stats.length;
	};

	const currentMontParkings = parkingSpotUtilization.filter((stat) =>
		isSameMonthAndYear(new Date(stat.date), now)
	);

	const averageUtilization = calculateAverageSpotsUsed(parkingSpotUtilization);
	const currentMonthUtilization = calculateAverageSpotsUsed(currentMontParkings);

  const formatUtilization = (utilization: number): string => {
    return `${utilization.toFixed(1)} (${((utilization / TOTAL_PARKING_SPOTS) * 100).toFixed(1)}%)`;
  };
</script>

<section>
  <div>
    <h2>Belegg på parkeringsplasser (gjennomsnitt for hverdager):</h2>
    <p>Denne måneden: {formatUtilization(currentMonthUtilization)}</p>
    <p>Totalt: {formatUtilization(averageUtilization)}</p>
  </div>
  <div>
    <h2>Fullbookede hverdager:</h2>
    <p>Denne måneden: {currentMontParkings.filter(p => p.spotsUsed == TOTAL_PARKING_SPOTS).length}/{currentMontParkings.length}</p>
    <p>Totalt: {parkingSpotUtilization.filter(p => p.spotsUsed == TOTAL_PARKING_SPOTS).length}/{parkingSpotUtilization.length}</p>
  </div>
</section>

<style>
	section {
		color: var(--neutral-70);
    display: flex;
    flex-direction: column;
    gap: 3rem;
	}

	h2 {
		margin: 0 0 10px 0;
		font-size: 1.2rem;
	}
</style>
