<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { user, users, bookingDays } from "$lib/stores/stores"
  import { BookDay, DeleteBooking, GetBookingDays, SubscribeParkingAvailable, UnsubscribeParkingAvailable, SendTestNotification, SendTestNotificationDelete } from '$lib/Api'
  import styles from '$lib/Styles'
  import DateFormat from "$lib/helpers/DateFormat"
  import BookingUtils from "$lib/helpers/BookingUtils"
  import Button from '$lib/components/Button.svelte';
  import ExpandableButton from "$lib/components/ExpandableButton.svelte";
	import type { BookingDay, ParkingAvailableSubscription } from '$lib/model/models';
	import { requestNotificationPermission } from '$lib/helpers/firebase';

  export let bookingDay: BookingDay;
  export let subscription: ParkingAvailableSubscription | null;
  export let style;

  let isProcessing = false;
  let buttonExpanded = false;

  const dispatch = createEventDispatcher();

  $: formattedDate = DateFormat.localeString(bookingDay.date);
  $: spotsLeft = () => BookingUtils.parkingSpotsLeft(bookingDay.bookings, $users);
  $: haveBooked = bookingDay.bookings.find(booking => booking.user.id == $user.id);

  const handleClick = (e: CustomEvent<boolean>) => {
    buttonExpanded = e.detail;
    dispatch('buttonClick');
  };

  const bookDay = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    const newBooking = await BookDay(fetch, {
			userId: $user.id,
			date: bookingDay.date,
			isCancellationBooking: $user.hasPermanentParkingSpot,
      fcmToken: Notification.permission === 'granted' ? await requestNotificationPermission() ?? undefined : undefined
		});
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

  const subscribe = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    const token = await requestNotificationPermission();
    if (!token) {
      isProcessing = false;
      return;
    }
    const newSubscription = await SubscribeParkingAvailable(fetch, { token, date: bookingDay.date });
    if (newSubscription) {
      subscription = newSubscription;
    }
    isProcessing = false;
  }

  const unsubscribe = async () => {
    if (isProcessing || subscription == null) return; 
    isProcessing = true;
    await UnsubscribeParkingAvailable(fetch, { token: subscription.token, date: bookingDay.date });
    subscription = null;
    isProcessing = false;
  }

  const sendTestNotification = async () => {
    if (isProcessing) return; 
    isProcessing = true;
    await SendTestNotification(fetch, {
			userId: $user.id,
			date: bookingDay.date,
			isCancellationBooking: $user.hasPermanentParkingSpot,
      fcmToken: Notification.permission === 'granted' ? await requestNotificationPermission() ?? undefined : undefined
		});
    const bookingToDelete = bookingDay.bookings.length > 0 ? bookingDay.bookings[0] : null;
    if (!bookingToDelete) {
      isProcessing = false;
      return;
    };
    await SendTestNotificationDelete(fetch, bookingToDelete.id);
    isProcessing = false;
  }

</script>
<div class="container">
  <ExpandableButton {style} on:buttonClick={handleClick}>
    <div slot="button" class="booked-date">
      {#if subscription}
        <div class="notification-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={buttonExpanded ? 'var(--neutral-30)' : 'var(--neutral-60)'} width=24 height=24>
            <path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
          </svg>
        </div>
      {/if}
      <p class="date">{formattedDate ? formattedDate : "Ugyldig dato"}</p>
      <p class="free-spots">{spotsLeft()}</p>
    </div>
    <div slot="expanded">
      {#each bookingDay.bookings as booking (booking.id)}
        <p class="name" style="text-decoration: {booking.isCancellationBooking ? 'line-through' : 'none'};">{booking.user.name}</p>
      {/each}
      <div class="buttons">
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={sendTestNotification}>
            Send testvarsel
          </Button>
        </div>
        {#if haveBooked}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={deleteBooking} loading={isProcessing}>
            {haveBooked.isCancellationBooking ? 'Fjern kansellering' : 'Fjern reservasjon'}
          </Button>
        </div>
        {/if}
        {#if !haveBooked && spotsLeft() > 0}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={bookDay} loading={isProcessing}>
            Book
          </Button>
        </div>
        {/if}
        {#if !haveBooked && spotsLeft() == 0}
        {#if subscription}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={unsubscribe} loading={isProcessing}>
            Fjern varsel
          </Button>
        </div>
        {:else}
        <div class="book-button">
          <Button style={{...styles.button.primary, padding: '0 15px', minWidth: '185px'}} on:buttonClick={subscribe} loading={isProcessing}>
            Få varsel
          </Button>
        </div>
        {/if}
        {/if}
      </div>
    </div>
  </ExpandableButton>
</div>

<style>
  .buttons {
    display: flex;
    gap: 10px;
    justify-content: end
  }

  .container {
    margin: 14px 0;
    width: 100%;
    pointer-events: all;
  }

  .booked-date {
    display: flex;
    justify-content: space-between;
    position: relative;
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

  .notification-icon {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
