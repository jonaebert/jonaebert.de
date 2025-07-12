<script lang="ts">
	import BlogTiles from '$lib/components/tiles/Blog.svelte';
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';

	export let data;
	const posts = data.data;
</script>

<main class="p-8">
	<div class="container mx-auto px-4 py-12 max-w-(--breakpoint-xl)">
		<div class="text-left font-poppins">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2 pb-7">Aktuelles</h2>
		</div>
		{#if posts[0]}
			<BlogTiles items={posts} />
		{:else}
			<div class="flex text-center font-montserrat justify-start">
				<InfoMessage message="Es konnten aktuell keine Beiträge gefunden werden!"></InfoMessage>
			</div>
		{/if}
	</div>
</main>
