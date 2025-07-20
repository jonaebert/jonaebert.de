<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store.js'
	import Image from '$lib/components/image.svelte';
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';

	export let __component: string;
	export let media: array;

	function getMediaURL(media:type) {
		if (media?.ext === '.svg') {
			return je_cms_api_base_url + media?.url;
		} else if (media?.formats?.thumbnail?.url) {
			return je_cms_api_base_url + media?.formats?.large?.url;
		}
	}
</script>

<div class="prose max-w-none mb-6">
	{#if __component === 'shared.media'}
		<Image
			src={getMediaURL(media)}
			alt={media?.alternativeText}
			classNames="h-auto max-w-5xl rounded-lg object-cover aspect-3/2 aspect-[3/2] bg-transparent"
			copyright={[]}
		/>
	{:else}
		<InfoMessage message="Unbekannter Block: {__component}"></InfoMessage>
	{/if}
</div>
