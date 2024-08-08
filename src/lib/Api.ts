import { error } from '@sveltejs/kit';
import type { Booking, BookingDay, BookingRequest, User } from '$lib/model/models';


type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export async function GetBookingDays(fetch: FetchFunction): Promise<BookingDay[]> {
  try {
    const res = await fetch("/api/bookings");
    let bookingDays = (await res.json()) as BookingDay[];
    return bookingDays;
  } 
  catch (ex) {
    console.log(ex);
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}

export async function BookDay(fetch: FetchFunction, request: BookingRequest) {
  try {
    const response = await fetch("/api/bookings", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      console.error('API Error:', response.statusText);
      return;
    }
    return await response.json() as Booking;    
  } 
  catch (ex) {
    console.error('Error:', (ex as Error).message);
  }
}

export async function DeleteBooking(fetch: FetchFunction, bookingId: string) {
  try {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: 'DELETE',
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
    const res = await fetch("/api/users");
    const users = (await res.json()) as User[];
    return users;
  } 
  catch (ex) {
    console.log(ex)
    throw error(500, {
      message: 'Noe gikk galt'
    });
  }
}
