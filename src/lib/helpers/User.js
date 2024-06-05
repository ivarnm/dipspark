function isDefaultUser(user, parkingSpots) {
  const defaultParkingSpotUsers = parkingSpots.map(p => p.defaultUserId).filter(id => id > 0);
  return defaultParkingSpotUsers.includes(user?.id);
}

export default {
  isDefaultUser
}