import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import BookingUtils from '$lib/helpers/BookingUtils';
import type { Booking, User } from '$lib/model/models';
import { sendAvailableParkingNotification } from '$lib/helpers/firebase-admin';

export const DELETE: RequestHandler = async ({ locals, params }) => {
	const bookingToDelete = await db.booking.findUnique({
		where: {
			id: params.id
		}
	});

	if (!bookingToDelete) {
		return json({ error: 'Booking not found' }, { status: 404 });
	}

	if (!(await canDelete(bookingToDelete.userId, locals))) {
		return json({ error: 'User is not allowed to delete the booking' }, { status: 403 });
	}

	await sendNotification(bookingToDelete.date);

	await db.booking.delete({
		where: {
			id: params.id
		}
	});

	return json(undefined, { status: 204 });
};

async function canDelete(bookingOwner: string, locals: App.Locals): Promise<boolean> {
	const requestingUserId = (await locals.auth())?.user?.id;
	if (!requestingUserId) {
		return false;
	}
	return requestingUserId === bookingOwner;
}

async function sendNotification(date: Date) {
  const [bookings, users, subscriptions] = await Promise.all([
    db.booking.findMany({
      where: {
        date
      },
      select: {
        id: true,
        isCancellationBooking: true
      }
    }),
    db.user.findMany(),
    db.parkingAvailableSubscription.findMany({
      where: {
        date
      },
      select: {
        token: true
      }
    })
  ]);

  const parkingSpotsLeft = BookingUtils.parkingSpotsLeft(bookings as Booking[], users as User[]);
  const tokens = subscriptions.map((s) => s.token);

  if (parkingSpotsLeft == 0 && tokens.length) {
		await sendAvailableParkingNotification(tokens, date);
	}
}
