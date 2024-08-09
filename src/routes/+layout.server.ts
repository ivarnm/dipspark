import type { User } from "$lib/model/models";
import { GetBookingDays, GetUsers } from '$lib/Api';

import type { LayoutServerLoad } from "./$types"
 
export const load: LayoutServerLoad = async ({ locals, fetch}) => {
  const session = await locals.auth();
  const user = session?.user as User | undefined;
  const bookingDays = !!user ? await GetBookingDays(fetch) : null;
  const users = !!user ? await GetUsers(fetch) : null;

  return {
    user: user ?? null,
    bookingDays,
    users
  }
}