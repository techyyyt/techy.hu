<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import OsuIcon from '$lib/components/OsuIcon.svelte';

	type SpotifyTrack = {
		isPlaying: boolean;
		title: string;
		artist: string;
		albumImageUrl: string;
		url: string;
	};

	let track: SpotifyTrack | null = null;

	onMount(async () => {
		const res = await fetch('/spotify');
		track = await res.json();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="bg-space min-h-screen font-mono select-none">
	<!-- header -->
	<header class="p-8 text-white">
		<div class="mx-auto max-w-6xl text-center">
			<h2 class="mb-4 flex items-center justify-center gap-3 text-3xl font-bold md:text-5xl">
				hi, i'm techy ◕‿◕
			</h2>
			<p class="flex items-center justify-center gap-3 text-xl opacity-80">
				<Icon icon="mdi:cake-variant" width="24" height="24" /> 17 years old
				<Icon icon="mdi:earth" width="24" height="24" /> from hungary
			</p>
			<p class="mt-2 text-lg opacity-70">welcome to my digital space (´∀｀)♡</p>
		</div>
	</header>

	<!-- main content -->
	<main class="mx-auto max-w-7xl p-8">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- about me -->
			<div
				class="floating-box rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white"
			>
				<h2 class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Icon icon="mdi:account" width="24" height="24" /> about me ＼(^o^)／
				</h2>
				<p class="mb-2 text-[0.98em]">
					in my free time, i’m collecting old discs & vhs tapes. i love preserving small pieces of
					digital history (◡‿◡)
				</p>
				<p class="mb-2 text-[0.98em]">
					outside of that, i’m hooked on rhythm games (osu! addict here ✧◝(＾▽＾)◜✧) and i love
					gaming in general.
				</p>
				<p class="text-[0.98em]">
					i also like relaxing with some anime, but i have less time for that nowadays (︶︹︺)
				</p>
			</div>

			<!-- coding skills -->
			<div
				class="floating-box rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 p-6 text-white"
			>
				<h2 class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Icon icon="mdi:keyboard" width="24" height="24" /> coding skills (｡◕‿◕｡)
				</h2>
				<div class="flex flex-wrap gap-3 text-lg">
					{#each [['devicon:python', 'py'], ['devicon:html5', 'html'], ['devicon:css3', 'css'], ['devicon:git', 'git'], ['devicon:javascript', 'javascript'], ['devicon:typescript', 'typescript'], ['devicon:csharp', 'c#'], ['devicon:react', 'react'], ['devicon:postgresql', 'postgresql'], ['devicon:docker', 'docker'], ['devicon:tailwindcss', 'tailwind'], ['devicon:linux', 'linux'], ['catppuccin:batch', 'batch']] as [icon, name] (name)}
						<span
							class="flex items-center gap-1 rounded-full bg-gray-600 px-3 py-1 text-sm font-medium transition hover:bg-gray-500"
						>
							<Icon {icon} width="16" height="16" />
							{name}
						</span>
					{/each}
				</div>
			</div>

			<!-- spotify box -->
			<div
				class="floating-box flex flex-col items-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center text-white"
			>
				<h2 class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Icon icon="fa6-solid:music" width="24" /> spotify status ♪(´▽｀)
				</h2>

				{#if track}
					<div class="flex flex-col items-center">
						<a href={track.url} target="_blank" rel="noopener noreferrer">
							<img
								src={track.albumImageUrl}
								alt="album art"
								class="mb-3 h-auto w-full max-w-[150px] rounded-lg shadow-lg transition hover:opacity-80"
								draggable="false"
							/>
						</a>
						<a href={track.url} target="_blank" class="font-bold hover:underline">{track.title}</a>
						<p class="text-sm opacity-70">{track.artist}</p>
						{#if track.isPlaying}
							<p class="mt-1 text-xs opacity-60">currently playing └(＾＾)┐</p>
						{:else}
							<p class="mt-1 text-xs opacity-60">last played (◡‿◡)</p>
						{/if}
					</div>
				{:else}
					<p class="text-sm opacity-60">loading... (・-・)</p>
				{/if}
			</div>

			<!-- projects -->
			<div
				class="floating-box rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 p-6 text-white md:col-span-2"
			>
				<h2 class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Icon icon="mdi:pencil" width="24" height="24" />
					my projects (ﾉ◕ヮ◕)ﾉ *:･ﾟ✧
				</h2>
				<div class="grid gap-4 sm:grid-cols-2">
					<button
						class="hover-project w-full cursor-pointer rounded-2xl border border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-4 text-left"
						on:click={() => window.open('https://ytrecyclebin.techy.hu', '_blank')}
					>
						<h3 class="mb-2 font-bold">youtube recycle bin</h3>
						<p class="mb-2 text-sm opacity-60">look at videos with almost no views!</p>
						<p class="text-xs opacity-50">made in next.js + typescript</p>
					</button>

					<button
						class="hover-project w-full cursor-pointer rounded-2xl border border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-4 text-left"
						on:click={() => window.open('https://search.techy.hu', '_blank')}
					>
						<h3 class="mb-2 font-bold">osu! beatmap search</h3>
						<p class="mb-2 text-sm opacity-60">still in development... ヽ(´▽`)/</p>
						<p class="text-xs opacity-50">made in next.js + typescript</p>
					</button>

					<div
						class="hover-project rounded-2xl border border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-4"
					>
						<h3 class="mb-2 font-bold">this website</h3>
						<p class="mb-2 text-sm opacity-60">nothing to say, just look at it (＾▽＾)</p>
						<p class="text-xs opacity-50">made in svelte</p>
					</div>

					<div
						class="hover-project rounded-2xl border border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-4"
					>
						<h3 class="mb-2 font-bold">more to come! ＼(￣▽￣)／</h3>
						<p class="mb-2 text-sm opacity-60">i may be brewing some ideas...</p>
						<p class="text-xs opacity-50">check out my github!</p>
					</div>
				</div>
			</div>

			<!-- links -->
			<div
				class="floating-box rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white"
			>
				<h2 class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Icon icon="mdi:internet" width="24" height="24" /> find me (´ ∀ `)ﾉ
				</h2>
				<div class="grid grid-cols-2 gap-3">
					<button
						class="link-button cursor-pointer rounded-2xl bg-gray-600 p-3 transition-colors hover:bg-gray-500"
						on:click={() => window.open('https://www.youtube.com/@techyarchivuma', '_blank')}
					>
						<div class="flex flex-col items-center">
							<Icon icon="mdi:youtube" width="24" height="24" class="mb-1" />
							<span class="text-sm">youtube</span>
						</div>
					</button>
					<button
						class="link-button cursor-pointer rounded-2xl bg-gray-600 p-3 transition-colors hover:bg-gray-500"
						on:click={() => window.open('https://github.com/techyyyt', '_blank')}
					>
						<div class="flex flex-col items-center">
							<Icon icon="mdi:github" width="24" height="24" class="mb-1" />
							<span class="text-sm">github</span>
						</div>
					</button>
					<button
						class="link-button group relative cursor-pointer rounded-2xl bg-gray-600 p-3 transition-colors hover:bg-gray-500"
						on:click={() => window.open('https://discord.com/users/195968823990550528', '_blank')}
					>
						<div class="flex flex-col items-center gap-0.5">
							<Icon icon="ic:baseline-discord" width="24" height="24" />
							<span class="text-sm">discord</span>
						</div>
						<!-- tooltip saying my dc -->
						<div
							class="pointer-events-none absolute bottom-full left-1/2 mb-1
                    -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap
                    text-white opacity-0 transition group-hover:opacity-100"
						>
							@techyyt
						</div>
					</button>
					<button
						class="link-button cursor-pointer rounded-2xl bg-gray-600 p-3 transition-colors hover:bg-gray-500"
						on:click={() => window.open('https://osu.ppy.sh/users/16279810', '_blank')}
					>
						<div class="flex flex-col items-center gap-0.5">
							<OsuIcon size={24} fill="#fff" />
							<span class="text-sm">osu!</span>
						</div>
					</button>
					<button
						class="link-button cursor-pointer rounded-2xl bg-gray-600 p-3 transition-colors hover:bg-gray-500"
						on:click={() => window.open('https://steamcommunity.com/id/techy-yt/', '_blank')}
					>
						<div class="flex flex-col items-center gap-0.5">
							<Icon icon="mdi:steam" width="24" height="24" />
							<span class="text-sm">steam</span>
						</div>
					</button>
					<button
						class="link-button cursor-pointer rounded-2xl bg-gray-600 p-3 transition-colors hover:bg-gray-500"
						on:click={() => window.open('https://anilist.co/user/techyy/', '_blank')}
					>
						<div class="flex flex-col items-center gap-0.5">
							<Icon icon="simple-icons:anilist" width="24" height="24" />
							<span class="text-sm">anilist</span>
						</div>
					</button>
				</div>
			</div>
		</div>
	</main>
</div>
