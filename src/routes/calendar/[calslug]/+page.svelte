<script lang="ts">
	import {
		name,
		je_cms_api_base_url,
		je_api_base_url,
		pronouns,
		uri,
		img_alte_waage
	} from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import Image from '$lib/components/image.svelte';
	import Renderer from '$lib/components/stripe/Renderer.svelte';

	export let data;
	// Transform Event date
	const rawEvent = data.event[0];
	const event = {
		...rawEvent,
		start: FormatDate(rawEvent.start, ''),
		end: FormatDate(rawEvent.end, ''),
		startday: FormatDate(rawEvent.start, 'day'),
		endday: FormatDate(rawEvent.end, 'day'),
		startmonth: FormatDate(rawEvent.start, 'month'),
		endmonth: FormatDate(rawEvent.end, 'month'),
		startyear: FormatDate(rawEvent.start, 'year'),
		endyear: FormatDate(rawEvent.end, 'year'),
		starttime: FormatDate(rawEvent.start, 'time'),
		endtime: FormatDate(rawEvent.end, 'time'),
		startdate: FormatDate(rawEvent.start, 'date'),
		enddate: FormatDate(rawEvent.end, 'date')
	};

	function getCoverUrl(cover: any, highresolution: boolean): string {
		if (!cover) {
			return img_alte_waage;
		}

		if (cover.ext === '.svg') {
			return je_cms_api_base_url + cover.url;
		} else if (cover.formats?.thumbnail?.url) {
			if (highresolution === true && cover.formats?.large?.url) {
				return je_cms_api_base_url + cover.formats.large.url;
			} else if (cover.formats?.thumbnail?.url) {
				return je_cms_api_base_url + cover.formats.thumbnail.url;
			}
		}

		// Fallback
		return img_alte_waage;
	}
</script>

<svelte:head>
	<title>{event.subject} - {name} ({pronouns})</title>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={$uri.url.href} />
	<meta property="og:title" content={event.subject} />
	<meta property="og:image" content={getCoverUrl(event.cover, false)} />
</svelte:head>

<div class="relative min-h-screen flex flex-col">
	<!-- Hintergrundbild -->
	<div
		class="absolute inset-0 -z-50 bg-cover bg-center bg-no-repeat bg-fixed"
		style="background-image: url({getCoverUrl(event.cover, true)});"
	></div>
	<!-- Schwarzer Overlay -->
	<div class="absolute inset-0 bg-black opacity-55 -z-40"></div>

	<!-- Inhalt: Titel + Content -->
	<div class="container md:pt-30 grow flex flex-col justify-between">
		{#snippet eventDate()}
			<div class="flex flex-row items-end gap-6">
				{#if event.datetype === 'date'}
					<p>
						{event.startdate} - {event.enddate} <br /> Ganztägig
					</p>
				{:else if event.startdate === event.enddate && event.datetype === 'date-time'}
					<p>
						{event.startdate}
					</p>
					<p>
						{event.starttime} - {event.endtime} Uhr
					</p>
				{:else}
					<p>
						vom<br />
						bis
					</p>
					<p>
						{event.startdate}<br />
						{event.enddate}
					</p>
					<p>
						{event.starttime} Uhr<br />
						{event.endtime} Uhr
					</p>
				{/if}
			</div>
		{/snippet}
		<!-- Platzhalter notwendig -->
		<div></div>
		<!-- Titel und Datum -->
		<div class="py-5 flex justify-center text-pretty hyphens-auto md:hyphens-none mt-20 md:mt-0">
			<div class="md:max-w-[60%] grid gap-5">
				<h1
					class="text-5xl md:text-6xl font-extrabold text-neutral-600 dark:text-secondary-200 my-2"
				>
					{#if event.state === 'cancelled'}
						ABGESAGT! <br />
					{/if}
					{event.subject}
				</h1>
				<div class="text-white dark:text-gray-300">
					<div class="flex flex-row justify-start items-center">
						{@render eventDate()}
					</div>
				</div>
			</div>
		</div>

		<!-- Event-Content am unteren Rand -->
		<div
			class="min-w-[60vw] max-w-[95vw] xl:max-w-[60vw] mx-auto pb-6 text-pretty bg-background-light dark:bg-background-dark shadow-lg rounded-t-xl"
		>
			<div class="p-6 relative gap-8 container">
				<div
					class={`max-w-sm mb-8 md:mb-0 relative
						${event.description ? 'float-left md:float-right mr-8 md:ml-8 md:mr-0' : 'mx-auto'}
					`}
				>
					<div class="flex flex-col gap-5">
						<div>
							{#snippet image_event(src: any, alt: any, cp_enabled: any, cp_name: any, cp_url: any)}
								<Image
									{src}
									alt={alt}
									classNames="rounded-lg"
									copyright={[{ enabled: cp_enabled, name: cp_name, url: cp_url }]}
								/>
							{/snippet}
							{#if event.cover}
								{#if event.copyright.enabled == true}
									{#if event.copyright.name && event.copyright.url}
										{@render image_event(
											getCoverUrl(event.cover, true),
											event.cover.alternativeText,
											event.copyright.enabled,
											event.copyright.name,
											event.copyright.url
										)}
									{:else if event.copyright.name}
										{@render image_event(
											getCoverUrl(event.cover, true),
											event.cover.alternativeText,
											event.copyright.enabled,
											event.copyright.name,
											''
										)}
									{/if}
								{:else}
									{@render image_event(
										getCoverUrl(event.cover, true),
										event.cover.alternativeText,
										'',
										'',
										''
									)}
								{/if}
							{:else}
								{@render image_event(img_alte_waage, `Teaser Bild ${event.title}`, '', '', '')}
							{/if}
						</div>
						<!-- Termininformationen-->
						<div class="flex flex-col gap-5 text-gray-700 dark:text-gray-400 text-base md:text-lg">
							<!-- Datum -->
							<div class="text-base md:text-lg text-nowrap">
								<div class="flex flex-row justify-start items-center">
									<div class="mr-3">🗓️</div>
									{@render eventDate()}
								</div>
							</div>
							<!-- Ort -->
							<div class="text-base md:text-lg text-nowrap">
								{#if event.location}
									<div class="flex flex-row items-center">
										<div class="mr-3">📍</div>
										<div class="text-balance">{event.location}</div>
									</div>
								{:else}
									<div class="flex flex-row items-center">
										<div class="mr-3">📍</div>
										<div class="text-balance">Aktuell kein Ort angegeben🙃</div>
									</div>
								{/if}
							</div>
							<!-- Veranstaltungsseite -->
							{#if event.externalEventURL}
								<div class="flex flex-row items-center flex-nowrap">
									<button
										class="text-base md:text-lg flex flex-row items-center button-m bg-secondary-600 text-white hover:bg-sun-600 hover:text-secondary-900 w-auto"
										on:click={() => window.open(event.externalEventURL, '_blank')}
									>
										<div class="flex flex-row items-center">
											<div class="mr-3">🔗</div>
											<div class="text-balance">Zur Veranstaltungsseite</div>
										</div>
									</button>
								</div>
							{/if}
							<!-- ICS Export -->
							{#if event.documentId}
								<div class="flex flex-row items-center flex-nowrap">
									<button
										class="text-base md:text-lg flex flex-row items-center button-m bg-secondary-600 hover:bg-sun-600 text-white hover:text-secondary-900 w-auto"
										on:click={async () => {
											try {
												const response = await fetch(
													`${je_api_base_url}?type=calendar&itemtype=single&eventid=${event.documentId}&download=true`
												);

												if (response.ok) {
													const blob = await response.blob();
													const url = window.URL.createObjectURL(blob);
													const a = document.createElement('a');
													a.style.display = 'none';
													a.href = url;
													a.download = `${event.subject}_${event.startyear}.ics`;
													document.body.appendChild(a);
													a.click();
													window.URL.revokeObjectURL(url);
												} else {
													console.error('Failed to download ICS file');
												}
											} catch (error) {
												console.error('Error:', error);
											}
										}}
									>
										<div class="flex flex-row items-center">
											<div class="mr-3">📅</div>
											<div class="text-balance">Zum Kalender hinzufügen</div>
										</div>
									</button>
								</div>
							{/if}
						</div>
					</div>
				</div>
				{#if event.description}
					<div
						class="text-gray-700 dark:text-gray-400 text-left md:text-right md:text-lg leading-relaxed text-pretty"
					>
						{@html event.description}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
