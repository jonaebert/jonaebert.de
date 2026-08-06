<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { je_cms_base_url, name, pronouns } from '$lib/store.js';
	import Image from '$lib/components/ui/Image.svelte';

	// Countdown zur Wahl
	const wahlDatum = new Date('2026-09-13T00:00:00');
	let now = new Date();

	// Berechne die Anzahl der Tage bis zur Wahl
	let interval: number;

	onMount(() => {
		interval = setInterval(() => {
			now = new Date();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	$: tageBisWahl = Math.ceil((wahlDatum.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
</script>

<section class="relative min-h-[60vh] pb-10 flex items-center">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0">
		<img
			src={`${je_cms_base_url}/uploads/Braunschweig_Skyline_f04103fc88.avif`}
			alt="Braunschweiger Dom bei Nacht"
			class="w-full h-full object-cover opacity-80"
		/>
		<div class="absolute inset-0 bg-black/30"></div>
	</div>

	<!-- MAGENTA STREIFEN (12° Winkel) -->
	<div class="absolute -top-60 -left-30 w-full h-full pointer-events-none z-10">
		<div class="absolute w-[200%] h-[40%] bg-magenta transform -rotate-12"></div>
	</div>

	<div class="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center pt-32 z-20">
		<!-- Left Content -->
		<div class="text-white space-y-6">
			<div class="inline-block bg-grashalm text-tanne px-4 py-2 rounded-full text-sm font-bold">
				{#if tageBisWahl < 0}
					Kommunalwahl 2026 – vielen Dank für euer Vertrauen! Die Wahl ist vorbei.
				{:else if tageBisWahl === 0}
					Kommunalwahl 2026 – heute ist die Wahl!
				{:else if tageBisWahl === 1}
					Kommunalwahl 2026 – nur noch 1 Tag bis zur Wahl
				{:else}
					Kommunalwahl 2026 – {tageBisWahl} Tage bis zur Wahl
				{/if}
			</div>

			<h1 class="font-barlow-condensed text-4xl md:text-6xl">
				Braunschweig <span class="text-accent">zukunftsfähig</span> gestalten
			</h1>

			<p class="text-xl md:text-2xl text-white/90 max-w-lg">
				Ich kandidiere für den Stadtbezirksrat und Stadtrat, um mich für Klimaschutz, soziale
				Gerechtigkeit und eine klimaresiliente Stadt, in der alle gut leben können, einzusetzen.
			</p>

			<div class="flex flex-wrap gap-4 pt-4">
				<a
					href="/braunschweig2035#themen"
					class="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
				>
					Meine Themen
				</a>
				<a
					href="/braunschweig2035#unterstuetzen"
					class="px-6 py-3 border-2 border-white/30 text-white rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
				>
					Jetzt unterstützen
				</a>
			</div>
		</div>

		<!-- Right Content - Portrait -->
		<div class="flex flex-col space-y-3 items-center justify-center relative z-30">
			<div class="absolute -top-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
			<div class="flex flex-col items-center justify-center relative">
				<Image
					src={`${je_cms_base_url}/uploads/Jona_Hoch_29e9ec7fc4.avif`}
					alt="Portrait {name}"
					classNames="relative w-full max-w-md max-h-[25vh] rounded-2xl shadow-2xl"
				/>
				<div
					class="-mt-7 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-lg text-center"
				>
					<span class="font-bold text-accent">{name}</span>
					<span class="text-sm text-zinc-600 dark:text-zinc-400"> ({pronouns})</span>
				</div>
			</div>
			<div
				class="group relative bg-white/70 dark:bg-zinc-950/60 backdrop-blur rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 sm:p-6 overflow-hidden"
			>
				<div class="space-y-3">
					<h3
						class="text-lg sm:text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-100"
					>
						Für euch in Braunschweig
					</h3>

					<div class="text-zinc-600 dark:text-zinc-400 space-y-3">
						<div
							class="rounded-xl p-4 text-sm sm:text-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<p class="font-bold">Rat der Stadt Braunschweig</p>
							<div class="flex flex-nowrap gap-2 items-center">
								<p>Wahlbereich 21 (Braunschweig Südost)</p>
								<p>•</p>
								<p class="font-bold">Platz 2</p>
							</div>
						</div>
						<div
							class="rounded-xl p-4 text-sm sm:text-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<p class="font-bold">Stadtbezirksrat 322</p>
							<div class="flex flex-nowrap gap-2 items-center">
								<p>Nördliche Schunter-/Okeraue</p>
								<p>•</p>
								<p class="font-bold">Platz 1</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
