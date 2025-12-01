<script lang="ts">
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';
	import { components } from './components';

	export let blocks: Array<any> = [];
</script>

{#each blocks as block}
	{#if components[block.__component]}
		<svelte:component this={components[block.__component]} {...block} />
	{:else}
		<div class="flex text-center justify-start my-2">
			<InfoMessage message="Unbekannter Block: {block.__component}"></InfoMessage>
		</div>
	{/if}
{/each}
