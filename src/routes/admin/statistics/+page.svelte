<script lang="ts">
	import ParkingSpotUtilization from '$lib/components/statistics/ParkingSpotUtilization.svelte';
	import Table from '$lib/components/statistics/Table.svelte';
	import { onMount } from 'svelte';
	import { GetThemeStatistics, GetAllBookings } from '$lib/Api';
	import Statistics from '$lib/helpers/Statistics';
	import { users } from '$lib/stores/stores';
	import type { BookingStatistic, ParkingSpotStatistic, ThemeStatistic } from '$lib/model/models.js';
	import Loader from '$lib/components/Loader.svelte';
	
	let isLoading = true;
	let error: string;
	let statistics: Statistics;
	let themeStatistics: ThemeStatistic[];
	let parkingSpotStatistics: ParkingSpotStatistic[];
	let weeklyBookingStatsistics: BookingStatistic[];
	let allTimeBookingStatistics: BookingStatistic[];
	

	onMount(async () => {
		try {
			const bookings = await GetAllBookings(fetch);
			themeStatistics = await GetThemeStatistics(fetch);
			statistics = new Statistics(bookings, $users);
			parkingSpotStatistics = statistics.getParkingSpotStatistics();
			allTimeBookingStatistics = statistics.getBookingStatistics();
			weeklyBookingStatsistics = statistics.getWeeklyBookingStatistics();
		}
		catch (ex) {
			console.error(ex);
			error = "Noe gikk galt under henting av data";
		}
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="loader">
		<Loader style={{color: '--neutral-70', size: '30px', thickness: '5px'}} />
	</div>
{:else if error}
	<p>{error}</p>
{:else}
	<section>
		<ParkingSpotUtilization parkingSpotUtilization={parkingSpotStatistics} />
		
		<Table
			title="Bookinger siste 7 dager:"
			headers={['Bruker', 'Antall bookinger']}
			columns={['userName', 'bookings']}
			rows={weeklyBookingStatsistics}
		/>
		
		<Table
			title="Alle bookinger (siden august 2024):"
			headers={['Bruker', 'Antall bookinger']}
			columns={['userName', 'bookings']}
			rows={allTimeBookingStatistics}
		/>
		
		<Table
			title="Temaer:"
			headers={['Tema', 'Antall brukere']}
			columns={['label', 'users']}
			rows={themeStatistics}
		/>
	</section>
{/if}

<style>
	section {
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding-bottom: 5rem;
	}

	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p {
		color: var(--error);
	}

</style>
