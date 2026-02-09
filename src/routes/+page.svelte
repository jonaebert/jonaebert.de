<script lang="ts">
	import { je_cms_base_url, name, pronouns } from '$lib/store.js';
	import { FormatDate } from '$lib/util/date.js';
	import Calendar from '$lib/components/blocks/Calendar.svelte';
	import Blog from '$lib/components/blocks/Blog.svelte';
	import Image from '$lib/components/Image.svelte';
	import Slogan from '$lib/components/blocks/Slogan.svelte';
	import SocialIcons from '$lib/components/blocks/SocialIcons.svelte';

	export let data;
	const { posts, events } = data;

	// Helper to check if two ISO date strings are on the same day
	function sameDay(aIso?: string | null, bIso?: string | null): boolean {
		if (!aIso || !bIso) return false;
		const a = new Date(aIso);
		const b = new Date(bIso);
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	// Helper to check if two Date objects are on the same day (local time)
	function isSameDayLocal(a: Date, b: Date): boolean {
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	// Helper to check if an event is today
	function isTodayEvent(startIso?: string | null, endIso?: string | null): boolean {
		if (!startIso) return false;
		const now = new Date();
		const start = new Date(startIso);
		const end = endIso ? new Date(endIso) : null;
		return isSameDayLocal(start, now) || (end ? isSameDayLocal(end, now) : false);
	}

	// Helper to check if an event is live now
	function isLiveNow(startIso?: string | null, endIso?: string | null): boolean {
		if (!startIso) return false;
		const now = new Date();
		const start = new Date(startIso);
		const end = endIso ? new Date(endIso) : new Date(start.getTime() + 90 * 60 * 1000);
		return now >= start && now <= end;
	}
</script>

<section class="grid gap-5 lg:grid-cols-12">
	<!-- HERO -->
	<div
		class="relative overflow-hidden lg:col-span-7 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6 sm:p-8
         bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950"
	>
		<video
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			poster={`${je_cms_base_url}/uploads/thumbnail_Hero_Video_Teaserimage_704af3dfc7.png`}
			class="absolute inset-0 z-0 w-full h-full object-cover motion-reduce:hidden"
		>
			<source src="/home/herovideo.mp4" type="video/mp4" />
		</video>
		<div
			class="absolute inset-0 z-1 bg-black/10 dark:bg-linear-to-b dark:from-zinc-950/80 dark:via-zinc-950/55 dark:to-zinc-950/85"
		></div>

		<div class="relative z-10 flex items-start justify-between gap-6 mb-25">
			<div
				class="rounded-2xl p-4 sm:p-5 bg-white/50 backdrop-blur-md border border-white/40 shadow-sm dark:bg-transparent dark:backdrop-blur-0 dark:border-transparent dark:shadow-none"
			>
				<div
					class="inline-flex scale-105 items-center gap-2 rounded-full px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					<span class="h-2 w-2 rounded-full bg-accent"></span>
					<span class="text-zinc-600 dark:text-zinc-400"><Slogan /></span>
				</div>
				<div>
					<h1
						class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
					>
						<span class="text-accent font-bold">{name}</span>
						<span class="text-zinc-700 dark:text-zinc-300">({pronouns})</span>
					</h1>

					<div>
						<h2
							class="mt-4 text-zinc-900 dark:text-zinc-200 text-xl sm:text-2xl font-medium tracking-tight"
						>
							Politik für eine lebenswerte Zukunft in Braunschweig
						</h2>

						<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 max-w-2xl leading-relaxed">
							Der Klimawandel ist eine zentrale Herausforderung – auch auf kommunaler Ebene. In
							Braunschweig zeigt er sich konkret: durch steigende Temperaturen, wachsende
							Anforderungen an Infrastruktur und die Frage, wie wir Mobilität, Wohnen und
							Lebensqualität sozial gerecht gestalten.
						</p>

						<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 max-w-2xl leading-relaxed">
							Ich setze mich für eine linke, solidarische Kommunalpolitik ein, die ökologische
							Verantwortung und soziale Gerechtigkeit zusammen denkt. Ziel ist eine lebenswerte
							Stadt mit langfristig tragfähigen Lösungen – gemeinsam mit den Menschen vor Ort.
						</p>
					</div>

					<div class="mt-6 flex flex-wrap gap-3">
						<a
							href="/about"
							class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
						>
							Über mich
						</a>

						<!--<a
							href="/calendar"
							class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
						>
							Kalender ansehen
						</a>-->

						<a
							href="/contact"
							class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
						>
							Kontakt
						</a>
					</div>
				</div>
				<div class="mt-6 w-fit">
					<SocialIcons />
				</div>
			</div>

			<div class="hidden sm:block">
				<div
					class="h-24 w-24 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center"
				>
					<div class="h-21 w-21 rounded-xl bg-accent overflow-hidden">
						<Image
							src="https://cms.jonaebert.de/uploads/Portrait_1000x1000_Cropped_ab728114f8.png"
							alt="Portrait von {name}"
							classNames="h-full w-full"
						></Image>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- RIGHT COLUMN: STATUS + QUICK LINKS -->
	<div class="lg:col-span-5 grid gap-5">
		<!-- Status -->
		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
			<div class="flex items-center justify-between">
				<div>
					<div class="text-sm font-medium">Aktuell</div>
					<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Was gerade passiert</div>
				</div>
				<span
					class="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30"
				>
					<span class="h-2 w-2 rounded-full bg-accent"></span>
					live
				</span>
			</div>

			<div class="mt-5 space-y-3">
				<!-- Neuester Beitrag -->
				{#await posts}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Neuester Beitrag</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Lädt…</div>
					</div>
				{:then ps}
					{@const latestPost = [...ps].sort(
						(a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
					)[0]}
					{#if latestPost}
						<a
							href={`/blog/${latestPost.documentId}`}
							class="block rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
						>
							<div class="flex items-start justify-between gap-3">
								<div class="text-sm font-medium">Neuester Beitrag</div>
								<span
									class="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-zinc-200/70 dark:border-zinc-800/70 text-zinc-600 dark:text-zinc-400"
								>
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M5 12h12" />
										<path d="M13 6l6 6-6 6" />
									</svg>
									öffnen
								</span>
							</div>

							<div class="mt-1 text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2">
								{latestPost.title}
							</div>

							<div class="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
								{FormatDate(latestPost.createdAt, 'date')}
							</div>
						</a>
					{:else}
						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium">Neuester Beitrag</div>
							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Noch keine Beiträge.</div>
						</div>
					{/if}
				{:catch err}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Neuester Beitrag</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{String(err)}</div>
					</div>
				{/await}

				<!-- Nächster / aktueller Termin -->
				{#await events}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Nächster Termin</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Lädt…</div>
					</div>
				{:then es}
					{@const now = new Date()}
					{@const upcoming = [...es]
						.filter((e) => e?.start && new Date(e.start) >= now)
						.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0]}
					{@const latestByStart = [...es].sort(
						(a, b) => new Date(b.start ?? 0).getTime() - new Date(a.start ?? 0).getTime()
					)[0]}
					{@const pick = upcoming ?? latestByStart}

					{#if pick}
						{@const live = isLiveNow(pick.start, pick.end)}
						{@const today = isTodayEvent(pick.start, pick.end)}

						<a
							href={`/calendar/${pick.documentId}`}
							class="block rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
						>
							<div class="flex items-start justify-between gap-3">
								<div class="text-sm font-medium">{live ? 'Läuft gerade' : 'Nächster Termin'}</div>

								{#if live}
									<span
										class="shrink-0 inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/35 dark:text-rose-200 dark:border-rose-900/60"
									>
										<span class="h-2 w-2 rounded-full bg-rose-500"></span>
										jetzt
									</span>
								{:else if today}
									<span
										class="shrink-0 inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/35 dark:text-amber-200 dark:border-amber-900/60"
									>
										<span class="h-2 w-2 rounded-full bg-amber-500"></span>
										heute
									</span>
								{/if}
							</div>

							<div class="mt-1 text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2">
								{pick.subject}
							</div>

							<div class="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
								{FormatDate(pick.start, 'date')} · {FormatDate(pick.start, 'time')}
								{#if pick.end}
									{#if sameDay(pick.start, pick.end)}
										– {FormatDate(pick.end, 'time')}
									{:else}
										– {FormatDate(pick.end, 'date')} {FormatDate(pick.end, 'time')}
									{/if}
								{/if}
							</div>
						</a>
					{:else}
						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium">Nächster Termin</div>
							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Keine Termine.</div>
						</div>
					{/if}
				{:catch err}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Nächster Termin</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{String(err)}</div>
					</div>
				{/await}
			</div>
		</div>

		<!-- Quick Links -->
		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
			<div class="text-sm font-medium">Schnellzugriff</div>
			<div class="mt-4 grid gap-3 sm:grid-cols-2">
				<a
					href="/blog"
					class="rounded-xl p-4 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
				>
					<div class="text-sm font-medium">Blog</div>
					<div class="text-sm text-zinc-600 dark:text-zinc-400">Neueste Updates</div>
				</a>
				<a
					href="/calendar"
					class="rounded-xl p-4 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
				>
					<div class="text-sm font-medium">Kalender</div>
					<div class="text-sm text-zinc-600 dark:text-zinc-400">Nächste Termine</div>
				</a>
				<a
					href="/about"
					class="rounded-xl p-4 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
				>
					<div class="text-sm font-medium">Über mich</div>
					<div class="text-sm text-zinc-600 dark:text-zinc-400">Kurzprofil</div>
				</a>
				<a
					href="/contact"
					class="rounded-xl p-4 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
				>
					<div class="text-sm font-medium">Kontakt</div>
					<div class="text-sm text-zinc-600 dark:text-zinc-400">Schreib mir</div>
				</a>
			</div>
		</div>
	</div>

	<!-- Calendar Preview -->
	<div class="lg:col-span-6">
		<Calendar {events} items={8} />
	</div>

	<!-- Blog Preview -->
	<div class="lg:col-span-6">
		<Blog {posts} limit={4} />
	</div>
</section>
