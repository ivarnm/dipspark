<script>
  import DateFormat from "$lib/helpers/DateFormat"
  import Button from "$lib/components/Button.svelte";

  export let booking;
  const formattedDate = DateFormat.localeString(booking.parkingDate);

</script>
<div class="container">
  <Button style={{backgroundColor: '#81B29A'}}>
    <div class="booked-date">
      <p class="date">{formattedDate ? formattedDate : "Ugyldig dato"}</p>
      <p class="free-spots">4</p>
    </div>
  </Button>
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