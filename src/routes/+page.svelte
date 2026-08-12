<script lang="ts">
	import Navbar from '../components/navbar/Navbar.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import WaveSpinner from '../components/WaveSpinner.svelte';
	import StatCard from '../components/StatCard.svelte';

	let clubName: string = $state('');
	let loading = $state(false);

	const getClubStats = async () => {
		if (clubName === '') {
			alert('Club Name is empty.');
		}

		loading = true;

		const words: string[] = clubName.split(' ');
		const clubNameJoined: string = words.join('+');

		const request = await fetch(`/api/club-stats?club_name=${clubNameJoined}`);
		const data = await request.json();

		console.log(data[0].createdTime);

		loading = false;
	};
</script>

<Navbar />
<div class="flex w-full flex-col p-16 text-center text-6xl">
	<div class="text-6xl font-bold">Skyline</div>
	<div class="text-3xl">Check out the stats and stuff for your favorite Hack Club!</div>
</div>
<div class="mx-8 mb-8 flex flex-col gap-3 sm:mx-16 md:mx-32 lg:mx-64 xl:mx-128">
	<div class="text-3xl font-bold">Enter Club Name</div>
	<input
		type="text"
		class="rounded-lg bg-[#1f1f27] px-4 py-2"
		placeholder="eg. Katalyst"
		bind:value={clubName}
	/>
	<button
		class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#ec3750] py-1 text-2xl font-bold hover:bg-[#ff8c37]"
		onclick={getClubStats}
	>
		{#if loading}
			<WaveSpinner />
		{:else}
			Get Club Stats
		{/if}
	</button>
</div>
<div class="mx-8 mb-8 flex flex-col gap-3 sm:mx-16 md:mx-32 lg:mx-64">
	<div class="text-4xl font-bold">Club Name</div>
	<div class="flex flex-col items-stretch justify-stretch gap-4 sm:flex-row">
		<StatCard title="# of attendees" content="42" />
		<StatCard title="Club Status" content="Active" />
		<StatCard title="Country" content="India" />
	</div>
</div>
<Footer />
