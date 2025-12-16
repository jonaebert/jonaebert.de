<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store.js';
	import Image from '$lib/components/image.svelte';
	import { FormatDate } from '$lib/util/date';
	import Tags from '$lib/components/blocks/Tags.svelte';
	export let items;

	const events = items.map((event) => {
		return {
			...event,
			start: FormatDate(event.start, ''),
			end: FormatDate(event.end, ''),
			startday: FormatDate(event.start, 'day'),
			endday: FormatDate(event.end, 'day'),
			startmonth: FormatDate(event.start, 'month'),
			endmonth: FormatDate(event.end, 'month'),
			startyear: FormatDate(event.start, 'year'),
			endyear: FormatDate(event.end, 'year'),
			starttime: FormatDate(event.start, 'time'),
			endtime: FormatDate(event.end, 'time'),
			startdate: FormatDate(event.start, 'date'),
			enddate: FormatDate(event.end, 'date')
		};
	});
	
	function getCoverUrl(cover: any): string {
		if (!cover) {
			return `${je_cms_api_base_url}/uploads/small_Braunschweig_Alte_Waage_ced5cdd56e.png`;
		}

		if (cover.ext === '.svg') {
			return je_cms_api_base_url + cover.url;
		} else if (cover.formats?.small?.url) {
			return je_cms_api_base_url + cover.formats.small.url;
		}

		// Fallback
		return `${je_cms_api_base_url}/uploads/small_Braunschweig_Alte_Waage_ced5cdd56e.png`;
	}
</script>

{#if events}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-start">
		{#each events as event}
			<a class="group/teaser-image flex flex-col" href="/calendar/{event.documentId}">
				<div class="flex h-full flex-col">
					<div class={event?.now == true ? 'mb-6 flex animate-pulse' : 'mb-6 flex'}>
						<div class="relative inline-block w-full overflow-hidden rounded-sm aspect-3/2 shadow-2xl">
							{#snippet image_blog(src: any, alt: any, cp_name: any, cp_url: any)}
								<Image
									{src}
									{alt}
									classNames="w-1500 object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 bg-transparent"
									copyright={[{ name: cp_name, url: cp_url }]}
								/>
							{/snippet}
							{#if event.cover}
								{#if event.copyright.enabled}
									{#if event.copyright.name && event.copyright.url}
										{@render image_blog(
											getCoverUrl(event.cover),
											event.cover.alternativeText || '',
											event.copyright.name,
											''
										)}
									{:else if event.copyright.name}
										{@render image_blog(
											getCoverUrl(event.cover),
											event.cover.alternativeText || '',
											event.copyright.name,
											''
										)}
									{/if}
								{:else}
									{@render image_blog(getCoverUrl(event.cover), event.cover.alternativeText || '', '', '')}
								{/if}
							{:else}
								{@render image_blog(getCoverUrl(event.cover), `Teaser Bild ${event.summary}`, '', '')}
							{/if}
							<div class="top-50 absolute bottom-0 h-1/2 w-full"></div>
						</div>
					</div>
					{#if event.location}
						<div
							class="mb-1 flex items-center text-xs text-secondary-600 dark:text-gray-300 md:text-base hyphens-auto text-pretty"
						>
							<div class="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 -960 960 960"
									class="mr-1.5 shrink-0 inline h-5 w-5 fill-secondary-600 dark:fill-gray-300"
								>
									<path
										d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
									/>
								</svg>
								{event.location}
							</div>
						</div>
					{/if}
					<div class="hyphense-auto font-bold text-secondary-900 dark:text-gray-400 text-lg md:text-2xl md:leading-[1.3]">
						{#if event.state === 'cancelled'}
							<span class="flex justify-start">
								<Tags text='ABGESAGT' />
							</span>
						{/if}
						{event.subject}
					</div>
					<span class="mt-3 text-xs text-gray-600 dark:text-gray-400 md:text-base">
						<div class="flex flex-row items-end gap-6">
							{#if event.datetype === 'date'}
								<p>
									{event.startdate} - {event.enddate}
								</p>
								<p>Ganztägig</p>
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
					</span>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<div class="text-center py-8">Es konnten keine Termine gefunden werden!</div>
{/if}
