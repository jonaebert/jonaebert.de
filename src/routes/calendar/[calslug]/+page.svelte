<script lang="ts">
	import {
		name,
		je_cms_base_url,
		je_api_base_url,
		pronouns,
		uri,
		img_alte_waage
	} from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import Image from '$lib/components/ui/Image.svelte';
	import { Icon, type IconName } from '$lib/components/icons';
	import { goto } from '$app/navigation';
	import DOMPurify from 'isomorphic-dompurify';
	import BubbleBackground from '$lib/components/ui/BubbleBackground.svelte';

	export let data;
	let { event, previousEvent, nextEvent } = data;
	$: sanitizedDescription = DOMPurify.sanitize(String(event?.description ?? ''));

	/* -----------------------------
	   Event Daten aufbereiten
	----------------------------- */
	let badge: any;

	$: {
		const rawEvent = data.event;
		previousEvent = data.previousEvent;
		nextEvent = data.nextEvent;

		event = {
			...rawEvent,
			start: FormatDate(rawEvent.start, ''),
			end: FormatDate(rawEvent.end, ''),
			startDate: FormatDate(rawEvent.start, 'date'),
			endDate: FormatDate(rawEvent.end, 'date'),
			startTime: FormatDate(rawEvent.start, 'time'),
			endTime: FormatDate(rawEvent.end, 'time'),
			startYear: FormatDate(rawEvent.start, 'year')
		};

		badge = stateBadge(event.state);
	}

	/* -----------------------------
	   Cover Bild
	----------------------------- */
	function getCoverUrl(cover: any, highresolution: boolean): string {
		if (!cover) return img_alte_waage;

		if (cover.ext === '.svg') return je_cms_base_url + cover.url;

		if (cover.formats?.thumbnail?.url) {
			if (highresolution && cover.formats?.large?.url) {
				return je_cms_base_url + cover.formats.large.url;
			}
			return je_cms_base_url + cover.formats.thumbnail.url;
		}

		return img_alte_waage;
	}

	/* -----------------------------
	   Status Badge
	----------------------------- */
	function stateBadge(state?: string | null): {
		label: string;
		class: string;
		iconName?: IconName;
	} {
		const base =
			'inline-flex max-w-full items-center gap-1.5 text-xs px-2 py-1 rounded-full border';

		switch (state) {
			case 'confirmed':
				return {
					label: 'Hier kannst du mich treffen',
					iconName: 'meet',
					class: `${base} bg-emerald-50 text-emerald-700 border-emerald-200
					        dark:bg-emerald-950/35 dark:text-emerald-200 dark:border-emerald-900/60`
				};
			case 'tentative':
				return {
					label: 'Terminempfehlung',
					iconName: 'star',
					class: `${base} bg-amber-50 text-amber-700 border-amber-200
					        dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900/60`
				};
			case 'cancelled':
				return {
					label: 'Abgesagt',
					iconName: 'x',
					class: `${base} bg-rose-50 text-rose-700 border-rose-200
					        dark:bg-rose-950/30 dark:text-rose-200 dark:border-rose-900/60`
				};
			default:
				return {
					label: state ?? 'Status offen',
					iconName: 'info',
					class: `${base} bg-zinc-50 text-zinc-700 border-zinc-200
					        dark:bg-zinc-900/40 dark:text-zinc-300 dark:border-zinc-800`
				};
		}
	}

	/* -----------------------------
	   ICS Download
	----------------------------- */
	async function downloadICS() {
		const response = await fetch(`${je_api_base_url}/calendar/event/${event.documentId}/ics`);
		if (!response.ok) return;

		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `${event.subject}_${event.startYear}.ics`;
		a.click();

		window.URL.revokeObjectURL(url);
	}

	/* -----------------------------
	   Go back (if possible, otherwise to homepage)
	----------------------------- */
	function goBack() {
		if (history.length > 1) {
			history.back();
		} else {
			window.location.href = '/';
		}
	}
</script>

<svelte:head>
	<title>{event.subject} – {name} ({pronouns})</title>
	<link rel="canonical" href={$uri.url.href} />
	<meta property="og:title" content={event.subject} />
	<meta property="og:image" content={getCoverUrl(event.cover, false)} />
</svelte:head>

<section class="container py-10 sm:py-14">
	<div class="max-w-5xl mx-auto space-y-6">
		<!-- HEADER / HERO -->
		<div
			class="relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70"
		>
			{#if event?.cover}
				<div
					class="absolute inset-0 bg-cover bg-center"
					style="background-image: url({getCoverUrl(event.cover, true)});"
				></div>
				<div class="absolute inset-0 bg-zinc-950/45 dark:bg-zinc-950/55" aria-hidden="true"></div>
			{:else}
				<div class="absolute inset-0 bg-emerald-900 dark:bg-emerald-950"></div>
			{/if}

			<BubbleBackground preset="section" />

			<div class="relative z-10 flex min-h-[18rem] flex-col p-6 sm:p-8 gap-6">
				<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
					<button
						type="button"
						on:click={goBack}
						class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15 hover:text-white hover:cursor-pointer"
					>
						<Icon name="arrow-left" classes="h-4 w-4" />
						<span>Zurück</span>
					</button>

					<div class="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
						<span class={badge.class}>
							{#if badge.iconName}
								<Icon name={badge.iconName} classes="h-4 w-4" />
							{/if}
							{badge.label}
						</span>

						<span
							class="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/90 backdrop-blur-sm"
						>
							<Icon name="calendar" classes="h-4 w-4 shrink-0" />
							<span class="min-w-0 wrap-break-word">
								{event.startDate}{#if event.endDate && event.endDate !== event.startDate}
									– {event.endDate}{/if}
							</span>
						</span>

						{#if event.datetype !== 'date'}
							<span
								class="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/90 backdrop-blur-sm"
							>
								<Icon name="clock" classes="h-4 w-4 shrink-0" />
								<span class="min-w-0 wrap-break-word">{event.startTime} – {event.endTime} Uhr</span>
							</span>
						{/if}

						{#if event.location}
							<span
								class="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/90 backdrop-blur-sm"
							>
								<Icon name="pin" classes="h-4 w-4 shrink-0" />
								<span class="min-w-0 wrap-break-word truncate">{event.location}</span>
							</span>
						{/if}
					</div>
				</div>

				<div class="mt-auto max-w-3xl">
					<h1
						class="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white text-balance"
					>
						{event.subject}
					</h1>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div
			class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-6 sm:p-8"
		>
			<div class="grid gap-8 lg:grid-cols-12">
				<div class="lg:col-span-8 space-y-6">
					<!-- Event image -->
					{#if event.cover}
						<div
							class="overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<Image
								src={getCoverUrl(event.cover, true)}
								alt={event.cover.alternativeText}
								classNames="w-full h-auto"
								copyright={event.copyright?.enabled
									? [{ enabled: true, name: event.copyright.name, url: event.copyright.url }]
									: undefined}
							/>
						</div>
					{/if}

					{#if event.description}
						<div class="prose prose-zinc dark:prose-invert max-w-none">
							{@html sanitizedDescription}
						</div>
					{:else}
						<p class="text-zinc-600 dark:text-zinc-400">Keine Beschreibung vorhanden.</p>
					{/if}
				</div>

				<!-- Right column -->
				<div class="lg:col-span-4 space-y-4 lg:sticky lg:top-24 self-start">
					<!-- Actions -->
					<div
						class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900/40 p-4"
					>
						<h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Aktionen</h2>

						<div class="mt-3 grid gap-3">
							{#if event.externalEventURL}
								<button
									class="inline-flex w-full items-center justify-center gap-2 rounded-xl
									       bg-accent px-4 py-2 text-sm font-medium text-white
									       hover:bg-accent-hover hover:cursor-pointer"
									on:click={() => window.open(event.externalEventURL, '_blank')}
								>
									<Icon name="link" classes="h-4 w-4" />
									<span>Zur Veranstaltungsseite</span>
								</button>
							{/if}

							{#if event.documentId}
								<button
									class="inline-flex w-full items-center justify-center gap-2 rounded-xl
									       ring-1 ring-inset ring-accent/40 px-4 py-2
									       text-sm font-medium text-accent
									       hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:cursor-pointer"
									on:click={downloadICS}
								>
									<Icon name="calendar" classes="h-4 w-4" />
									<span>Zum Kalender hinzufügen</span>
								</button>
							{/if}

							{#if !event.externalEventURL && !event.documentId}
								<p class="text-sm text-zinc-600 dark:text-zinc-400">Keine Aktionen verfügbar.</p>
							{/if}
						</div>
					</div>

					<!-- Details -->
					<div
						class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-4"
					>
						<h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Details</h2>

						<dl class="mt-3 space-y-3 text-sm">
							<div
								class="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between"
							>
								<div class="text-zinc-600 dark:text-zinc-400 inline-flex items-center gap-2">
									<Icon name="calendar" classes="h-4 w-4" />
									<span>Datum</span>
								</div>
								<div class="text-right text-zinc-900 dark:text-zinc-100">
									{event.startDate}
									{#if event.endDate && event.endDate !== event.startDate}
										<br />
										<span class="text-zinc-600 dark:text-zinc-400">bis</span>
										{event.endDate}
									{/if}
								</div>
							</div>

							{#if event.datetype !== 'date'}
								<div
									class="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between"
								>
									<div class="text-zinc-600 dark:text-zinc-400 inline-flex items-center gap-2">
										<Icon name="clock" classes="h-4 w-4" />
										<span>Uhrzeit</span>
									</div>
									<div class="text-right text-zinc-900 dark:text-zinc-100">
										{event.startTime} – {event.endTime} Uhr
									</div>
								</div>
							{:else}
								<div
									class="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between"
								>
									<div class="text-zinc-600 dark:text-zinc-400 inline-flex items-center gap-2">
										<Icon name="clock" classes="h-4 w-4" />
										<span>Uhrzeit</span>
									</div>
									<div class="text-right text-zinc-900 dark:text-zinc-100">Ganztägig</div>
								</div>
							{/if}

							{#if event.location}
								<div
									class="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between"
								>
									<div class="text-zinc-600 dark:text-zinc-400 inline-flex items-center gap-2">
										<Icon name="pin" classes="h-4 w-4" />
										<span>Ort</span>
									</div>
									<div class="text-right text-zinc-900 dark:text-zinc-100">
										{event.location}
									</div>
								</div>
							{/if}
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if previousEvent || nextEvent}
		<div class="grid gap-4 pt-6 sm:pt-8 sm:grid-cols-2">
			{#if previousEvent}
				<a
					href={`/calendar/${previousEvent.documentId}`}
					on:click|preventDefault={() => goto(`/calendar/${previousEvent.documentId}`)}
					class="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70
				       bg-white dark:bg-zinc-950 p-4 sm:p-5
				       hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition
				       min-w-0"
				>
					<div class="grid min-w-0 grid-cols-[auto_auto_1fr] items-center gap-3">
						<Icon
							name="arrow-left"
							classes="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400
						         group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition"
						/>

						<Image
							src={getCoverUrl(previousEvent.cover, false)!}
							alt={previousEvent.cover?.alternativeText ?? previousEvent.subject}
							classNames="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
							loading="lazy"
							copyright={previousEvent.copyright?.enabled
								? [
										{
											enabled: previousEvent.copyright?.enabled,
											name: previousEvent.copyright?.name,
											url: previousEvent.copyright?.url || '',
											compact: true
										}
									]
								: []}
						/>

						<div class="min-w-0">
							<div class="text-xs text-zinc-500 dark:text-zinc-400">Vorheriger Termin</div>

							<div
								class="mt-1 font-semibold text-zinc-900 dark:text-zinc-100
							       group-hover:underline
							       min-w-0 wrap-break-word line-clamp-2"
							>
								{previousEvent.subject}
							</div>

							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
								{FormatDate(previousEvent.start, 'date')}
							</div>
						</div>
					</div>
				</a>
			{:else}
				<div class="hidden sm:block" aria-hidden="true"></div>
			{/if}

			{#if nextEvent}
				<a
					href={`/calendar/${nextEvent.documentId}`}
					on:click|preventDefault={() => goto(`/calendar/${nextEvent.documentId}`)}
					class="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70
				       bg-white dark:bg-zinc-950 p-4 sm:p-5
				       hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition
				       min-w-0"
				>
					<div class="grid min-w-0 grid-cols-[auto_auto_1fr_auto] items-center gap-3">
						<Image
							src={getCoverUrl(nextEvent.cover, false)!}
							alt={nextEvent.cover?.alternativeText ?? nextEvent.subject}
							classNames="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
							loading="lazy"
							copyright={nextEvent.copyright?.enabled
								? [
										{
											enabled: nextEvent.copyright?.enabled,
											name: nextEvent.copyright?.name,
											url: nextEvent.copyright?.url || '',
											compact: true
										}
									]
								: []}
						/>

						<div class="min-w-0">
							<div class="text-xs text-zinc-500 dark:text-zinc-400">Nächster Termin</div>

							<div
								class="mt-1 font-semibold text-zinc-900 dark:text-zinc-100
							       group-hover:underline
							       min-w-0 wrap-break-word line-clamp-2"
							>
								{nextEvent.subject}
							</div>

							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
								{FormatDate(nextEvent.start, 'date')}
							</div>
						</div>

						<Icon
							name="arrow-right"
							classes="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400
						         group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition"
						/>
					</div>
				</a>
			{/if}
		</div>
	{/if}
</section>
