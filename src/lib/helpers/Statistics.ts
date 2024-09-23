import type { Booking, BookingDay, BookingStatistic, ParkingSpotStatistic, User } from '$lib/model/models';
import BookingUtils from '$lib/helpers/BookingUtils';
import { TOTAL_PARKING_SPOTS } from '$lib/constants';

export default class Statistics {
  bookings: Booking[];
  users: User[];
  startDate: Date;
  endDate = setToMidnight(new Date());

  constructor(bookings: Booking[], users: User[]) {
    this.bookings = bookings.filter(booking => booking.date <= this.endDate);
    this.users = users;
    this.startDate = bookings[0]?.date ?? new Date("2024-08-11");
  }

  getBookingDays(startDate: Date = this.startDate, endDate: Date = this.endDate): BookingDay[] {
    let bookingDays = BookingUtils.groupBookingsByDate(this.bookings, startDate, endDate);
    return bookingDays;
  }

  getBookingStatistics(fromDate: Date = this.startDate): BookingStatistic[] {
    let bookingStatistics: BookingStatistic[] = [];
    this.users.forEach(user => {
      const bookings = this.bookings.filter(booking => booking.user.id === user.id && booking.date >= fromDate);
      if (bookings.length > 0 && !user.hasPermanentParkingSpot) {
        bookingStatistics.push({
          userId: user.id,
          userName: user.name,
          bookings: bookings.length,
        });
      }
    });
    bookingStatistics.sort((a, b) => {
      if (a.bookings !== b.bookings) {
        return b.bookings - a.bookings;
      }
      return a.userName.localeCompare(b.userName);
    });
    return bookingStatistics;
  }

  getWeeklyBookingStatistics(): BookingStatistic[] {
    const oneWeekAgo = setToMidnight(new Date());
	  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    return this.getBookingStatistics(oneWeekAgo);
  }

  getParkingSpotStatistics(): ParkingSpotStatistic[] {
    let bookingDays = this.getBookingDays();
    bookingDays = bookingDays.filter(bookingDay => {
      const dayOfWeek = new Date(bookingDay.date).getDay();
      return dayOfWeek !== 0 && dayOfWeek !== 6; // Filter out weekends
    });
    const parkingSpotStatistics = bookingDays.map(day => ({
      date: day.date,
      spotsUsed: TOTAL_PARKING_SPOTS - BookingUtils.parkingSpotsLeft(day.bookings, this.users)
    }));
    return parkingSpotStatistics;
  }
}

function setToMidnight(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
