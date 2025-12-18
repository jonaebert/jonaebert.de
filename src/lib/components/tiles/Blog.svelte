<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store';
	import Image from '$lib/components/image.svelte';
	import { FormatDate } from '$lib/util/date';

	export let items: any[] | null | undefined;

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

	$: orderedItems = items ? reorderFeaturedFirst(items) : items;
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

{#if items === undefined || items === null}
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
				aria-label={`Artikel: ${item.title}`}
				class="group relative overflow-hidden min-h-32 rounded-xl shadow-2xl transition-transform duration-300 hover:-translate-y-1 {spanClass(
					i
				)}"
			>
				<!-- Stretch-Link: ganzer Artikel klickbar + Fokus sichtbar -->
				<a
					href={`/blog/${item.documentId}`}
					class="absolute inset-0 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60"
					aria-labelledby={titleId}
					aria-describedby={metaId}
				>
					<span class="sr-only">Artikel öffnen</span>
				</a>

				<!-- Image (klick-durchlässig) -->
				<div class="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
					<Image
						src={getCMSImageURL(item.cover)}
						alt={item.cover?.alternativeText || `Titelbild zu ${item.title}`}
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
					class="absolute inset-0 z-10 pointer-events-none bg-linear-to-t from-black/75 via-black/35 to-transparent"
				></div>

				<!-- Copyright (separat interaktiv) -->
				{#if item.copyright?.[0]?.enabled}
					<div class="absolute bottom-2 right-2 z-40 pointer-events-auto">
						<button
							type="button"
							class="rounded bg-white/60 px-2 py-1 text-[11px] text-black shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70"
							on:click={() => openCopyright(item.copyright?.[0]?.url)}
							aria-label={`Urheber: ${item.copyright?.[0]?.name} – externe Webseite öffnen`}
							title={item.copyright?.[0]?.url}
						>
							&copy; {item.copyright?.[0]?.name}
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
						{item.title}
					</h3>

					<!-- Typ-Icon + Bezeichnung -->
					<div class="flex items-center fill-white/90">
						{#if item.type == 'article'}
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								viewBox="0 0 119 119"
								class="mr-1.5 shrink-0 inline h-4 w-4"
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
						{:else if item.type == 'comment'}
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								viewBox="0 -960 960 960"
								class="mr-1.5 shrink-0 inline h-5.5 w-5.5"
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
						{/if}
					</div>

					<!-- Footer immer links, Copyright immer rechts -->
					<div id={metaId} class="mt-3 flex items-center text-xs opacity-80">
						<span>
							{FormatDate(item.createdAt, 'day')}. {FormatDate(item.createdAt, 'monthshort')}
							{FormatDate(item.createdAt, 'year')}
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
		Es konnten keine Artikel gefunden werden!
	</div>
{/if}
