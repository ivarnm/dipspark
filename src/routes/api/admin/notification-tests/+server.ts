import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { BookingRequest } from '$lib/model/models';
import { sendAvailableParkingNotification, sendNotification } from '$lib/helpers/firebase-admin';

const token = 'fBaTDYEhXPZctMe_CWm7Sg:APA91bEy2guHnIQi5NizCc_UUMDJv5REz4Vc62eeGGxlNcYi5aDFHyFH-BmL2_1du3IKmIC7RRBW69fYPb1LAw2QdKFoIvRyP9p9_TstGGov_Jyndwv3xK8' // Ivar Pixel 8 Pro
// const token = 'dmS4G9nt9yrKvGgbj2CRxY:APA91bGn7ff8QC4Fl3j-0P3tJMGzIa7ZlQgdPkNWqGxgipefMHlH-ebpJK0xY1NSHBxN67MpLgiLAeQ-dv2seFNY3kWvD-96Cu_rtK0ZlrPrVuWXA2-roVo' // Robin Samsung S23+
// const token = 'cnMEomx4eu_0yN5RckuYbd:APA91bH_SqvWAkL9UJejJLp5PUG-Z1BDZ_CyNU9a74DHXb94VlsBCehWgU-xclLuETLBhuwsrW-C30NH4TgJkUOBi1_JCtW5ykdBZXFYBD0ytFr_ei_7U8I' // Team Mobil Ipad 

export const GET: RequestHandler = async ({ locals, url }) => {
  await sendNotification([token], 'Ledig parkering', 'kakako');
  
  return json({ message: 'Notification sent' });
}

export const POST: RequestHandler = async ({ locals, request }) => {
  const bookingRequest = await parseBookingRequest(request);
  if (!bookingRequest) {
    return json({ error: 'Invalid booking request' }, { status: 400 });
  }

  await sendAvailableParkingNotification([token], new Date(bookingRequest.date));
  return json({ message: 'Notification sent' });
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

function setToMidnight(date: Date): Date {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}