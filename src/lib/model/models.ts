export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
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
  date: Date | string,
  isCancellationBooking: boolean,
  userId: string,
}

export type ThemeRequest = {
  userId: string,
  theme: string,
}

export type ThemeStatistic = {
  value: string,
  label: string,
  users: number,
}

export type BookingStatistic = {
  userId: string,
  userName: string,
  bookings: number,
}

export type ParkingSpotUtilizationStatistic = {
  date: string,
  spotsUsed: number,
}