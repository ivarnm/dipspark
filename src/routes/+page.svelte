<script>
	import { bookingDays, parkingSpots } from '$lib/stores/stores.js'
	import Name from '$lib/components/Name.svelte';
	import YourBookings from '$lib/components/YourBookings.svelte';
	import PlusIcon from '$lib/components/PlusIcon.svelte';
	
	/** @type {import('./$types').PageData} */
	export let data;

	$: $bookingDays = data.bookingDays;
	$: $parkingSpots = data.parkingSpots;

</script>

<div class="index">
	<div>
		<Name />
		<YourBookings />
		<PlusIcon />
	</div>
</div>

<style>

</style>
