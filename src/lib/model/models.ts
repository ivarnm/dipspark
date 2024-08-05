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
  id: string,
  date: Date,
  isCancellationBooking: boolean,
  user: {
    id: string,
    name: string,
  }
}

export type BookingDay = {
  date: string,
  bookings: Booking[],
}