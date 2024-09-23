import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';

export const GET: RequestHandler = async ({ url }) => {
	const bookings = await db.booking.findMany({
		select: {
			id: true,
			date: true,
			isCancellationBooking: true,
			user: {
				select: {
					id: true,
					name: true
				}
			}
		},
    orderBy: {
      date: 'asc',
    }
	});

  return json(bookings);
};
