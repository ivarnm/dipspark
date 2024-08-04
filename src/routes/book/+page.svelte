<script lang="ts">
  import { bookingDays, parkingSpots, user } from '$lib/stores/stores'
  import User from '$lib/helpers/User'
  import NewBooking from "$lib/components/NewBooking.svelte";
  import NewCancellation from '$lib/components/NewCancellation.svelte';
  
  export let data;

  $: $bookingDays = data.bookingDays;
	$: $parkingSpots = data.parkingSpots;
  $: isDefaultUser = User.isDefaultUser($user, $parkingSpots)

</script>

<div>
  {#if isDefaultUser}
    <NewCancellation />
  {:else}
    <NewBooking />
  {/if}
</div>

<style>

</style>