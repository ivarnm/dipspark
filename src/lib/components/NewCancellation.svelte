<script>
  import { invalidateAll } from '$app/navigation';
  import { bookingDays, parkingSpots, user } from '$lib/stores/stores.js'
  import { BookDay, DeleteBooking } from '$lib/Api'
  import DateFormat from '$lib/helpers/DateFormat'

  const booked = bookingday => bookingday.bookings.find(b => b.userId == $user.id);

  let originalSelection = [];
  let selection = [];

  bookingDays.subscribe(value => {
    originalSelection = value.filter(b => booked(b)).map(b => b.date);
    selection = originalSelection;
  })

  $: isOriginalSelection = () => {
    return originalSelection.length === selection.length &&
      originalSelection.every((val, index) => val === selection[index]);
  }

  const submit = async () => {
    const boookingsToAdd = selection.filter(item => !originalSelection.includes(item));
    const bookingsToRemove = originalSelection.filter(item => !selection.includes(item));

    try {
      const addRequests = boookingsToAdd.map(date => BookDay(fetch, $user.id, date));
      const deleteRequests = bookingsToRemove.map(date => {
        const bookingId = $bookingDays.find(day => day.date == date).bookings.find(b => b.userId == $user.id).id;
        return DeleteBooking(fetch, bookingId)
      })
      await Promise.all([...addRequests, ...deleteRequests])
      invalidateAll()
    } 
    catch (error) {
      console.error('Error:', error.message);
    }
  }
</script>

<div class="container">
	<h2>Registrer ledig parkering</h2>
  
  <div class="bookings">
    {#each $bookingDays as bookingDay, i (bookingDay.date)}
      <div class="booked-date">
        <label>
          <input type="checkbox" bind:group={selection} value={bookingDay.date}/>
          {DateFormat.localeString(bookingDay.date)}
        </label>
      </div>
    {/each}
  </div>
  <div class="submit">
    <button disabled={isOriginalSelection()} on:click={submit}>Bekreft</button>
  </div>
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

  .submit {
    width: 100%;
    margin: 20px 0;
  }

  button {
    width: 100%;
    font-size: 20px;
    min-height: 53px;
    cursor: pointer;
    background-color: #3D405B;
    border: none;
    padding: 0 10px;
    color: white;

    &:active {
      background-color: #292b3c;
    }

    &:disabled {
      background-color: #777ba2;
      cursor: pointer;
    }
  }


</style>