import type { BookingDay, ParkingSpot, User } from "$lib/model/models";
import { writable } from "svelte/store";

export let message = writable<string>("Hello");

export let parkingSpots = writable<ParkingSpot[]>([]);

export let bookingDays = writable<BookingDay[]>([]);

export let user = writable<User>();