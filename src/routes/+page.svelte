<script>
	import { bookingDays, parkingSpots } from '$lib/stores/stores.js'
	import YourBookings from '$lib/components/YourBookings.svelte';
	import PlusIcon from '$lib/components/PlusIcon.svelte';
	
	/** @type {import('./$types').PageData} */
	export let data;

	$: $bookingDays = data.bookingDays;
	$: $parkingSpots = data.parkingSpots;

</script>

<div class="index">
	<div>
		<YourBookings />
		<PlusIcon />
	</div>
</div>

<style>

</style>
