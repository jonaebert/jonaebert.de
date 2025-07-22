<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store';
	import Image from '$lib/components/image.svelte';
	import { FormatDate } from '$lib/util/date';
	import { text } from '@sveltejs/kit';
	export let items;

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

{#if items}
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-start"
	>
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
									copyright={[{ name: cp_name, url: cp_url }]}
								/>
							{/snippet}
							{#if item.cover}
								{#if item.copyright[0].enabled == true}
									{#if item.copyright[0].name && item.copyright[0].url}
										{@render image_blog(
											getCoverUrl(item.cover),
											item.cover.alternativeText,
											item.copyright[0].name,
											item.copyright[0].url
										)}
									{:else if item.copyright[0].name}
										{@render image_blog(
											getCoverUrl(item.cover),
											item.cover.alternativeText,
											item.copyright[0].name,
											''
										)}
									{/if}
								{:else}
									{@render image_blog(getCoverUrl(item.cover), item.cover.alternativeText, '', '')}
								{/if}
							{:else}
								{@render image_blog(getCoverUrl(item.cover), `Teaser Bild ${item.title}`, '', '')}
							{/if}
						</div>
					</div>
					<div
						class="mb-1 flex items-center text-xs text-secondary-600 md:text-base hyphens-auto text-pretty font-montserrat"
					>
						<div class="flex items-center">
							{#if item.type == 'article'}
								<svg
									version="1.1"
									id="Ebene_1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 0 119 119"
									class="mr-1.5 shrink-0 inline h-4 w-4 fill-secondary-600"
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
							{/if}
						</div>
					</div>
					<div
						class="hyphense-auto font-bold text-secondary-900 text-lg md:text-2xl md:leading-[1.3] font-poppins"
					>
						{item.title}
					</div>
					<span class="mt-3 text-xs text-grey-600 md:text-base font-montserrat">
						{FormatDate(item.createdAt, 'day')}. {FormatDate(item.createdAt, 'monthshort')}
						{FormatDate(item.createdAt, 'year')}
					</span>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<div class="text-center py-8 font-montserrat">Es konnten keine Artikel gefunden werden!</div>
{/if}
