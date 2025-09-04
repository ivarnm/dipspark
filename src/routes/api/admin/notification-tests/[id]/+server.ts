import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import { sendAvailableParkingNotification } from '$lib/helpers/firebase-admin';

const token = 'fBaTDYEhXPZctMe_CWm7Sg:APA91bEy2guHnIQi5NizCc_UUMDJv5REz4Vc62eeGGxlNcYi5aDFHyFH-BmL2_1du3IKmIC7RRBW69fYPb1LAw2QdKFoIvRyP9p9_TstGGov_Jyndwv3xK8' // Ivar Pixel 8 Pro
// const token = 'dmS4G9nt9yrKvGgbj2CRxY:APA91bGn7ff8QC4Fl3j-0P3tJMGzIa7ZlQgdPkNWqGxgipefMHlH-ebpJK0xY1NSHBxN67MpLgiLAeQ-dv2seFNY3kWvD-96Cu_rtK0ZlrPrVuWXA2-roVo' // Robin Samsung S23+
// const token = 'cnMEomx4eu_0yN5RckuYbd:APA91bH_SqvWAkL9UJejJLp5PUG-Z1BDZ_CyNU9a74DHXb94VlsBCehWgU-xclLuETLBhuwsrW-C30NH4TgJkUOBi1_JCtW5ykdBZXFYBD0ytFr_ei_7U8I' // Team Mobil Ipad 


export const DELETE: RequestHandler = async ({ locals, params }) => {
	const bookingToDelete = await db.booking.findUnique({
		where: {
			id: params.id
		}
	});

	if (!bookingToDelete) {
    return json({ error: 'Booking not found' }, { status: 404 });
	}
  
  await sendAvailableParkingNotification([token], bookingToDelete.date);
	return json({ message: 'Notification sent' });
};
