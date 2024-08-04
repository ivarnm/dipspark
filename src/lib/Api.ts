import { error } from '@sveltejs/kit';
import DateFormat from '$lib/helpers/DateFormat';
import type { BookingDay, ParkingSpot, User } from '$lib/model/models';

const server = "https://dipspark-service.azurewebsites.net";

type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export async function GetBookingDays(fetch: FetchFunction): Promise<BookingDay[]> {
  try {
    const dateRange = DateFormat.getDateRange();
    const res = await fetch(`${server}/BookingsByDateRange?startdate=${dateRange[0]}&enddate=${dateRange[1]}`);
    let bookingDays = (await res.json()) as BookingDay[];
    
    bookingDays = DateFormat.fillMissingDays(dateRange, bookingDays);
    return bookingDays;
  } 
  catch (ex) {
    console.log(ex);
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}

export async function GetAllParkingSpots(fetch: FetchFunction): Promise<ParkingSpot[]> {
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
export async function BookDay(fetch: FetchFunction, userId: number, parkingDate: string) {
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
  catch (ex) {
    console.error('Error:', (ex as Error).message);
  }
}

export async function DeleteBooking(fetch: FetchFunction, bookingId: number) {
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
  catch (ex) {
    console.error('Error:', (ex as Error)?.message);
  }
}

export async function GetUsers(fetch: FetchFunction): Promise<User[]> {
  try {
    const res = await fetch(`${server}/AllUsers`);
    const users = await res.json();
    return users;
  } 
  catch (ex) {
    console.log(ex)
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}

export async function GetUser(fetch: FetchFunction, username: string): Promise<User[]> {
  try {
    const res = await fetch(`${server}/Users?username=${username.toLowerCase()}`);
    const user = await res.json();
    return user;
  } 
  catch (ex) {
    console.log(ex)
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}

export async function CreateUser(fetch: FetchFunction, name: string, username: string) {
  try {
    let user = {
      "name": name,
      "username": username.toLowerCase()
    };
    const res = await fetch(`${server}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    
    if (!res.ok) {
      console.error('API Error:', res.statusText);
      throw error(500, {
        message: 'Noe gikk galt'
      });
    }
  }
  catch (ex) {
    console.log(ex)
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}