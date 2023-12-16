import { error } from '@sveltejs/kit';
import DateFormat from '$lib/helpers/DateFormat';

const server = "https://dipspark-service.azurewebsites.net";

export async function GetBookingDays(fetch) {
  try {
    const dateRange = DateFormat.getDateRange();
    const res = await fetch(`${server}/BookingsByDateRange?startdate=${dateRange[0]}&enddate=${dateRange[1]}`);
    let bookingDays = await res.json();
    bookingDays = DateFormat.fillMissingDays(dateRange, bookingDays);

    // console.log(dateRange);
    // console.log(bookingDays);
  
    return bookingDays;
    
  } catch (ex) {
    console.log(ex);
    throw error(500, {
			message: 'Noe gikk galt'
		});
  }
}

export async function GetAllParkingSpots(fetch) {
  try {
    const res = await fetch(`${server}/Parkingspots`);
    const parkingspots = await res.json()
    // console.log(parkingspots);
    return parkingspots
  } catch (ex) {
    console.log(error)
    throw error(500, {
			message: 'Noe gikk galt'
		}); 
  }
}