<script>
  import DateFormat from "$lib/helpers/DateFormat"
  import BookingDay from "$lib/helpers/BookingDay"
  import ExpandableButton from "$lib/components/ExpandableButton.svelte";

  export let bookingDay;
  $: formattedDate = DateFormat.localeString(bookingDay.date);
  $: spotsLeft = BookingDay.parkingSpotsLeft(bookingDay);

</script>
<div class="container">
  <ExpandableButton style={{backgroundColor: '#81B29A'}}>
    <div slot="button" class="booked-date">
      <p class="date">{formattedDate ? formattedDate : "Ugyldig dato"}</p>
      <p class="free-spots">{spotsLeft}</p>
    </div>
    <div slot="expanded">
      {#each bookingDay.bookings as booking (booking.id)}
        <p>{booking.userName}</p>
      {/each}
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
    border-left: 1px solid black;
    padding: 4px 5px 4px 10px;
  }
  
</style>