import type { ParkingSpot, User } from "$lib/model/models";

function isDefaultUser(user: User, parkingSpots: ParkingSpot[]): boolean {
  const defaultParkingSpotUsers = parkingSpots.map(p => p.defaultUserId).filter(id => id > 0);
  return defaultParkingSpotUsers.includes(user?.id);
}

export default {
  isDefaultUser
}
