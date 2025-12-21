<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store';
	import Image from '$lib/components/image.svelte';
	import { FormatDate } from '$lib/util/date';

	export let items: any[] | null | undefined;
	const events = items?.map((event) => {
		return {
			...event,
			start: FormatDate(event.start, ''),
			end: FormatDate(event.end, ''),
			startDay: FormatDate(event.start, 'day'),
			endDay: FormatDate(event.end, 'day'),
			startMonth: FormatDate(event.start, 'month'),
			endMonth: FormatDate(event.end, 'month'),
			startYear: FormatDate(event.start, 'year'),
			endYear: FormatDate(event.end, 'year'),
			startTime: FormatDate(event.start, 'time'),
			endTime: FormatDate(event.end, 'time'),
			startDate: FormatDate(event.start, 'date'),
			endDate: FormatDate(event.end, 'date')
		};
	}) ?? [];

	function getCMSImageURL(image: any): string {
		if (!image) {
			return `${je_cms_api_base_url}/uploads/small_Braunschweig_Alte_Waage_ced5cdd56e.png`;
		}
		if (image.ext === '.svg') return je_cms_api_base_url + image.url;
		if (image.formats?.small?.url) return je_cms_api_base_url + image.formats.small.url;
		return `${je_cms_api_base_url}/uploads/small_Braunschweig_Alte_Waage_ced5cdd56e.png`;
	}

	/* ---------- Bento Layout ---------- */
	type Span = { cols: 2 | 3 | 6; rows: 1 | 2 };

	function buildSpans(count: number): Span[] {
		if (count <= 0) return [];

		const spans: Span[] = [{ cols: 3, rows: 2 }];
		let rest = count - 1;

		if (rest <= 0) return spans;

		// Rechts neben Featured: bevorzugt 3x1 + 3x1
		if (rest === 1) {
			spans.push({ cols: 3, rows: 2 });
			return spans;
		}

		spans.push({ cols: 3, rows: 1 });
		spans.push({ cols: 3, rows: 1 });
		rest -= 2;

		while (rest > 0) {
			if (rest === 1) {
				spans.push({ cols: 6, rows: 2 });
				break;
			}

			const mod = rest % 3;

			if (mod === 0) {
				for (let i = 0; i < Math.min(3, rest); i++) spans.push({ cols: 2, rows: 1 });
				rest -= 3;
			} else {
				for (let i = 0; i < Math.min(2, rest); i++) spans.push({ cols: 3, rows: 1 });
				rest -= 2;
			}
		}

		return spans;
	}

	function reorderFeaturedFirst(list: any[]): any[] {
		if (!list?.length) return [];
		const fi = list.findIndex((x) => x?.featured === true);
		if (fi <= 0) return list;
		return [list[fi], ...list.slice(0, fi), ...list.slice(fi + 1)];
	}

	let orderedItems: any[] | null | undefined;
	let spans: Span[] = [];

	$: orderedItems = events ? reorderFeaturedFirst(events) : events;
	$: spans = orderedItems ? buildSpans(orderedItems.length) : [];

	function spanClass(i: number): string {
		const s = spans[i] ?? { cols: 2, rows: 1 };
		if (i === 0) return 'md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2';

		const lgCols =
			s.cols === 6 ? 'lg:col-span-6' : s.cols === 3 ? 'lg:col-span-3' : 'lg:col-span-2';
		const lgRows = s.rows === 2 ? 'lg:row-span-2' : 'lg:row-span-1';

		return `md:col-span-1 md:row-span-1 ${lgCols} ${lgRows}`;
	}

	function openCopyright(url: string) {
		if (typeof window === 'undefined') return;
		if (!url?.startsWith('https://')) return;
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<!-- Reduced Motion: keine Hover-Animationen -->
<svelte:head>
	<style>
		@media (prefers-reduced-motion: reduce) {
			.transition-all,
			.transition-transform {
				transition: none !important;
			}
			.group:hover .group-hover\:scale-105 {
				transform: none !important;
			}
		}
	</style>
</svelte:head>

{#if (items === undefined || items === null) && events.length === 0}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 animate-pulse">
		{#each Array(8) as _}
			<div class="h-64 rounded-xl bg-gray-200/70 dark:bg-gray-800/70"></div>
		{/each}
	</div>
{:else if orderedItems?.length}
	<div class="grid auto-rows-[1fr] grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
		{#each orderedItems as item, i}
			{@const titleId = `title-${item.documentId}`}
			{@const metaId = `meta-${item.documentId}`}

			<div
				role="article"
				aria-posinset={i + 1}
				aria-setsize={orderedItems.length}
				aria-label={`Event: ${item.subject}`}
				class="group relative overflow-hidden min-h-32 rounded-xl shadow-2xl transition-transform duration-300 hover:-translate-y-1 {spanClass(
					i
				)}"
			>
				<!-- Stretch-Link: ganzer Event klickbar + Fokus sichtbar -->
				<a
					href={`/calendar/${item.documentId}`}
					class="absolute inset-0 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
					aria-labelledby={titleId}
					aria-describedby={metaId}
				>
					<span class="sr-only">Event öffnen</span>
				</a>

				<!-- Image (klick-durchlässig) -->
				<div class="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
					<Image
						src={getCMSImageURL(item.cover)}
						alt={item.cover?.alternativeText || `Titelbild zu ${item.subject}`}
						classNames="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						copyright={[]}
						loading={i === 0 ? 'eager' : 'lazy'}
						decoding="async"
						fetchpriority={i === 0 ? 'high' : 'auto'}
					/>
				</div>

				<!-- Overlay (dekorativ) -->
				<div
					aria-hidden="true"
					class="absolute inset-0 z-10 pointer-events-none bg-black/40"
				></div>
				<!-- Copyright (separat interaktiv) -->
				{#if item.copyright?.enabled}
					<div class="absolute bottom-2 right-2 z-40 pointer-events-auto">
						<button
							type="button"
							class="rounded bg-white/60 px-2 py-1 text-[11px] text-black shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70"
							on:click={() => openCopyright(item.copyright?.url)}
							aria-label={`Urheber: ${item.copyright?.name} – externe Webseite öffnen`}
							title={item.copyright?.url}
						>
							&copy; {item.copyright?.name}
						</button>
					</div>
				{/if}

				<!-- Content: nicht interaktiv, damit Stretch-Link überall greift -->
				<div
					class="relative z-20 flex h-full flex-col justify-end p-5 text-white pointer-events-none"
				>
					<h3
						id={titleId}
						class="font-bold leading-tight {i === 0
							? 'text-2xl md:text-3xl'
							: 'text-lg md:text-xl'}"
					>
						{item.subject}
					</h3>

					{#if item.location}
						<div
							class="mt-1 mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 {i === 0
								? 'text-sm md:text-base text-white/90'
								: 'text-xs md:text-sm text-white/80'}"
						>
							<span class="inline-flex items-center gap-1.5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 -960 960 960"
									class="{i === 0 ? 'h-5 w-5 fill-white/85' : 'h-4 w-4 fill-white/70'} shrink-0"
									aria-hidden="true"
								>
									<path
										d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
									/>
								</svg>

								<span class="leading-snug hyphens-auto text-pretty">
									{item.location}
								</span>
							</span>
						</div>
					{/if}

					<!-- Footer immer links, Copyright immer rechts -->
					<div id={metaId} class="mt-1 flex items-center text-xs text-white/75">
						<span>
							{#if item.datetype === 'date'}
								<div class="flex flex-col items-end">
									<p>
										{item.startDate} - {item.endDate}
									</p>
									<p>Ganztägig</p>
								</div>
							{:else if item.startDate === item.endDate && item.datetype === 'date-time'}
								<div class="flex flex-col items-end">
									<p>
										{item.startDate}
									</p>
									<p>
										{item.startTime} - {item.endTime}
									</p>
								</div>
							{:else}
								<div class="grid grid-cols-[auto,auto,auto] grid-rows-2 gap-x-1 text-right">
									<p class="col-start-1 row-start-1">vom</p>
									<p class="col-start-2 row-start-1">{item.startDate}</p>
									<p class="col-start-3 row-start-1">{item.startTime}</p>
									<p class="col-start-1 row-start-2">bis</p>
									<p class="col-start-2 row-start-2">{item.endDate}</p>
									<p class="col-start-3 row-start-2">{item.endTime}</p>
								</div>
							{/if}
						</span>

						<!-- Mobile: sichtbar | Desktop: nur Hover -->
						<div
							class="transition-all duration-300 md:opacity-0 md:translate-x-2 group-hover:md:opacity-100 group-hover:md:translate-x-0"
						>
							<span class="mx-1">•</span><span class="font-bold text-sun-600"
								>Weiterlesen &rarr;</span
							>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="py-12 text-center text-secondary-600 dark:text-gray-400">
		Es konnten keine Termine gefunden werden!
	</div>
{/if}
