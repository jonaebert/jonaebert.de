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
			return '/home/braunschweig_alte_waage.svg';
		}

		if (cover.ext === '.svg') {
			return je_cms_api_base_url + cover.url;
		} else if (cover.formats?.thumbnail?.url) {
			return je_cms_api_base_url + cover.formats.thumbnail.url;
		}

		// Fallback
		return '/home/braunschweig_alte_waage.svg';
	}
</script>

{#if events}
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-start"
	>
		{#each events as event}
			<a class="group/teaser-image flex flex-col" href="/calendar/{event.id}">
				<div class="flex h-full flex-col">
					<div class={event.now == true ? 'mb-6 flex animate-pulse' : 'mb-6 flex'}>
						<div class="relative inline-block w-full overflow-hidden rounded-sm">
							{#snippet image_blog(src: any, alt: any, cp_name: any, cp_url: any)}
								<Image
									{src}
									{alt}
									classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent"
									copyright={[{ name: cp_name, url: cp_url }]}
								/>
							{/snippet}
							{#if event.teaserImage}
								{#if event.teaserImage.copyright.text}
									{#if event.teaserImage.copyright.text && event.teaserImage.copyright.url}
										{@render image_blog(
											getCoverUrl(event.teaserImage.data),
											event.teaserImage.data.alternativeText,
											event.teaserImage.copyright.text,
											''
										)}
									{:else if event.teaserImage.copyright.text}
										{@render image_blog(
											getCoverUrl(event.teaserImage.data),
											event.teaserImage.data.alternativeText,
											event.teaserImage.copyright.text,
											''
										)}
									{/if}
								{:else}
									{@render image_blog(getCoverUrl(event.teaserImage.data), event.teaserImage.data.alternativeText, '', '')}
								{/if}
							{:else}
								{@render image_blog(getCoverUrl(event.teaserImage.data), `Teaser Bild ${event.summary}`, '', '')}
							{/if}
							<div class="top-50 absolute bottom-0 h-1/2 w-full"></div>
						</div>
					</div>
					{#if event.location}
						<div
							class="mb-1 flex items-center text-xs text-secondary-600 md:text-base hyphens-auto text-pretty font-montserrat"
						>
							<div class="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 -960 960 960"
									class="mr-1.5 shrink-0 inline h-4 w-4 fill-secondary-600"
								>
									<path
										d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
									/>
								</svg>
								{event.location}
							</div>
						</div>
					{/if}
					<div
						class="hyphense-auto font-bold text-secondary-900 text-lg md:text-2xl md:leading-[1.3] font-poppins"
					>
						{#if event.state === 'CANCELLED'}
							<span
								class="bg-red-500 text-white text-xs md:text-sm font-montserrat py-1 px-3 rounded-full font-bold mb-4"
							>
								ABGESAGT<br />
							</span>
						{/if}
						{event.summary}
					</div>
					<span class="mt-3 text-xs text-grey-600 md:text-base font-montserrat">
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
	<div class="text-center py-8 font-montserrat">Es konnten keine Termine gefunden werden!</div>
{/if}
