<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store';
	import Image from '$lib/components/image.svelte';
	import { FormatDate } from '$lib/util/date';
	export let items;

	function getCMSImageURL(image: any): string {
		if (!image) {
			return '/home/braunschweig_alte_waage.svg';
		}

		if (image.ext === '.svg') {
			return je_cms_api_base_url + image.url;
		} else if (image.formats?.small?.url) {
			return je_cms_api_base_url + image.formats.small.url;
		}

		// Fallback
		return '/home/braunschweig_alte_waage.svg';
	}
</script>

{#if items}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-start">
		{#each items as item}
			<a class="group/teaser-image flex flex-col" href={`/blog/${item.documentId}`}>
				<div class="flex h-full flex-col">
					<div class="mb-6 flex">
						<div class="relative inline-block w-full overflow-hidden rounded-sm aspect-3/2">
							{#snippet image_blog(src: any, alt: any, cp_name: any, cp_url: any)}
								<Image
									{src}
									{alt}
									classNames="w-1500 object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 bg-transparent"
									copyright={[{ name: cp_name, url: '' }]}
								/>
							{/snippet}
							{#if item.cover}
								{#if item.copyright[0].enabled == true}
									{#if item.copyright[0].name && item.copyright[0].url}
										{@render image_blog(
											getCMSImageURL(item.cover),
											item.cover.alternativeText,
											item.copyright[0].name,
											item.copyright[0].url
										)}
									{:else if item.copyright[0].name}
										{@render image_blog(
											getCMSImageURL(item.cover),
											item.cover.alternativeText,
											item.copyright[0].name,
											''
										)}
									{/if}
								{:else}
									{@render image_blog(getCMSImageURL(item.cover), item.cover.alternativeText, '', '')}
								{/if}
							{:else}
								{@render image_blog(getCMSImageURL(item.cover), `Teaser Bild ${item.title}`, '', '')}
							{/if}
						</div>
					</div>
					<div class="flex flex-row justify-between mb-1 text-xs md:text-base text-secondary-600 dark:text-grey-300">
						<div class="flex items-center hyphens-auto text-pretty">
							<div class="flex items-center fill-secondary-600 dark:fill-grey-300">
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
						</div>
						<div class="flex items-center whitespace-nowrap">
							{#if item.author && item.author?.name}
								<div class="flex items-center w-full">
									<Image
										src={getCMSImageURL(item.author.avatar)}
										alt={item.author.name}
										classNames="h-7 w-auto rounded-full mr-1.5 items-center object-cover"
									/>
								</div>
								<div>
									<div class="flex items-center">{item.author.name}</div>
								</div>
							{/if}
						</div>
					</div>
					<div class="hyphens-auto font-bold text-secondary-900 dark:text-grey-400 text-lg md:text-2xl md:leading-[1.3]">
						{item.title}
					</div>
					<span class="mt-3 text-xs text-grey-600 dark:text-grey-400 md:text-base">
						{FormatDate(item.createdAt, 'day')}. {FormatDate(item.createdAt, 'monthshort')}
						{FormatDate(item.createdAt, 'year')}
					</span>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<div class="text-center py-8">Es konnten keine Artikel gefunden werden!</div>
{/if}
