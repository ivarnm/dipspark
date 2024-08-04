export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  hasPermanentParkingSpot: boolean;
  createdAt: Date;
  updatedAt: Date;
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