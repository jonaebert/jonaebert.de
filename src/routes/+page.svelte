<script lang="ts">
	import { je_cms_base_url, name, pronouns } from '$lib/store.js';
	import CalendarListSkeleton from '$lib/components/skeleton/CalendarListSkeleton.svelte';
	import BlogCardSkeleton from '$lib/components/skeleton/BlogCardSkeleton.svelte';
	import Slogan from '$lib/components/blocks/Slogan.svelte';
	import Image from '$lib/components/Image.svelte';
	import { FormatDate } from '$lib/util/date.js';

	export let data;
	const { posts, events } = data;

	// Helper to get cover image URL
	function coverUrl(item: any): string | null {
		const cover = item?.cover;
		if (!cover) return null;

		const rel = cover.formats?.small?.url ?? cover.formats?.thumbnail?.url ?? cover.url ?? null;

		if (!rel) return null;
		if (rel.startsWith('http://') || rel.startsWith('https://')) return rel;

		return `${je_cms_base_url}${rel.startsWith('/') ? '' : '/'}${rel}`;
	}

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

	// Helper to get label and class for event state
	function stateLabel(state?: string | null): {
		label: string;
		class: string;
		icon: 'meet' | 'recommend' | 'cancelled' | 'info';
	} {
		const base = 'inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border';
		switch (state) {
			case 'confirmed':
				return {
					label: 'Hier kannst du mich treffen',
					icon: 'meet',
					class: `${base} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900/60`
				};
			case 'tentative':
				return {
					label: 'Terminempfehlung',
					icon: 'recommend',
					class: `${base} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/35 dark:text-amber-200 dark:border-amber-900/60`
				};
			case 'cancelled':
				return {
					label: 'Abgesagt',
					icon: 'cancelled',
					class: `${base} bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/35 dark:text-rose-200 dark:border-rose-900/60`
				};
			default:
				return {
					label: state ?? 'Status offen',
					icon: 'info',
					class: `${base} bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/40 dark:text-zinc-300 dark:border-zinc-800`
				};
		}
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
					class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70"
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
						(a, b) =>
							new Date(b.createdAt ?? 0).getTime() -
							new Date(a.createdAt ?? 0).getTime()
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
								{FormatDate(latestPost.publishedAt ?? latestPost.createdAt, 'date')}
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
		{#await events}
			<CalendarListSkeleton items={8} />
		{:then eventsLoaded}
			<section class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium">Nächste Termine</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Öffentliche Einträge</div>
					</div>
				</div>

				<div class="mt-5 space-y-3">
					{#each eventsLoaded as event (event.id)}
						{@const eventState = stateLabel(event.state)}
						{@const today = isTodayEvent(event.start, event.end)}
						{@const live = isLiveNow(event.start, event.end)}
						<a
							href={'/calendar/' + event.documentId}
							class={`block rounded-xl border transition overflow-hidden
								${
									live
										? 'border-accent/50 ring-2 ring-accent/30 bg-accent/5 dark:bg-accent/10'
										: today
											? 'border-accent/30 bg-accent/0 dark:bg-accent/5'
											: 'border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
								}`}
						>
							<div class="flex items-center gap-4 p-4">
								<div
									class="hidden sm:grid rounded-2xl w-16 h-16 border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900/30 place-items-center px-2"
								>
									<div class="text-center leading-none">
										<div class="text-lg font-semibold">
											{FormatDate(event.start, 'day')}
										</div>
										<div class="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400">
											{FormatDate(event.start, 'monthshort')}
										</div>
									</div>
								</div>

								{#if coverUrl(event)}
									<div>
										<Image
											src={coverUrl(event)!}
											alt={event.cover?.alternativeText ?? event.subject}
											classNames="h-16 w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
											loading="lazy"
											copyright={event.copyright?.enabled
												? [
														{
															enabled: event.copyright?.enabled,
															name: event.copyright?.name,
															url: event.copyright?.url || '',
															compact: true
														}
													]
												: []}
										/>
									</div>
								{/if}

								<div class="min-w-0 flex-1">
									<!-- Label: floated rechts -->
									<span
										class={`${eventState.class} float-right ml-3 mt-0.5`}
										title={eventState.label}
									>
										{#if eventState.icon === 'meet'}
											<svg
												class="h-3.5 w-3.5"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												aria-hidden="true"
											>
												<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
												<circle cx="9" cy="7" r="4" />
												<path d="M19 8v6" />
												<path d="M22 11h-6" />
											</svg>
										{:else if eventState.icon === 'recommend'}
											<svg
												class="h-3.5 w-3.5"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												aria-hidden="true"
											>
												<path
													d="M12 17.3l-6.2 3.3 1.2-6.9L1.8 9l7-1L12 1.7 15.2 8l7 1-5.2 4.7 1.2 6.9z"
												/>
											</svg>
										{:else if eventState.icon === 'cancelled'}
											<svg
												class="h-3.5 w-3.5"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												aria-hidden="true"
											>
												<path d="M18 6L6 18" />
												<path d="M6 6l12 12" />
											</svg>
										{:else}
											<svg
												class="h-3.5 w-3.5"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												aria-hidden="true"
											>
												<circle cx="12" cy="12" r="10" />
												<path d="M12 16v-4" />
												<path d="M12 8h.01" />
											</svg>
										{/if}

										<span class="max-w-20.5 text-balance hyphens-auto wrap-break-word"
											>{eventState.label}</span
										>
										{#if live}
											<span
												class="mr-1 inline-flex items-center gap-1 text-[11px] font-semibold text-accent"
											>
												<span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
												LIVE
											</span>
										{/if}
									</span>
									{#if live}
										<span
											class="float-right ml-2 mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs bg-accent/10 text-accent border border-accent/30"
										>
											<span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
											Jetzt
										</span>
									{/if}

									<!-- Titel fließt links, 2 Zeilen -->
									<div class="font-medium text-balance hyphens-auto wrap-break-word">
										{event.subject}
									</div>

									<!-- Clear float, damit Meta darunter sauber startet -->
									<div class="clear-both"></div>

									<!-- Datum / Ort -->
									<div
										class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 flex flex-wrap gap-x-3 gap-y-1"
									>
										<span>
											{FormatDate(event.start, 'date')}
											<span class="text-zinc-500 dark:text-zinc-400">
												· {FormatDate(event.start, 'time')}
												{#if event.end}
													{#if sameDay(event.start, event.end)}
														– {FormatDate(event.end, 'time')}
													{:else}
														– {FormatDate(event.end, 'date')} {FormatDate(event.end, 'time')}
													{/if}
												{/if}
											</span>
										</span>

										{#if event.location}
											<span class="text-zinc-500 dark:text-zinc-400 truncate"
												>· {event.location}</span
											>
										{/if}
									</div>

									{#if event.description}
										<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
											{event.description}
										</p>
									{/if}
								</div>
							</div></a
						>
					{/each}
				</div>
			</section>
		{:catch err}
			<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
				<div class="text-sm font-medium">Kalender konnte nicht geladen werden</div>
				<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{String(err)}</div>
			</div>
		{/await}
	</div>

	<!-- Blog Preview -->
	<div class="lg:col-span-6">
		<section class="grid gap-5 sm:grid-cols-2">
			{#await posts}
				<BlogCardSkeleton items={4} />
			{:then ps}
				{#each ps.slice(0, 4) as post (post.id ?? post.documentId)}
					<a
						href={`/blog/${post.documentId}`}
						class="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
						aria-label={`Blogbeitrag öffnen: ${post.title}`}
					>
						{#if coverUrl(post)}
							<div class="relative">
								<Image
									src={coverUrl(post)!}
									alt={post.cover?.alternativeText ?? post.title ?? 'Blogbild'}
									classNames="block w-full aspect-video object-cover"
									loading="lazy"
									copyright={post.copyright?.enabled
										? [
												{
													enabled: post.copyright.enabled,
													name: post.copyright.name,
													url: post.copyright.url || '',
													compact: true,
													size: 'xs'
												}
											]
										: []}
								/>
							</div>
						{/if}

						<div class="p-5">
							<div
								class="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30 fill-accent"
							>
								{#if post.type == 'article'}
									<svg
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										viewBox="0 0 119 119"
										class="mr-1.5 shrink-0 inline h-3.25 w-3.25"
									>
										<path
											fill="inherit"
											d="M97.1,119H21.9C9.8,119,0,109.2,0,97.1V21.9C0,9.8,9.8,0,21.9,0h75.3C109.2,0,119,9.8,119,21.9v75.3 C119,109.2,109.2,119,97.1,119L97.1,119z M21.9,11c-6,0-10.9,4.9-10.9,10.9v75.3c0,6,4.9,10.9,10.9,10.9h75.3 c6,0,10.9-4.9,10.9-10.9V21.9c0-6-4.9-10.9-10.9-10.9H21.9z"
										></path>
										<rect x="26.3" y="26.5" fill="inherit" width="65.7" height="11"></rect>
										<rect x="26.3" y="54" fill="inherit" width="65.7" height="11"></rect>
										<rect x="26.3" y="81" fill="inherit" width="47.7" height="11"></rect>
									</svg>
									Artikel
								{:else if post.type == 'comment'}
									<svg
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										viewBox="0 -960 960 960"
										class="mr-1.5 shrink-0 inline h-4 w-4"
									>
										<path
											fill="inherit"
											d="M880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Z"
										/>
										<rect x="240" y="-480" fill="inherit" width="480" height="70" />
										<rect x="240" y="-590" fill="inherit" width="480" height="70" />
										<rect x="240" y="-720" fill="inherit" width="480" height="70" />
									</svg>
									Kommentar
								{:else}
									<span>Beitrag</span>
								{/if}
							</div>

							<h2 class="mt-3 text-lg font-semibold tracking-tight line-clamp-2">
								{post.title}
							</h2>

							<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
								{post.description}
							</p>

							<div class="mt-4">
								<span
									class="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline"
								>
									Weiterlesen
									<svg
										viewBox="0 0 24 24"
										class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"
									>
										<path d="M5 12h12" />
										<path d="M13 6l6 6-6 6" />
									</svg>
								</span>
							</div>
						</div>
					</a>
				{/each}
			{:catch err}
				<div
					class="sm:col-span-2 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6"
				>
					<div class="text-sm font-medium">Blog konnte nicht geladen werden</div>
					<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{String(err)}</div>
				</div>
			{/await}
		</section>
	</div>
</section>
