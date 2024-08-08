import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import { DATE_OFFSET, MAX_BOOKING_DAYS_FORWARD, MAX_CANCELLATION_DAYS_FORWARD, TOTAL_PARKING_SPOTS } from '$lib/constants';
import BookingUtils from '$lib/helpers/BookingUtils';
import type { Booking, BookingDay, BookingRequest, User } from '$lib/model/models';

export const GET: RequestHandler = async ({ locals }) => {
  var auth = await locals.auth();

  const daysForward = (auth!.user as unknown as User)?.hasPermanentParkingSpot ? MAX_CANCELLATION_DAYS_FORWARD : MAX_BOOKING_DAYS_FORWARD;
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
    select: bookingSelect
	});
  
  const bookingDays = groupBookingsByDate(bookings as Booking[], startDate, endDate);
	return json(bookingDays);
}

export const POST: RequestHandler = async ({ locals, request }) => {
  const bookingRequest = await parseBookingRequest(request);
  if (!bookingRequest) {
    return json({ error: 'Invalid booking request' }, { status: 400 });
  }
  if (!(await canBook(bookingRequest, locals))) {
    return json({ error: 'User is not allowed to book the parking spot' }, { status: 403 });
  }
  
  var created = await db.booking.create({
    data: bookingRequest,
    select: bookingSelect
  });

  return json(created, { status: 201 });
}

const bookingSelect = {
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

async function parseBookingRequest(request: Request): Promise<BookingRequest | null> {
  const bookingRequest = await request.json() as BookingRequest;
  if (!bookingRequest.date || 
    !bookingRequest.userId || 
    bookingRequest.isCancellationBooking === undefined || 
    bookingRequest.isCancellationBooking === null
  ) {
    return null;
  }
  bookingRequest.date = setToMidnight(new Date(bookingRequest.date));
  return bookingRequest;
}

async function canBook(bookingRequest: BookingRequest, locals: App.Locals): Promise<boolean> {
  const existingBookings = await db.booking.findMany({
    where: {
      date: bookingRequest.date,
    },
    select: bookingSelect
  });
  const users = await db.user.findMany();
  const parkingSpotsLeft = BookingUtils.parkingSpotsLeft(existingBookings as Booking[], users as User[]);
  const requestingUserId = (await locals.auth())?.user?.id;
  
  if (parkingSpotsLeft <= 0) return false;
  if (existingBookings.find(b => b.user.id === bookingRequest.userId)) return false;
  if (requestingUserId !== bookingRequest.userId) return false;
  return true;
}
