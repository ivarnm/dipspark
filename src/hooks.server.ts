import { sequence } from '@sveltejs/kit/hooks';
import { handle as authenticationHandle } from '$lib/server/auth';
import { json } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';


const authorizationHandle: Handle = async ({ event, resolve }) => {
  const auth = await event.locals.auth();
  if (!auth?.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  return await resolve(event);
};

export const handle = sequence(authenticationHandle, authorizationHandle);
