<script lang="ts">
  import { bookingDays, user } from '$lib/stores/stores'
  import { BookDay, DeleteBooking, GetBookingDays } from '$lib/Api'
  import DateFormat from '$lib/helpers/DateFormat'
  import type { BookingDay } from '$lib/model/models'
	import Error from '../../routes/+error.svelte';
	import Button from './Button.svelte';
	import styles from '$lib/Styles';

  const booked = (bookingday: BookingDay) => bookingday.bookings.find(b => b.user.id == $user.id);

  let originalSelection: string[] = [];
  let selection: string[] = [];
  let isProcessing = false;

  bookingDays.subscribe(value => {
    originalSelection = value.filter(b => booked(b)).map(b => b.date);
    
    selection = originalSelection;
  })

  $: isOriginalSelection = () => {
    return originalSelection.length === selection.length &&
      originalSelection.every((val, index) => val === selection[index]);
  }

  const submit = async () => {
    if (isProcessing) return;
    isProcessing = true;
    const boookingsToAdd = selection.filter(item => !originalSelection.includes(item));
    const bookingsToRemove = originalSelection.filter(item => !selection.includes(item));

    try {
      const addRequests = boookingsToAdd.map(date => BookDay(fetch, {userId: $user.id, date: date, isCancellationBooking: true}));
      const deleteRequests = bookingsToRemove.map(date => {
        const bookingId = $bookingDays.find(day => day.date == date)!.bookings.find(b => b.user.id == $user.id)!.id;
        return DeleteBooking(fetch, bookingId)
      })
      await Promise.all([...addRequests, ...deleteRequests])
      $bookingDays = await GetBookingDays(fetch);
    } 
    catch (ex) {
      console.error('Error:', (ex as Error).message);
    }
    finally {
      isProcessing = false;
    }
  }
</script>

<div class="container">
	<h2>Registrer ledig parkering</h2>
  
  <div class="bookings">
    {#each $bookingDays as bookingDay, i (bookingDay.date)}
      <div class="booked-date">
        <label class="checkbox-label">
          <input type="checkbox" bind:group={selection} value={bookingDay.date}/>
          {DateFormat.localeString(bookingDay.date)}
        </label>
      </div>
    {/each}
  </div>
  <div class="submit">
    <Button disabled={isOriginalSelection()} loading={isProcessing} on:buttonClick={submit} 
            style={{...styles.button.primary, disabledOpacity: 1, disabledBackgroundColor: '--neutral-40', disabledColor: '--neutral-70'}}>
        Bekreft
    </Button>
  </div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 10px 0;
	}

  .bookings {
    color: var(--neutral-70);
  }

	h2 {
		font-size: 20px;
		font-weight: 700;
		margin: 0;
		padding: 0;
	}

  .submit {
    width: 100%;
    margin: 20px 0;
    pointer-events: all;
  }

  button {
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    cursor: pointer;
    background-color: var(--primary-70);
    border: none;
    padding: 0 10px;
    color: var(--neutral-0);

    &:active {
      background-color: var(--primary-80);
    }

    &:disabled {
      background-color: var(--neutral-40);
      color: var(--neutral-70);
      cursor: default;
    }
  }


</style>