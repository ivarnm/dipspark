<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import Name from '$lib/components/Name.svelte';
	import BookedDate from '$lib/components/BookedDate.svelte';
	import YourBookings from '$lib/components/YourBookings.svelte';
	import PlusIcon from '$lib/components/PlusIcon.svelte';

	const date = new Date();

</script>

<div class="index">
	<div>
		<Name name="Ola" />
		<!-- <BookedDate date={new Date("11.08.2023")} /> -->
		<YourBookings bookings={data.bookings}  />
		<PlusIcon />
	</div>
</div>

<style>
	.index {
		margin: 50px 30px 50px 30px;
	}
</style>
