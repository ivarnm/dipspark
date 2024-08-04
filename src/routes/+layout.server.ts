import type { User } from "$lib/model/models";
import type { LayoutServerLoad } from "./$types"
 
export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth();
  const user = session?.user as User | undefined;

  return {
    user: user ?? null
  }
}