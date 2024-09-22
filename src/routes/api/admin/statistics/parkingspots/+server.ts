import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import BookingUtils from '$lib/helpers/BookingUtils';
import type { Booking, BookingDay, User } from '$lib/model/models';
import { TOTAL_PARKING_SPOTS } from '$lib/constants';

export const GET: RequestHandler = async () => {
  let bookingDays: BookingDay[];
  let users: User[];

  [bookingDays, users] = await Promise.all([getBookingDays(), getUsers()]);

  const parkingSpotsUtilization = bookingDays.map(day => ({
    date: day.date,
    spotsUsed: TOTAL_PARKING_SPOTS - BookingUtils.parkingSpotsLeft(day.bookings, users)
  }));

	return json(parkingSpotsUtilization);
}


async function getBookingDays() {
  const startDate = new Date("2024-08-11") // Start of bookings in the database
  const endDate = setToMidnight(new Date());
  
  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    select: {
      id: true,
      date: true,
      isCancellationBooking: true,
    }
	});
  
  let bookingDays = BookingUtils.groupBookingsByDate(bookings as Booking[], startDate, endDate);
  bookingDays = bookingDays.filter(bookingDay => {
    const dayOfWeek = new Date(bookingDay.date).getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Filter out weekends
  });
  return bookingDays;
}

async function getUsers() {
  const users = await db.user.findMany({
    select: {
      id: true,
      hasPermanentParkingSpot: true,
    }
  });
  return users as User[];
}

function setToMidnight(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
