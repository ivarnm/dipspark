<script>
  /** @type {import('./$types').PageData} */
export let data;

import NewBooking from "$lib/components/NewBooking.svelte";

</script>

<div>
  <NewBooking bookingDays={data.bookingDays} />
</div>

<style>

</style>