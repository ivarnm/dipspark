import type { BookingDay, User } from "$lib/model/models";
import { writable } from "svelte/store";

export let message = writable<string>("Hello");

export let bookingDays = writable<BookingDay[]>([]);

export let user = writable<User>();

export let users = writable<User[]>([]);
