<script>
  import BookingDay from "$lib/helpers/BookingDay"
  import User from "$lib/helpers/User"
	import BookedDate from '$lib/components/BookedDate.svelte';


  export let bookingDays = []
  const userId = User.getLoggedInUser().id;

  const haveBookedDay = (bookingDay) => {
    return bookingDay.bookings.find(booking => booking.userId == userId);
  }

  $: styles = bookingDays.map((day, i) => {
    return {
      backgroundColor: getBackgroundColor(day, i),
      color: getColor(day, i)
    }
  })

  $: expandedBookings = bookingDays.map(day => false)

  $: spotsLeft = bookingDays.map(day => BookingDay.parkingSpotsLeft(day));


  $: getBackgroundColor = (bookingDay, index) => {
    if (haveBookedDay(bookingDay)) return "#81B29A";
    if (expandedBookings[index]) return "#F2CC8F";
    return '#D9D9D9';
  }

  $: getColor = (bookingDay, index) => {
    if (!spotsLeft[index] && !haveBookedDay(bookingDay)) return '#666';
    return 'black';
  }

  const handleClick = (index) => {
    const expanded = expandedBookings;
    expanded[index] = !expanded[index];
    expandedBookings = expanded;
  };
</script>

<div class="container">
	<h2>Book parkering</h2>

	{#each bookingDays as bookingDay, i (bookingDay.date)}
    <div class="booked-date">
      <BookedDate {bookingDay} style={styles[i]} on:buttonClick={handleClick(i)} />
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
