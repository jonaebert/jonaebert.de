<script lang="ts">
	import { onMount } from 'svelte';
	import Image from '$lib/components/image.svelte';
	import InfoMessage from '../../blocks/InfoMessage.svelte';
	import { getMediaURL } from './Image';

	export let __component: string;
	export let temp_file_id: bigint;

	let mediaData: string | null = null;

	async function load() {
		mediaData = await getMediaURL(temp_file_id, 'url');
		return mediaData;
	}
</script>

<div class="prose max-w-none mb-6">
	{#if __component === 'shared.media'}
		<!-- <Image
			src={load}
			alt=""
			classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent"
			copyright={[]}
		/> -->
	{:else}
		<InfoMessage message="Unbekannter Block: {__component}"></InfoMessage>
	{/if}
</div>
