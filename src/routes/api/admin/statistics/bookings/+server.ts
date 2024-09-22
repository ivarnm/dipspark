import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';

export const GET: RequestHandler = async ({ url }) => {
  const fromDate = url.searchParams.get('from') ? new Date(url.searchParams.get('from')!) : undefined;

  const bookings = await db.booking.groupBy({
    by: ['userId'],
    _count: {
      id: true,
    },
    where: {
      date: {
        gte: fromDate,
      },
      AND: {
        isCancellationBooking: false,
      }
    },
  });

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
    } 
  });

  const result = bookings.map(bookingGroup => ({
    userId: bookingGroup.userId,
    userName: users.find(user => user.id === bookingGroup.userId)?.name ?? '',
    bookings: bookingGroup._count.id,
  }));

  result.sort((a, b) => {
    if (a.bookings !== b.bookings) {
      return b.bookings - a.bookings;
    }
    return a.userName.localeCompare(b.userName);
  });
  
  return json(result);
} 
