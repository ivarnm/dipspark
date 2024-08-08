import { TOTAL_PARKING_SPOTS } from "$lib/constants";
import type { Booking, User } from "$lib/model/models";

function parkingSpotsLeft(bookings: Booking[], users: User[]) : number {
  var cancellationBookings = bookings.filter(b => b.isCancellationBooking).length;
  var normalBookings = bookings.filter(b => !b.isCancellationBooking).length;
  var defaultParkingSpotUsers = users.filter(u => u.hasPermanentParkingSpot).length;
  return TOTAL_PARKING_SPOTS - defaultParkingSpotUsers + cancellationBookings - normalBookings;
}

export default {
  parkingSpotsLeft
}
