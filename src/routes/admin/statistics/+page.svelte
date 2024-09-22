<script lang="ts">
	import ParkingSpotUtilization from '$lib/components/statistics/ParkingSpotUtilization.svelte';
	import Table from '$lib/components/statistics/Table.svelte';

	export let data;
</script>

<section>
  <ParkingSpotUtilization parkingSpotUtilization={data.parkingSpotUtilizationStatistics ?? []} />

	<Table
		title="Bookinger siste 7 dager:"
		headers={['Bruker', 'Antall bookinger']}
		columns={['userName', 'bookings']}
		rows={data.weeklyBookingStatsistics ?? []}
	/>

	<Table
		title="Alle bookinger (siden august 2024):"
		headers={['Bruker', 'Antall bookinger']}
		columns={['userName', 'bookings']}
		rows={data.allTimeBookingStatistics ?? []}
	/>

	<Table
		title="Temaer:"
		headers={['Tema', 'Antall brukere']}
		columns={['label', 'users']}
		rows={data.themeStatistics ?? []}
	/>
</section>

<style>
	section {
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding-bottom: 5rem;
	}
</style>
