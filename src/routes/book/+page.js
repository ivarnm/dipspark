import { error } from '@sveltejs/kit';
import DateFormat from '../../lib/helpers/DateFormat';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  try {
    const dateRange = DateFormat.getDateRange();
    const res = await fetch(`https://dipspark-service.azurewebsites.net/BookingsByDateRange?startdate=${dateRange[0]}&enddate=${dateRange[1]}`);
    let bookingDays = await res.json();
    bookingDays = DateFormat.fillMissingDays(dateRange, bookingDays);

    // console.log(dateRange);
    console.log(bookingDays);
  
    return { bookingDays };
    
  } catch (ex) {
    console.log(ex);
    throw error(404, {
			message: 'Noe gikk galt'
		});
  }
}