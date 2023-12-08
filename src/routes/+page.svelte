<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import Name from '$lib/components/Name.svelte';
	import BookedDate from '$lib/components/BookedDate.svelte';
	import YourBookings from '$lib/components/YourBookings.svelte';
	import PlusIcon from '$lib/components/PlusIcon.svelte';

</script>

<div class="index">
	<div>
		<Name name="Ola" />
		<YourBookings bookingDays={data.bookingDays}  />
		<PlusIcon />
	</div>
</div>

<style>
	.index {
	}
</style>
