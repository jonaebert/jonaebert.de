<script lang="ts">
	import { je_cms_api_base_url } from '$lib/store.js'
	import Image from '$lib/components/image.svelte';
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';

	export let file: array;

	function getMediaURL(media:type) {
		if (media?.ext === '.svg') {
			return je_cms_api_base_url + media?.url;
		} else if (media?.formats?.large?.url) {
			return je_cms_api_base_url + media?.formats?.large?.url;
		}
	}
</script>

<div class="prose max-w-none mb-6">
		<Image
			src={getMediaURL(file)}
			alt={file?.alternativeText}
			classNames="h-auto max-w-lg rounded-lg object-cover"
			copyright={[]}
		/>
</div>
