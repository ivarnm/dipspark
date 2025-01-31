import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import BookingUtils from '$lib/helpers/BookingUtils';
import type { Booking, User } from '$lib/model/models';
import { sendNotification } from '$lib/helpers/firebase-admin';

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const bookingToDelete = await db.booking.findUnique({
    where: {
      id: params.id
    },
  });

  if (!bookingToDelete) {
    return json({ error: 'Booking not found' }, { status: 404 });
  }

  if (!(await canDelete(bookingToDelete.userId, locals))) {
    return json({ error: 'User is not allowed to delete the booking' }, { status: 403 });
  }

  const bookings = await db.booking.findMany({
    where: {
      date: bookingToDelete.date,
    },
    select: {
      id: true,
      isCancellationBooking: true,
    }
  });
  const users = await db.user.findMany()
  
  const parkingSpotsLeft = BookingUtils.parkingSpotsLeft(bookings as Booking[], users as User[]);
  if (parkingSpotsLeft == 0) {
    const subscriptions = await db.parkingAvailableSubscription.findMany({
      where: {
        date: bookingToDelete.date
      },
      select: {
        token: true
      }
    })
    const tokens = subscriptions.map(s => s.token);
    await sendNotification(tokens, "Tilgjengelig parkering", "Det er ledig parkeringsplass den " + bookingToDelete.date);
  }

  await db.booking.delete({
    where: {
      id: params.id
    }
  });

  return json(undefined, { status: 204 });
}


async function canDelete(bookingOwner: string, locals: App.Locals): Promise<boolean> {
  const requestingUserId = (await locals.auth())?.user?.id;
  if (!requestingUserId) {
    return false;
  }
  return requestingUserId === bookingOwner; 
}
