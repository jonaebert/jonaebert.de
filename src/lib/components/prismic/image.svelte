<script lang="ts">
	import * as ph from '@prismicio/helpers';
	import Image from '../image.svelte';

	export let slice;
</script>

<div>
	{#if slice.copyright}
		{#if slice.linkTo}
			<Image
				src={ph.asImageSrc(slice) ?? ''}
				alt={slice.alt ?? ''}
				classNames="h-auto w-80 rounded-lg"
				copyright={[{ name: slice.copyright, url: slice.linkTo.url }]}
			/>
		{:else}
			<Image
				src={ph.asImageSrc(slice) ?? ''}
				alt={slice.alt ?? ''}
				classNames="h-auto w-80 rounded-lg"
				copyright={[{ name: slice.copyright, url: '' }]}
			/>
		{/if}
	{:else}
		<Image
			src={ph.asImageSrc(slice) ?? ''}
			alt={slice.alt ?? ''}
			classNames="h-auto w-80 rounded-lg"
			copyright={[{ name: '', url: '' }]}
		/>
	{/if}
</div>
