<script>
	import { bookingDays, parkingSpots, user } from '$lib/stores/stores.js'
	import User from '$lib/helpers/User'
	import styles from '$lib/Styles'
  import BookedDate from '$lib/components/BookedDate.svelte';
	
  $: yourBookings = $bookingDays.filter(day => day.bookings.find(booking => booking.userId == $user.id));
	$: isDefaultUser = User.isDefaultUser($user, $parkingSpots)
</script>

<div class="container">
	<h2>{isDefaultUser ? 'Dine kanselleringer' :'Dine bookinger'}</h2>
  {#if yourBookings.length == 0}
    <p>{isDefaultUser ? 'Du har ingen kansellerte parkeringer' :'Du har ingen reserverte parkeringer'}</p>
  {/if}
	{#each yourBookings as bookingDay (bookingDay.date)}
		<BookedDate {bookingDay} style={styles.button.secondary} />
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
