<script>
  import { createEventDispatcher } from 'svelte';
  import { css } from '@emotion/css';
  import { invalidateAll } from '$app/navigation';
  import { user, parkingSpots } from "$lib/stores/stores.js"
  import { BookDay, DeleteBooking } from '$lib/Api'
  import styles from '$lib/Styles'
  import DateFormat from "$lib/helpers/DateFormat"
  import BookingDay from "$lib/helpers/BookingDay"
  import User from '$lib/helpers/User'
  import Button from '$lib/components/Button.svelte';
  import ExpandableButton from "$lib/components/ExpandableButton.svelte";

  export let bookingDay;
  export let style;

  let isProcessing = false;

  const dispatch = createEventDispatcher();

  $: formattedDate = DateFormat.localeString(bookingDay.date);
  $: spotsLeft = BookingDay.parkingSpotsLeft(bookingDay, $parkingSpots);
  $: haveBooked = bookingDay.bookings.find(booking => booking.userId == $user.id);
  $: isDefaultUser = User.isDefaultUser($user, $parkingSpots)

  const handleClick = () => {
    dispatch('buttonClick');
  };

  const isCancellation = (booking) => {
    const defaultParkingSpotUsers = $parkingSpots.map(p => p.defaultUserId).filter(id => id > 0);
    return defaultParkingSpotUsers.includes(booking.userId);
  }

  const bookDay = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    await BookDay(fetch, $user.id, bookingDay.date);
    invalidateAll();
    isProcessing = false;
  }

  const deleteBooking = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    const bookingToDelete = bookingDay.bookings.find(booking => booking.userId == $user.id);
    await DeleteBooking(fetch, bookingToDelete.id);
    invalidateAll();
    isProcessing = false;
  }

</script>
<div class="container">
  <ExpandableButton {style} on:buttonClick={handleClick}>
    <div slot="button" class="booked-date">
      <p class="date">{formattedDate ? formattedDate : "Ugyldig dato"}</p>
      <p class="free-spots">{spotsLeft}</p>
    </div>
    <div slot="expanded">
      {#each bookingDay.bookings as booking (booking.id)}
        <p class="name" style="text-decoration: {isCancellation(booking) ? 'line-through' : 'none'};">{booking.userName}</p>
      {/each}
      {#if haveBooked}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px'}} on:buttonClick={deleteBooking}>
            {isDefaultUser ? 'Fjern kansellering' : 'Fjern reservasjon'}
          </Button>
        </div>
      {/if}
      {#if !haveBooked && spotsLeft > 0}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px'}} on:buttonClick={bookDay}>
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
  
  .name {
    color: var(--neutral-100); 
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