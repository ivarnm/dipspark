function localeString(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const locale = 'nb-NO';
  const localeDateString = date?.toLocaleDateString(locale, options);
  return localeDateString?.charAt(0).toUpperCase() + localeDateString?.slice(1);
}

export default {
  localeString
};
