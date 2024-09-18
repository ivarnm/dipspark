<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { user, users, bookingDays } from "$lib/stores/stores"
  import { BookDay, DeleteBooking, GetBookingDays } from '$lib/Api'
  import styles from '$lib/Styles'
  import DateFormat from "$lib/helpers/DateFormat"
  import BookingUtils from "$lib/helpers/BookingUtils"
  import Button from '$lib/components/Button.svelte';
  import ExpandableButton from "$lib/components/ExpandableButton.svelte";
	import type { BookingDay } from '$lib/model/models';

  export let bookingDay: BookingDay;
  export let style;

  let isProcessing = false;

  const dispatch = createEventDispatcher();

  $: formattedDate = DateFormat.localeString(bookingDay.date);
  $: spotsLeft = BookingUtils.parkingSpotsLeft(bookingDay.bookings, $users);
  $: haveBooked = bookingDay.bookings.find(booking => booking.user.id == $user.id);

  const handleClick = () => {
    dispatch('buttonClick');
  };

  const bookDay = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    var newBooking = await BookDay(fetch, { userId: $user.id, date: bookingDay.date, isCancellationBooking: $user.hasPermanentParkingSpot });
    if (newBooking) {
      bookingDay.bookings.push(newBooking);
      const bookingIndex = $bookingDays.findIndex(bd => bd.date == bookingDay.date);
      $bookingDays[bookingIndex] = bookingDay;
    } else {
      $bookingDays = await GetBookingDays(fetch);
    }
    
    isProcessing = false;
  }

  const deleteBooking = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    const bookingToDelete = bookingDay.bookings.find(booking => booking.user.id == $user.id);
    if (!bookingToDelete) {
      isProcessing = false;
      return;
    };
    await DeleteBooking(fetch, bookingToDelete.id);
    bookingDay.bookings = bookingDay.bookings.filter(booking => booking.id != bookingToDelete.id);
    const bookingIndex = $bookingDays.findIndex(bd => bd.date == bookingDay.date);
    $bookingDays[bookingIndex] = bookingDay;
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
        <p class="name" style="text-decoration: {booking.isCancellationBooking ? 'line-through' : 'none'};">{booking.user.name}</p>
      {/each}
      {#if haveBooked}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={deleteBooking} loading={isProcessing}>
            {haveBooked.isCancellationBooking ? 'Fjern kansellering' : 'Fjern reservasjon'}
          </Button>
        </div>
      {/if}
      {#if !haveBooked && spotsLeft > 0}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={bookDay} loading={isProcessing}>
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
    pointer-events: all;
  }

  .booked-date {
    display: flex;
    justify-content: space-between;
  }

  p {
    font-size: 20px;
    margin: 0;
    padding: 4px 0;
    text-shadow: none;
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