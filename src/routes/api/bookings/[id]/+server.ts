import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const booking = await db.booking.findUnique({
    where: {
      id: params.id
    },
  });
  
  if (!booking) {
    return json({ error: 'Booking not found' }, { status: 404 });
  }
  if (!(await canDelete(booking.userId, locals))) {
    return json({ error: 'User is not allowed to delete the booking' }, { status: 403 });
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
