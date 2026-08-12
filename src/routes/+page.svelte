<script lang="ts">
	import Navbar from '../lib/components/navbar/Navbar.svelte';
	import Footer from '../lib/components/footer/Footer.svelte';
	import WaveSpinner from '../lib/components/WaveSpinner.svelte';
	import StatCard from '../lib/components/StatCard.svelte';
	import type { ClubData } from '$lib/types/clubData';
	import type { ClubStat } from '$lib/types/clubStat';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let clubName: string = $state('');
	let loading = $state(false);

	let clubData: ClubData | undefined = $state();

	const getClubData = async () => {
		if (clubName === '') {
			alert('Club Name is empty.');
		}

		loading = true;

		const words: string[] = clubName.split(' ');
		const clubNameJoined: string = words.join('+');

		try {
			const clubInfoRequest = await fetch(`/api/club-info?club_name=${clubNameJoined}`);
			const clubInfoData = await clubInfoRequest.json();

			const clubStatsRequest = await fetch(`/api/club-stats?club_name=${clubNameJoined}`);
			const clubStatData = await clubStatsRequest.json();

			let clubStats: ClubStat[] = [];

			for (let i = 0; i < clubStatData.length; i++) {
				const clubStat = clubStatData[i];

				clubStats.push({
					code_url: clubStat.fields.code_url,
					createdTime: clubStat.createdTime,
					email: clubStat.fields.email,
					ysws: clubStat.fields.ysws
				});
			}

			let output: ClubData = {
				name: clubInfoData.fields.club_name,
				clubStatus: clubInfoData.fields.club_status,
				country: clubInfoData.fields.venue_address_country,
				level: clubInfoData.fields.level,
				noOfAttendees: clubInfoData.fields['Est. # of Attendees'],
				stats: clubStats
			};

			clubData = output;
		} catch (error) {
			alert(`Something went wrong: ${error}`);
		}

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
		onclick={getClubData}
	>
		{#if loading}
			<WaveSpinner />
		{:else}
			Get Club Stats
		{/if}
	</button>
</div>
{#if clubData}
	<div class="mx-8 mb-8 flex flex-col gap-3 sm:mx-16 md:mx-32 lg:mx-64">
		<div class="text-4xl font-bold">{clubData.name}</div>
		<div class="flex flex-col items-stretch justify-stretch gap-4 sm:flex-row">
			<StatCard title="# of attendees" content={clubData.noOfAttendees.toString() ?? 0} />
			<StatCard title="Club Status" content={clubData.clubStatus} />
			<StatCard title="Country" content={clubData.country} />
			<StatCard title="Level" content={clubData.level} />
		</div>
		<div class="text-2xl font-bold">Projects</div>
		{#each clubData.stats as stat}
			<ProjectCard {stat} />
		{/each}
	</div>
{/if}
<Footer />
