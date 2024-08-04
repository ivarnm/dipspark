import { GetBookingDays, GetAllParkingSpots } from '../../lib/Api';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
  const bookingDays = await GetBookingDays(fetch);
  const parkingSpots = await GetAllParkingSpots(fetch);

  return { bookingDays, parkingSpots }
}
