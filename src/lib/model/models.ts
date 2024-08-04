export type User = {
  id: number;
  name: string;
  username: string;
}

export type ParkingSpot = {
  id: number,
  defaultUserId: number,
}

export type Booking = {
  id: number,
  createdDate: Date,
  parkingDate: Date,
  parkingId: number,
  userId: number,
  userName: string,
}

export type BookingDay = {
  date: string,
  bookings: Booking[],
}