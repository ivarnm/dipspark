export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  hasPermanentParkingSpot: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export type BookingRequest = {
  date: Date,
  isCancellationBooking: boolean,
  userId: string,
}
