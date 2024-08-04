import type { Booking, BookingDay, ParkingSpot } from "$lib/model/models";

function parkingSpotsLeft(bookingDay: BookingDay, parkingSpots: ParkingSpot[]): number
{
  const defaultParkingSpotUsers = parkingSpots.map(p => p.defaultUserId).filter(id => id > 0);

  const isCancellationBooking = (booking: Booking) => defaultParkingSpotUsers.includes(booking.userId);
  const cancellations = bookingDay.bookings.filter(b => isCancellationBooking(b)).length
  const normalBookings = bookingDay.bookings.filter(b => !isCancellationBooking(b)).length
  
  return parkingSpots.length - defaultParkingSpotUsers.length + cancellations - normalBookings - 1 // TODO: fix -1 when server issue is fixed
}

export default {
  parkingSpotsLeft
}
