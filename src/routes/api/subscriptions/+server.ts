import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import type { ParkingAvailableSubscription } from '$lib/model/models';
import { MAX_BOOKING_DAYS_FORWARD, DATE_OFFSET } from '$lib/constants';

export const GET: RequestHandler = async ({ locals, url }) => {
  const token = url.searchParams.get('token');

  const startDate = setToMidnight(new Date());
  startDate.setDate(startDate.getDate() + DATE_OFFSET);
  const endDate = setToMidnight(new Date());
  endDate.setDate(startDate.getDate() + MAX_BOOKING_DAYS_FORWARD);

  if (!token) {
    return json({ error: 'Invalid token' }, { status: 400 });
  } 

  const dbSubscriptions = await db.parkingAvailableSubscription.findMany({
    where: {
      token: token,
      date: {
        gte: startDate,
        lte: endDate,
      }
    }
  });

  const subscriptions = dbSubscriptions.map((subscription) => ({ token: subscription.token, date: formatDate(subscription.date)}));

	return json(subscriptions as ParkingAvailableSubscription[]);
}


export const POST: RequestHandler = async ({ locals, request }) => {
  const subscription = await parseParkingAvailableSubscription(request);
  if (!subscription) {
    return json({ error: 'Invalid subscription request' }, { status: 400 });
  }

  let existingSubscription = await getSubscription(subscription.token, subscription.date);
  let createdSubscription = null;
  
  if (!existingSubscription) {
    createdSubscription = await db.parkingAvailableSubscription.create({
      data: {
        token: subscription.token,
        date: setToMidnight(new Date(subscription.date)),
      },
    });
  }  

  return json(createdSubscription ?? existingSubscription, { status: 201 });
}

export const DELETE: RequestHandler = async ({ locals, url }) => {
  const token = url.searchParams.get('token');
  const date = url.searchParams.get('date');

  if (!token || !date) {
    return json({ error: 'Invalid token or date' }, { status: 400 });
  } 

  const subscription = await getSubscription(token, date);
  if (!subscription) {
    return json({ error: 'Subscription not found' }, { status: 404 });
  }

  await db.parkingAvailableSubscription.delete({
    where: {
      token_date: {
        token: token,
        date: setToMidnight(new Date(date)),
      },
    },
  });

  return json(undefined, { status: 204 });
}

async function parseParkingAvailableSubscription(request: Request): Promise<ParkingAvailableSubscription | undefined> {
  const body = await request.json();
  if (!body || typeof body.date !== 'string') {
    return undefined;
  }

  return {
    token: body.token,
    date: body.date,
  }
}

async function getSubscription(token: string, dateString: string) {
  return await db.parkingAvailableSubscription.findUnique({
    where: {
      token_date: {
        token: token,
        date: setToMidnight(new Date(dateString)),
      },
    },
  });
}

function setToMidnight(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}