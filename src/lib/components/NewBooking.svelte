<script>
	import BookedDate from '$lib/components/BookedDate.svelte';

	export let bookings = [];
</script>

<div class="container">
	<h2>Book parkering</h2>

	{#each bookings as booking (booking.id)}
		<BookedDate {booking} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 10px 0;
	}

	h2 {
		font-size: 20px;
		font-weight: 700;
		margin: 0;
		padding: 0;
	}
</style>
