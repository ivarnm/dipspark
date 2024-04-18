<script>
  import { bookingDays, parkingSpots, user } from '$lib/stores/stores.js'
  import styles from '$lib/Styles'
  import BookingDay from "$lib/helpers/BookingDay"
	import BookedDate from '$lib/components/BookedDate.svelte';

  const haveBookedDay = (bookingDay) => {
    return bookingDay.bookings.find(booking => booking.userId == $user.id);
  }

  $: dateStyles = $bookingDays.map((day, i) => {
    return {
      ...getBackgroundColors(day),
      color: getColor(day, i)
    }
  })

  $: spotsLeft = $bookingDays.map(day => BookingDay.parkingSpotsLeft(day, $parkingSpots));

  $: getBackgroundColors = (bookingDay) => {
    if (haveBookedDay(bookingDay)) {
      return styles.button.secondary;
    }
    return {
      ...styles.button.neutral,
      expandedColor: "--tertiary-40"
    }
  }

  $: getColor = (bookingDay, index) => {
    if (!spotsLeft[index] && !haveBookedDay(bookingDay)) return '--neutral-60';
    return '--neutral-100';
  }
</script>

<div class="container">
	<h2>Book parkering</h2>

	{#each $bookingDays.slice(0, 6) as bookingDay, i (bookingDay.date)}
    <div class="booked-date">
      <BookedDate {bookingDay} style={dateStyles[i]} />
    </div>
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

  .booked-date {
    width: 100%;
  }
</style>
