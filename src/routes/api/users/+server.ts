import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';


export const GET: RequestHandler = async (event) => {
	var users = await db.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
      hasPermanentParkingSpot: true
		}
	});
	return json(users);
}
