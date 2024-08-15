import type { User } from "$lib/model/models";
import { GetBookingDays, GetUsers } from '$lib/Api';

import type { LayoutServerLoad } from "./$types"
 
export const load: LayoutServerLoad = async ({ locals, fetch}) => {
  const session = await locals.auth();
  const user = session?.user as User | undefined;
 
  let bookingDays = null;
  let users = null;
  if (user) {
    [bookingDays, users] = await Promise.all([GetBookingDays(fetch), GetUsers(fetch)]);
  }

  return {
    user: user ?? null,
    bookingDays,
    users
  }
}