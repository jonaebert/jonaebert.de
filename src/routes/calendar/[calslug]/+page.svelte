<script lang="ts">
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';
	import { je_api_base_url, name } from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import Image from '$lib/components/image.svelte';

	export let data;

	// Tranform Event date
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
</script>

<svelte:head>
	<title>{event.summary} - {event.startdate} - {name}</title>
	<meta name="robots" content="none" />
	<meta property="og:title" content="{event.summary} - {event.startdate}" />
	{#if event.teaserImage.url && event.teaserImage.url !== null}
		<meta property="og:image" content={event.teaserImage.url} />
	{:else}
		<meta property="og:image" content="/contact/teaser.svg" />
	{/if}
</svelte:head>

<div class="flex min-h-screen items-center justify-center container py-5">
	<div
		class="bg-grey-50 rounded-lg md:rounded-xl overflow-hidden max-w-8xl w-full grid grid-cols-1 md:grid-cols-2"
	>
		<!-- Bildbereich -->
		<div class="relative w-full h-64 md:h-auto">
			{#if event.teaserImage.url && event.teaserImage.url !== null}
				{#if event.teaserImage.copyright?.url != undefined || event.teaserImage.copyright?.text != undefined}
					{#if event.teaserImage.copyright?.url != undefined}
						<Image
							src={event.teaserImage.url}
							alt={`Teaser Bild ${event.summary}`}
							classNames="w-full h-full object-cover"
							copyright={[
								{ name: event.teaserImage.copyright.text, url: event.teaserImage.copyright.url }
							]}
						/>
					{:else}
						<Image
							src={event.teaserImage.url}
							alt={`Teaser Bild ${event.summary}`}
							classNames="w-full h-full object-cover"
							copyright={[{ name: event.teaserImage.copyright.text, url: '' }]}
						/>
					{/if}
				{:else}
				<Image
					src={event.teaserImage.url}
					alt={`Teaser Bild ${event.summary}`}
					classNames="w-full h-full object-cover"
						copyright={[{ name: '', url: '' }]}
				/>
				{/if}
			{:else}
				<Image
					src="/contact/teaser.svg"
					alt={`Teaser Bild ${event.summary}`}
					classNames="w-full h-full object-cover"
				/>
			{/if}
		</div>

		<!-- Textbereich -->
		<div class="flex flex-col justify-center border border-grey-100 py-6 container">
			{#if event.state === 'CANCELLED'}
				<span
					class="self-start inline-block bg-red-500 text-white text-xs md:text-sm font-montserrat py-1 px-3 rounded-full font-bold mb-4"
				>
					ABGESAGT
				</span>
			{/if}
			<h1 class="text-3xl md:text-4xl font-bold text-secondary-900 italic font-poppins">
				{event.summary}
			</h1>

			<div
				class="font-montserrat text-grey-700 text-base md:text-lg leading-relaxed text-pretty mb-6"
			>
				{#if event.description}
					<div>{@html event.description}</div>
				{:else}
					<div>
						Keine Beschreibung gefunden 🫠 <br />
						Lass dich überraschen 🎉
					</div>
				{/if}
			</div>

			<!-- Date -->
			<div class="text-base md:text-lg text-nowrap font-montserrat">
				<div class="flex flex-row justify-start items-center">
					<div class="mr-3">🗓️</div>
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
								{event.starttime} - {event.endtime}
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
								{event.starttime}<br />
								{event.endtime}
							</p>
						{/if}
					</div>
				</div>
			</div>

			{#if event.location}
				<div class="text-base md:text-lg text-nowrap font-montserrat">
					<div class="flex flex-row items-center">
						<div class="mr-3">📍</div>
						<div class="text-balance">{event.location}</div>
					</div>
				</div>
			{:else}
				<div class="text-base md:text-lg text-nowrap font-montserrat">
					<div class="flex flex-row items-center">
						<div class="mr-3">📍</div>
						<div class="text-balance">Aktuell kein Ort verfügbar🙃</div>
					</div>
				</div>
			{/if}

			{#if event.url}
				<div class="flex flex-row items-center flex-nowrap pt-3">
					<button
						class="text-base md:text-lg flex flex-row items-center button-m bg-secondary-600 text-white hover:bg-sun-600 hover:text-secondary-900 w-auto"
						on:click={() => window.open(event.url, '_blank')}
					>
						<div class="flex flex-row items-center">
							<div class="mr-3">🔗</div>
							<div class="text-balance">Zur Veranstaltungsseite</div>
						</div>
					</button>
				</div>
			{/if}
			{#if event.id}
				<div class="flex flex-row items-center flex-nowrap pt-3">
					<button
						class="text-base md:text-lg flex flex-row items-center button-m bg-secondary-600 hover:bg-sun-600 text-white hover:text-secondary-900 w-auto"
						on:click={async () => {
							try {
								const response = await fetch(
									`${je_api_base_url}?type=calendar&itemtype=single&id=${event.id}&download=true`
								);

								if (response.ok) {
									const blob = await response.blob();
									const url = window.URL.createObjectURL(blob);
									const a = document.createElement('a');
									a.style.display = 'none';
									a.href = url;
									a.download = `${event.summary}.ics`;
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
