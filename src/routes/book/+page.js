import { GetBookingDays, GetAllParkingSpots } from '../../lib/Api';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const bookingDays = await GetBookingDays(fetch);
  const parkingSpots = await GetAllParkingSpots(fetch);

  return { bookingDays, parkingSpots }
}