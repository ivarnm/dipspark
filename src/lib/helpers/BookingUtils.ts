import { TOTAL_PARKING_SPOTS } from "$lib/constants";
import type { Booking, BookingDay, ParkingSpot, User } from "$lib/model/models";

function parkingSpotsLeft(bookingDay: BookingDay, parkingSpots: ParkingSpot[]): number
{
  const defaultParkingSpotUsers = parkingSpots.map(p => p.defaultUserId).filter(id => id > 0);

  const isCancellationBooking = (booking: Booking) => defaultParkingSpotUsers.includes(booking.userId);
  const cancellations = bookingDay.bookings.filter(b => isCancellationBooking(b)).length
  const normalBookings = bookingDay.bookings.filter(b => !isCancellationBooking(b)).length
  
  return parkingSpots.length - defaultParkingSpotUsers.length + cancellations - normalBookings - 1 // TODO: fix -1 when server issue is fixed
}

function parkingSpotsLeft2(bookings: Booking[], users: User[]) : number {
  var cancellationBookings = bookings.filter(b => b.isCancellationBooking).length;
  var normalBookings = bookings.filter(b => !b.isCancellationBooking).length;
  var defaultParkingSpotUsers = users.filter(u => u.hasPermanentParkingSpot).length;
  return TOTAL_PARKING_SPOTS - defaultParkingSpotUsers + cancellationBookings - normalBookings;
}

export default {
  parkingSpotsLeft,
  parkingSpotsLeft2
}
