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

  } 
  catch (ex) {
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
  } 
  catch (ex) {
    console.log(error)
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}

/**
 * Book a parking spot on a given day for an user
 * @param {Function} fetch 
 * @param {number} userId 
 * @param {string} parkingDate Date to book (format: yyyy-mm-dd)
 */
export async function BookDay(fetch, userId, parkingDate) {
  try {
    const booking = {
      "userId": userId,
      "parkingDate": parkingDate,
    }
    const response = await fetch(`${server}/Booking/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)
    });

    if (!response.ok) {
      console.error('API Error:', response.statusText);
      return;
    }
  } 
  catch (error) {
    console.error('Error:', error.message);
  }
}

export async function DeleteBooking(fetch, bookingId) {
  try {
    const response = await fetch(`${server}/Bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error('API Error:', response.statusText);
      return;
    }
  } 
  catch (error) {
    console.error('Error:', error.message);
  }
}