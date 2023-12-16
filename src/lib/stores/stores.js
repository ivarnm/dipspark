import { writable } from "svelte/store";

export let message = writable("Hello");

export let parkingSpots = writable([]);

export let bookingDays = writable([]);

export let user = writable();