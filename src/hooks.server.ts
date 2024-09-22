import { sequence } from '@sveltejs/kit/hooks';
import { handle as authenticationHandle } from '$lib/server/auth';
import { json } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/model/models';


const authorizationHandle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  if (!pathname.startsWith('/api') && !pathname.startsWith('/admin')) {
    return await resolve(event);
  }
  const auth = await event.locals.auth();
  if (!auth?.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/admin')) {
    if (!(auth?.user as User).isAdmin) {
      return json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  return await resolve(event);
};

export const handle = sequence(authenticationHandle, authorizationHandle);
