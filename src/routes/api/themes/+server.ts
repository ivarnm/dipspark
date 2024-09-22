import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import type { ThemeRequest } from '$lib/model/models';

// Set user's selected theme
export const PATCH: RequestHandler = async ({ locals, request, }) => {
  const themeRequest = await parseThemeRequest(request);
  if (!themeRequest) {
    return json({ error: 'Invalid theme request' }, { status: 400 });
  }
  if (!(await canSetTheme(themeRequest, locals))) {
    return json({ error: 'User is not allowed to set the theme' }, { status: 403 });
  }

  var updated = await db.user.update({
    where: { id: themeRequest.userId },
    data: { selectedTheme: themeRequest.theme },
    select: { id: true, selectedTheme: true }
  });

  return json(updated, { status: 200 });
}

async function parseThemeRequest(request: Request): Promise<ThemeRequest | null> {
  const themeRequest = await request.json() as ThemeRequest;
  if (!themeRequest || !themeRequest.userId || !themeRequest.theme) {
    return null;
  }
  return themeRequest;
}

async function canSetTheme(themeRequest: ThemeRequest, locals: App.Locals): Promise<boolean> {
  var auth = await locals.auth();
  return auth?.user ? auth.user.id === themeRequest.userId : false;
}
