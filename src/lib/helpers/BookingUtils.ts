import { TOTAL_PARKING_SPOTS } from "$lib/constants";
import type { Booking, BookingDay, User } from "$lib/model/models";

function parkingSpotsLeft(bookings: Booking[], users: User[]) : number {
  var cancellationBookings = bookings.filter(b => b.isCancellationBooking).length;
  var normalBookings = bookings.filter(b => !b.isCancellationBooking).length;
  var defaultParkingSpotUsers = users.filter(u => u.hasPermanentParkingSpot).length;
  return TOTAL_PARKING_SPOTS - defaultParkingSpotUsers + cancellationBookings - normalBookings;
}

function groupBookingsByDate(bookings: Booking[], startDate: Date, endDate: Date): BookingDay[] {
  const bookingDays: { [key: string]: BookingDay } = {};
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dateString = formatDate(date);
    bookingDays[dateString] = {
      date: dateString,
      bookings: [],
    };
  }

  bookings.forEach(booking => {
    const dateString = formatDate(booking.date);
    bookingDays[dateString].bookings.push(booking);
  });

  return Object.values(bookingDays);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default {
  parkingSpotsLeft,
  groupBookingsByDate,
  formatDate
}
