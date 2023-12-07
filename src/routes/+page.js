import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`https://dipspark-service.azurewebsites.net/Bookings`);
  const bookings = await res.json();
  console.log(bookings);
  return { bookings };
}