<script lang="ts">
	import { je_cms_base_url, name, pronouns } from '$lib/store';
	import SocialIcons from '$lib/components/blocks/SocialIcons.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import Slogan from '$lib/components/blocks/Slogan.svelte';
	import { FormatDate } from '$lib/util/date.js';

	export let data;
	const { posts, events } = data;

	const props = data?.cv;
	const headings = props?.headings;
	const items = props?.items;
	const now = new Date();
	const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

	function fmtMonthYear(ym?: string | null) {
		if (!ym) return '';
		const [y, m] = ym.split('-').map(Number);
		const d = new Date(y, (m ?? 1) - 1, 1);
		return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
	}

	function valDate(start?: string | null, end?: string | null) {
		const s = start?.trim() ? start : null;
		const e = end?.trim() ? end : null;

		let label = '—';
		let active = false;

		if (s && e) {
			label = `${fmtMonthYear(s)} – ${fmtMonthYear(e)}`;
		} else if (s && !e) {
			active = s <= nowYM;
			label = `${active ? 'seit' : 'ab'} ${fmtMonthYear(s)}`;
		}

		return { label, active };
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

	// Helper function for label/tags
	function chipClasses(variant: 'neutral' | 'accent' = 'neutral') {
		return variant === 'accent'
			? 'inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/30'
			: 'inline-flex items-center text-xs px-2.5 py-1 rounded-full border border-zinc-200/70 dark:border-zinc-800/70 text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-950/20';
	}
</script>

<section class="grid grid-cols-1 gap-5 lg:grid-cols-12">
	<!-- HERO -->
	<div
		class="order-1 relative overflow-hidden lg:order-0 lg:col-span-7 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 p-4 sm:p-6 lg:p-8"
	>
		<video
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			poster={`${je_cms_base_url}/uploads/thumbnail_Hero_Video_Teaserimage_704af3dfc7.png`}
			class="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
		>
			<source src="/home/herovideo.mp4" type="video/mp4" />
		</video>

		<div
			class="absolute inset-0 z-1 bg-black/15 dark:bg-linear-to-b dark:from-zinc-950/85 dark:via-zinc-950/55 dark:to-zinc-950/85"
		></div>

		<div class="relative z-10 flex flex-col gap-6">
			<div class="flex items-start justify-between gap-6">
				<div
					class="w-full sm:max-w-2xl rounded-2xl p-4 sm:p-5 bg-white/55 backdrop-blur-md border border-white/40 shadow-sm dark:bg-transparent dark:backdrop-blur-0 dark:border-transparent dark:shadow-none"
				>
					<div
						class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<span class="h-2 w-2 rounded-full bg-accent"></span>
						<span class="text-zinc-600 dark:text-zinc-400"><Slogan /></span>
					</div>

					<h1
						class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
					>
						<span class="text-accent font-bold">{name}</span>
						<span class="text-zinc-700 dark:text-zinc-300">({pronouns})</span>
					</h1>

					<h2
						class="mt-4 text-zinc-900 dark:text-zinc-200 text-xl sm:text-2xl font-medium tracking-tight"
					>
						Politik für Klima, Umwelt und Mobilität
					</h2>

					<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 leading-relaxed">
						Ich setze mich für eine Stadt ein, die dem Klimawandel entschlossen begegnet und
						Lebensqualität für alle sichert. Klimaschutz, der Schutz unserer Umwelt und eine
						nachhaltige Mobilität gehören für mich untrennbar zusammen.
					</p>

					<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 leading-relaxed">
						In Braunschweig heißt das: weniger Emissionen, mehr Raum für Menschen und eine
						Verkehrspolitik, die fair, sicher und zukunftsfähig ist.
					</p>

					<div class="mt-5 grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
						<a
							href="/contact"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition"
						>
							Kontakt
						</a>
					</div>

					<div class="mt-6 w-fit">
						<SocialIcons />
					</div>
				</div>
			</div>

			<div class="grid gap-3 grid-cols-1 sm:grid-cols-3">
				<div
					class="w-full sm:max-w-2xl rounded-2xl p-4 sm:p-5 bg-white/55 backdrop-blur-md border border-white/40 shadow-sm dark:bg-transparent dark:backdrop-blur-0 dark:border-transparent dark:shadow-none"
				>
					<div class="text-xs text-zinc-500 dark:text-zinc-400">Fokus</div>
					<div class="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
						Klima · Umwelt · Mobilität
					</div>
				</div>
				<div
					class="w-full sm:max-w-2xl rounded-2xl p-4 sm:p-5 bg-white/55 backdrop-blur-md border border-white/40 shadow-sm dark:bg-transparent dark:backdrop-blur-0 dark:border-transparent dark:shadow-none"
				>
					<div class="text-xs text-zinc-500 dark:text-zinc-400">Ebene</div>
					<div class="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
						Braunschweig · Kommune
					</div>
				</div>
				<div
					class="w-full sm:max-w-2xl rounded-2xl p-4 sm:p-5 bg-white/55 backdrop-blur-md border border-white/40 shadow-sm dark:bg-transparent dark:backdrop-blur-0 dark:border-transparent dark:shadow-none"
				>
					<div class="text-xs text-zinc-500 dark:text-zinc-400">Ansatz</div>
					<div class="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
						fair · sicher · zukunftsfähig
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- RIGHT COLUMN: STATUS + QUICK LINKS -->
	<div class="order-2 lg:order-0 lg:col-span-5 grid gap-5">
		<!-- Status -->
		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 sm:p-6">
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
									Öffnen
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

		<!-- Portrait -->
		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 sm:p-6">
			<div class="aspect-square overflow-hidden rounded-xl">
				<Image
					src="https://cms.jonaebert.de/uploads/Portrait_1000x1000_Cutout_7b47e25bf6.png"
					alt="Portrait von {name}"
					classNames="h-full w-full object-cover"
				/>
			</div>
		</div>
	</div>
</section>

<!-- CV -->
{#if headings && items}
	<section
		class="mt-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-4 sm:p-6 lg:p-8"
	>
		<header class="max-w-3xl">
			<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
				{headings.main}
			</h2>
			<p class="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
				Stationen & Kompetenzen — scannbar, ruhig, CI/CD-konform.
			</p>
		</header>

		<div class="mt-6 sm:mt-8 grid gap-10 sm:gap-12">
			{#each headings.sections as section}
				<section id={`cv-${section.key}`} class="scroll-mt-24">
					<div>
						<h3 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
							{section.title}
						</h3>

						{#if section.key !== 'skills'}
							{@const list = items[section.key] ?? []}

							<ul class="relative mt-6 space-y-6" style="--timeline-gap: 1.5rem;">
								{#each list as item, i}
									{@const vd = valDate(item?.start, item?.end)}
									{@const isLast = i === list.length - 1}

									<li class="relative">
										<div class="grid grid-cols-1 sm:grid-cols-[2.5rem_1fr] gap-3 sm:gap-4">
											<div class="relative min-h-12 sm:min-h-0">
												{#if !isLast}
													<div
														class="absolute left-4 sm:left-5 w-px bg-zinc-200 dark:bg-zinc-800"
														style="top: calc(0.25rem + 18px); height: calc(100% + var(--timeline-gap));"
													></div>
												{/if}
												<div
													class="absolute left-4 top-1 sm:left-5 sm:top-2 -translate-x-1/2 rounded-full bg-white dark:bg-zinc-950 ring-4 sm:ring-6 ring-white dark:ring-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm hover:scale-110 ease-in-out transition-transform duration-300"
												>
													<div
														class="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 grid place-items-center overflow-hidden"
													>
														<a
															href={item.link}
															target="_blank"
															rel="noreferrer"
															class="grid place-items-center h-full w-full"
														>
															<Image
																classNames="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
																src={`/about_logos/${item.image}`}
																alt={`Logo von ${item.company}`}
															/>
														</a>
													</div>
												</div>
											</div>

											<!-- Card column -->
											<div
												class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/35 backdrop-blur-sm p-4 sm:p-5"
											>
												<div
													class="flex flex-col sm:flex-row sm:flex-wrap items-start sm:justify-between gap-3"
												>
													<div class="min-w-0">
														<div class="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
															{item.title}
														</div>
														<div class="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
															<a
																href={item.link}
																target="_blank"
																rel="noreferrer"
																class="hover:underline"
															>
																{item.company}
															</a>
														</div>
													</div>

													<div class="flex flex-wrap items-center gap-2 sm:justify-end">
														{#if vd.active}
															<span class={chipClasses('accent')}>
																<span class="h-2 w-2 rounded-full bg-accent"></span>
																Aktuell
															</span>
														{/if}
														<span class={chipClasses('neutral')}>{vd.label}</span>
													</div>
												</div>

												{#if item.description}
													<ul
														class="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1"
													>
														{#each item.description as desc}
															<li>{desc}</li>
														{/each}
													</ul>
												{/if}
											</div>
										</div>
									</li>
								{/each}
							</ul>
						{:else}
							<!-- Skills (modern cards) -->
							<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
								{#each items[section.key] as item}
									<div
										class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/35 backdrop-blur-sm p-4 sm:p-5 w-fit max-w-52 sm:max-w-none mx-auto sm:mx-0 ml-6 sm:ml-0"
									>
										<div class="flex items-start justify-between gap-3">
											<div>
												<div class="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
													{item.category}
												</div>
												<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
													Schwerpunkte, Tools & Sprachen
												</div>
											</div>
											<span class={chipClasses('neutral')}>Kompetenzen</span>
										</div>

										{#if item.subcategories}
											<div class="mt-5 grid gap-5">
												{#each item.subcategories as subcategory}
													<div
														class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-950/35 p-4"
													>
														<div class="text-sm font-medium text-zinc-800 dark:text-zinc-200">
															{subcategory.title}
														</div>
														<div class="mt-3 flex flex-wrap gap-2">
															{#each subcategory.skills as skill}
																<span class={chipClasses('neutral')}>{skill}</span>
															{/each}
														</div>
													</div>
												{/each}
											</div>
										{:else}
											<div class="mt-5 flex flex-wrap gap-2">
												{#each item.skills as skill}
													<span class={chipClasses('neutral')}>{skill}</span>
												{/each}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</section>
			{/each}
		</div>
	</section>
{/if}
