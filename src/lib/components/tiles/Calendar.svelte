<script lang="ts">
    import Image from '$lib/components/image.svelte';
    import { FormatDate } from '$lib/util/date';
	import Tags from '$lib/components/blocks/Tags.svelte';
    export let items;

    const events = items.map(event => {
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
            enddate: FormatDate(event.end, 'date'),
        };
    });
</script>

{#if events}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-start">
        {#each events as event}
            <a class="group/teaser-image flex flex-col" href="/calendar/{event.id}">
                <div class="flex h-full flex-col">
                    <div class="mb-6 flex">
                        <div class="relative inline-block w-full overflow-hidden">
                            {#if event.teaserImage.url && event.teaserImage.url != null}
                                <Image src={event.teaserImage.url} alt={`Teaser Bild ${event.summary}`} classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent" />
                            {:else}
                                <Image src="/contact/teaser.svg" alt={`Teaser Bild ${event.summary}`} classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent" />
                            {/if}
                            <div class="top-50 absolute bottom-0 h-1/2 w-full"></div>
                        </div>
                    </div>
                    {#if event.location}
                        <div class="mb-1 flex items-center text-xs text-je-secondary-600 md:text-base hyphens-auto text-pretty font-montserrat">
                            <div class="flex items-center">
                                {event.location}
                            </div>
                        </div>
                    {/if}
                    <div class="hyphense-auto font-bold text-je-secondary-900 text-lg md:text-2xl md:leading-[1.3] font-poppins">
                        {#if event.state === 'CANCELLED'}
                                [ABGESAGT]<br>
                        {/if}
                        {event.summary}
                    </div>
                    <span class="mt-3 text-xs text-gray-600 md:text-base font-montserrat">
                        <div class="flex flex-row items-end gap-6">
                            {#if event.datetype === 'date'}
                                <p>
                                    {event.startdate} - {event.enddate}
                                </p>
                                <p>
                                    Ganztägig
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
                                    vom<br>
                                    bis
                                </p>
                                <p>
                                    {event.startdate}<br>
                                    {event.enddate}
                                </p>
                                <p>
                                    {event.starttime}<br>
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
    <div class="text-center py-8 font-montserrat">
        Es konnten keine Termine gefunden werden!
    </div>
{/if}