<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store.js'
	import Image from '$lib/components/image.svelte';
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';

	export let files: array;

	function getMediaURL(media:type) {
		if (media?.ext === '.svg') {
			return je_cms_api_base_url + media?.url;
		} else if (media?.formats?.large?.url) {
			return je_cms_api_base_url + media?.formats?.large?.url;
		}
	}

	// Slider functionality
	let currentImage: number = 0;
	function previousImage() {
		currentImage = (currentImage - 1 + files.length) % files.length;
	}
	function nextImage() {
		currentImage = (currentImage + 1) % files.length;
	}
</script>

<div class="prose max-w-none mb-6">
	{#if files?.length > 0}
		<div class="relative h-auto max-w-lg overflow-hidden rounded-lg aspect-[3/2]">
			{#each files as img, index}
				<Image
					src={getMediaURL(img)}
					alt={img?.alternativeText}
					classNames={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
					copyright={[]}
				/>
			{/each}
			<!-- Steuerung -->
			<button on:click={previousImage} class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-700 ease-in-out hover:scale-110" aria-label="Vorheriges Bild">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 -rotate-90"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7" />
				</svg>
			</button>
			<button on:click={nextImage} class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-700 ease-in-out hover:scale-110" aria-label="Nächstes Bild">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 rotate-90"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7" />
				</svg>
			</button>
			<!-- Punkte-Navigation im Bildbereich -->
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
				{#each files as _, index}
					<button
						class={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentImage ? 'bg-white/90 scale-110' : 'bg-white/40 hover:bg-white/70'
						}`}
						aria-label={`Bild ${index + 1}`}
						on:click={() => (currentImage = index)}
					></button>
				{/each}
			</div>
		</div>
	{:else}
		<div class="flex text-center font-montserrat justify-start my-2">
			<InfoMessage message="Keine Bilder vorhanden."></InfoMessage>
		</div>
	{/if}
</div>
