import { error } from '@sveltejs/kit';
import DateFormat from '../lib/helpers/DateFormat';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    const userId = 1;
    const res = await fetch(`https://dipspark-service.azurewebsites.net/BookingsByUser?userid=${userId}`);
    const bookings = await res.json();
    // console.log(bookings);
  
    return { bookings };
    
  } catch (ex) {
    console.log(ex);
    throw error(404, {
			message: 'Noe gikk galt'
		});
  }
}