<script lang="ts">
    import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';
    import { apiDomain, name } from '$lib/store';
    import { FormatDate } from '$lib/util/date';
    import Image from "$lib/components/image.svelte";

    export let data;
    const event = data.event[0];
</script>

<svelte:head>
    <title>{event.summary} - {FormatDate(event.start, 'date')} - {name}</title>
    <meta name="robots" content="none">
    <meta property="og:title" content="{event.summary} - {FormatDate(event.start, 'date')}" />
    <!-- <meta property="og:image" content={teaserImage().url} /> -->
</svelte:head>

<div class="bg-gray-100 h-[50vh] container flex flex-col items-center justify-center p-5 min-h-[85vh]">
    <div class="grid grid-cols-2 grid-rows-[auto]">
        <div class="col-start-1 row-start-1 flex flex-col">
            <h1 class="text-3xl xl:text-5xl font-bold text-je-secondary-900 italic mb-6 font-poppins">
                {#if event.state === 'CANCELLED'}
                    [ABGESAGT]
                {/if}
                {event.summary}
            </h1>
        </div>
        <div class="col-start-1 row-start-2 flex flex-col">
            <div class="font-montserrat text-lg text-black grid gap-4">
                {#if event.description}
                    <div class="py-4">
                        {@html event.description}
                    </div>
                {:else}
                    <div class="py-4">
                        Keine Beschreibung gefunden🫠<br>
                        Lass dich überraschen🎉
                    </div>
                {/if}
            </div>
        </div>
        <div class="col-start-2 row-start-1 flex flex-col">
            <div class="relative inline-block w-full overflow-hidden">
                {#if event.teaserImage.url && event.teaserImage.url != null}
                    <Image src={event.teaserImage.url} alt={`Teaser Bild ${event.summary}`} classNames="w-full object-cover aspect-3/2 aspect-[3/2] bg-transparent" />
                {:else}
                    <Image src="/contact/teaser.svg" alt={`Teaser Bild ${event.summary}`} classNames="w-full object-cover aspect-3/2 aspect-[3/2] bg-transparent" />
                {/if}
                <div class="top-50 absolute bottom-0 h-1/2 w-full"></div>
            </div>
        </div>
        <div class="col-start-2 row-start-2 flex flex-col">
            <div class="grid grid-rows[auto,auto,auto,auto] gap-1 md:gap-3">
                {#if event.teaserImage.copyright.url && event.teaserImage.copyright.text}
                    <div class="flex flex-row items-center">
                        <div class="text-lg pr-5">📸</div>
                        <p class="text-lg">
                            {#if event.teaserImage.copyright.text && event.teaserImage.copyright.url}
                                <a href={event.teaserImage.copyright.url} target="_blank">
                                    {event.teaserImage.copyright.text}
                                </a>
                            {:else}
                                {event.teaserImage.copyright.text}
                            {/if}
                        </p>
                    </div>
                {/if}
                <div class="text-lg text-nowrap">
                    <div class="flex flex-row justify-start items-center">
                        <div class="pr-5">🗓️</div>
                        <div>
                            {#if event.datetype === 'date'}
                                <p>{FormatDate(event.start, 'date')} - {FormatDate(event.end, 'date')}</p>
                                <p>Ganztägig</p>
                            {:else if FormatDate(event.start, 'date') === FormatDate(event.end, 'date') && event.datetype === 'date-time'}
                                <p>{FormatDate(event.start, 'datelong')}</p>
                                <p>{FormatDate(event.start, 'time')} - {FormatDate(event.end, 'time')}</p>
                            {:else}
                                <p>{FormatDate(event.start, 'date')} {FormatDate(event.start, 'time')} - {FormatDate(event.end, 'date')} {FormatDate(event.end, 'time')}</p>
                            {/if}    
                        </div>
                    </div>
                </div>
                {#if event.location}
                    <div class="flex flex-row items-center">
                        <div class="text-lg text-nowrap pr-5">
                            📍
                        </div>
                        <a class="text-lg md:text-balance" href="https://www.google.de/maps/place/{event.location}" target="_blank">
                            {event.location}
                        </a>
                    </div>
                {:else}
                    <div class="flex flex-row items-center">
                        <div class="text-lg text-nowrap pr-5">
                            📍
                        </div>
                        <div class="text-lg text-balance">
                            Aktuell kein Ort verfügbar🙃
                        </div>
                    </div>
                {/if}
                {#if event.url}
                    <div class="flex flex-row items-center flex-nowrap">
                        <button
                            class="flex flex-row items-center button-m bg-je-secondary-600 text-white hover:bg-je-sonne hover:text-je-secondary-900 w-auto"
                            on:click={() => window.open(event.url, '_blank')}
                        >
                            <div class="text-lg md:text-nowrap text-left">
                                🔗 Zur Veranstaltungsseite
                            </div>
                        </button>
                    </div>
                {/if}
                {#if event.id}
                    <div class="flex flex-row items-center flex-nowrap">
                        <button
                            class="flex flex-row items-center button-m bg-je-secondary-600 hover:bg-je-sonne text-white hover:text-je-secondary-900 w-auto"
                            on:click={async () => {
                                try {
                                    const response = await fetch(`https://${apiDomain}/api?type=calendar&itemtype=single&id=${event.id}&download=true`);

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
                            <div class="text-lg md:text-nowrap text-left">
                                📅 Zum Kalender hinzufügen
                            </div>
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>