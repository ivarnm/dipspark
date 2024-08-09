<script lang="ts">
  import NewBooking from "$lib/components/NewBooking.svelte";
  import NewCancellation from '$lib/components/NewCancellation.svelte';
	import { user } from "$lib/stores/stores.js";
</script>

<div>
  {#if $user.hasPermanentParkingSpot}
    <NewCancellation />
  {:else}
    <NewBooking />
  {/if}
</div>
