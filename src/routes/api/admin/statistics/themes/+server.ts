import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import { THEMES } from '$lib/constants';

// Get theme usage statistics
export const GET: RequestHandler = async ({ locals }) => {
  var dbThemes = await db.user.groupBy({
    by: ['selectedTheme'],
    _count: {
      selectedTheme: true,
    },
  });

  const allThemes = THEMES.flatMap(theme => {
    if (theme.value === 'system') {
      return [
        { value: 'system (dark)', label: 'Automatisk (Mørk)' },
        { value: 'system (light)', label: 'Automatisk (Lys)' },
      ];
    }
    return theme;
  });

  const themeUsage = allThemes.map((theme) => {
    const dbTheme = dbThemes.find(t => t.selectedTheme === theme.value);
    return {
      value: theme.value,
      label: theme.label,
      users: dbTheme ? dbTheme._count.selectedTheme : 0
    };
  });
  themeUsage.sort((a, b) => b.users - a.users);

  return json(themeUsage);
}
