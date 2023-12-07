import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const userId = 1;
  const res = await fetch(`https://dipspark-service.azurewebsites.net/BookingsByUser?userid=${userId}`);
  const bookings = await res.json();
  console.log(bookings);
  return { bookings };
}