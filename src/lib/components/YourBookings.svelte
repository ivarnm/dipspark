<script>
	import User from "$lib/helpers/User"
  import BookedDate from '$lib/components/BookedDate.svelte';

  export let bookingDays = []
	
  const userId = User.getLoggedInUser().id;

  $: yourBookings = bookingDays.filter(day => day.bookings.find(booking => booking.userId == userId));
</script>

<div class="container">
	<h2>Dine bookinger</h2>
  {#if yourBookings.length == 0}
    <p>Du har ingen reserverte parkeringer</p>
  {/if}
	{#each yourBookings as bookingDay (bookingDay.date)}
		<BookedDate {bookingDay} style={{backgroundColor: '#81B29A'}} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 10px 0;
	}

	h2 {
		font-size: 20px;
		font-weight: 700;
		margin: 0;
		padding: 0;
	}
</style>
