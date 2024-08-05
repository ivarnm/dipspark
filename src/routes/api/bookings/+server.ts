import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import { DATE_OFFSET, MAX_BOOKING_DAYS_FORWARD, MAX_CANCELLATION_DAYS_FORWARD } from '$lib/constants';
import type { Booking, BookingDay, User } from '$lib/model/models';

export const GET: RequestHandler = async ({ locals}) => {
  var auth = await locals.auth();
  if (!auth?.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const daysForward = (auth.user as unknown as User)?.hasPermanentParkingSpot ? MAX_CANCELLATION_DAYS_FORWARD : MAX_BOOKING_DAYS_FORWARD;
  const startDate = setToMidnight(new Date());
  startDate.setDate(startDate.getDate() + DATE_OFFSET);
  const endDate = setToMidnight(new Date());
  endDate.setDate(startDate.getDate() + daysForward);
  
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
      user: {
        select: {
          id: true,
          name: true,
        }
      }
    }
	});
  
  const bookingDays = groupBookingsByDate(bookings as Booking[], startDate, endDate);
	return json(bookingDays);
}

function setToMidnight(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
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
