<script lang="ts">
	import { bookingDays, parkingSpots } from '$lib/stores/stores'
	import YourBookings from '$lib/components/YourBookings.svelte';
	import PlusIcon from '$lib/components/PlusIcon.svelte';
	
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
