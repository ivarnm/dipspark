<script>
  import { bookingDays, parkingSpots } from '$lib/stores/stores.js'
  import NewBooking from "$lib/components/NewBooking.svelte";
  
  /** @type {import('./$types').PageData} */
  export let data;

  $: $bookingDays = data.bookingDays;
	$: $parkingSpots = data.parkingSpots;

</script>

<div>
  <NewBooking />
</div>

<style>

</style>