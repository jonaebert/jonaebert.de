<script lang="ts">
    import Image from '$lib/components/image.svelte';
    import { FormatDate } from '$lib/util/date';
    import * as ph from "@prismicio/helpers";
	import { text } from '@sveltejs/kit';
    export let items;
</script>

{#if items}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-start">
        {#each items as item}
            <a class="group/teaser-image flex flex-col" href="{item.url}">
                <div class="flex h-full flex-col">
                    <div class="mb-6 flex">
                        <div class="relative inline-block w-full overflow-hidden rounded-sm">
                            {#if item.data.teaser_image[0]}
                                <Image src={ph.asImageSrc(item.data.teaser_image[0].image)} alt={`Teaser Bild ${ph.asText(item.title)}`} classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent" />
                            {:else}
                                <Image src="/contact/teaser.svg" alt={`Teaser Bild ${ph.asText(item.title)}`} classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent" />
                            {/if}
                            {#if item.data.teaser_image[0] != undefined}
								<div class="absolute right-2 bottom-1">
									<div class="bg-grey-50 rounded p-1 text-xs text-black my-1 opacity-50">
										&copy;
										{item.data.teaser_image[0].copyright}
									</div>
								</div>
							{/if}
                            <div class="top-50 absolute bottom-0 h-1/2 w-full"></div>
                        </div>
                    </div>
                    <!-- {#if item.location} -->
                    <div class="mb-1 flex items-center text-xs text-secondary-600 md:text-base hyphens-auto text-pretty font-montserrat">
                        <div class="flex items-center">
                            <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 119 119" class="mr-1.5 shrink-0 inline h-4 w-4 fill-secondary-600">
                                <path fill="inherit" d="M97.1,119H21.9C9.8,119,0,109.2,0,97.1V21.9C0,9.8,9.8,0,21.9,0h75.3C109.2,0,119,9.8,119,21.9v75.3 C119,109.2,109.2,119,97.1,119L97.1,119z M21.9,11c-6,0-10.9,4.9-10.9,10.9v75.3c0,6,4.9,10.9,10.9,10.9h75.3 c6,0,10.9-4.9,10.9-10.9V21.9c0-6-4.9-10.9-10.9-10.9H21.9z"></path>
                                <rect x="26.3" y="26.5" fill="inherit" width="65.7" height="11"></rect>
                                <rect x="26.3" y="54" fill="inherit" width="65.7" height="11"></rect>
                                <rect x="26.3" y="81" fill="inherit" width="47.7" height="11"></rect>
                            </svg>
                            Artikel
                        </div>
                    </div>
                    <!-- {/if} -->
                    <div class="hyphense-auto font-bold text-secondary-900 text-lg md:text-2xl md:leading-[1.3] font-poppins">
                        {ph.asText(item.data.title)}
                    </div>
                    <span class="mt-3 text-xs text-grey-600 md:text-base font-montserrat">
                        {#if item.data.overwrite_publish_date}
                            {FormatDate(ph.asDate(item.data.overwrite_publish_date),'day')}. {FormatDate(ph.asDate(item.data.overwrite_publish_date),'monthshort')} {FormatDate(ph.asDate(item.data.overwrite_publish_date),'year')}
                        {:else}
                            {FormatDate(ph.asDate(item.first_publication_date),'day')}. {FormatDate(ph.asDate(item.first_publication_date),'monthshort')} {FormatDate(ph.asDate(item.first_publication_date),'year')}
                        {/if}
                    </span>
                </div>
            </a>
        {/each}
    </div>
{:else}
    <div class="text-center py-8 font-montserrat">
        Es konnten keine Termine gefunden werden!
    </div>
{/if}