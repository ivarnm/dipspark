import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';

export const GET: RequestHandler = async ({ locals }) => {
  const users = await db.user.findMany();
  return json(users)
}
