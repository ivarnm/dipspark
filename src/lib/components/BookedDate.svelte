<script>
  import { createEventDispatcher } from 'svelte';
  import { css } from '@emotion/css';
  import { invalidateAll } from '$app/navigation';
  import { user, parkingSpots } from "$lib/stores/stores.js"
  import DateFormat from "$lib/helpers/DateFormat"
  import BookingDay from "$lib/helpers/BookingDay"
  import Button from '$lib/components/Button.svelte';
  import ExpandableButton from "$lib/components/ExpandableButton.svelte";

  export let bookingDay;
  export let style;

  const dispatch = createEventDispatcher();

  $: formattedDate = DateFormat.localeString(bookingDay.date);
  $: spotsLeft = BookingDay.parkingSpotsLeft(bookingDay, $parkingSpots);
  $: haveBooked = bookingDay.bookings.find(booking => booking.userId == $user.id);

  const handleClick = () => {
    dispatch('buttonClick');
  };

  const isCancellation = (booking) => {
    const defaultParkingSpotUsers = $parkingSpots.map(p => p.defaultUserId).filter(id => id > 0);
    return defaultParkingSpotUsers.includes(booking.userId);
  }

  $: p = css`
    color: ${style.color ? style.color : 'black'};
    border-color: ${style.color ? style.color : 'black'};
	`;

  const bookDay = async () => {
    try {
      const booking = {
        "userId": $user.id,
        "parkingDate": bookingDay.date,
      }
      const response = await fetch(`https://dipspark-service.azurewebsites.net/Booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking)
      });

      if (!response.ok) {
        console.error('API Error:', response.statusText);
        return;
      }
      invalidateAll();
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const deleteBooking = async () => {
    try {
      const bookingToDelete = bookingDay.bookings.find(booking => booking.userId == $user.id);
      const response = await fetch(`https://dipspark-service.azurewebsites.net/Bookings/${bookingToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('API Error:', response.statusText);
        return;
      }
      invalidateAll();
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

</script>
<div class="container">
  <ExpandableButton {style} on:buttonClick={handleClick}>
    <div slot="button" class="booked-date">
      <p class="{p} date">{formattedDate ? formattedDate : "Ugyldig dato"}</p>
      <p class="{p} free-spots">{spotsLeft}</p>
    </div>
    <div slot="expanded">
      {#each bookingDay.bookings as booking (booking.id)}
        <p style="text-decoration: {isCancellation(booking) ? 'line-through' : 'none'};">{booking.userName}</p>
      {/each}
      {#if haveBooked}
        <div class="book-button">
          <Button style={{backgroundColor: "#3D405B", color: 'white', padding: '0 15px'}} on:buttonClick={deleteBooking}>
            Fjern reservasjon
          </Button>
        </div>
      {/if}
      {#if !haveBooked && spotsLeft > 0}
        <div class="book-button">
          <Button style={{backgroundColor: "#3D405B", color: 'white', padding: '0 15px'}} on:buttonClick={bookDay}>
            Book
          </Button>
        </div>
      {/if}
    </div>
  </ExpandableButton>
</div>

<style>
  .container {
    margin: 14px 0;
    width: 100%;
  }

  .booked-date {
    display: flex;
    justify-content: space-between;
  }

  p {
    font-size: 20px;
    margin: 0;
    padding: 4px 0;
  }

  .date {
    width: 100%;
  }

  .free-spots {
    border-left: 1px solid;
    padding: 4px 5px 4px 10px;
  }

  .book-button {
    height: 37px;
    min-width: 130px;
    margin: 10px 0px 12px 0;
    float: right;
  }
  
</style>