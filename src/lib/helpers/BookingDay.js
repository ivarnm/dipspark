function parkingSpotsLeft(bookingDay)
{
  return 4 - bookingDay.bookings.length;
}


export default {
  parkingSpotsLeft
}