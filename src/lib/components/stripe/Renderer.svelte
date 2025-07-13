<script lang="ts">
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';
	import { components } from './components';

	export let blocks: Array<any> = [];
	const fallback = ({ __component }) => `Unbekannter Block: ${__component}`;

	console.log('Renderer blocks:', blocks);
</script>

{#each blocks as block, i}
	{#if components[block.__component]}
		<svelte:component this={components[block.__component]} {...block} />
	{:else}
		<div class="flex text-center font-montserrat justify-start my-2">
			<InfoMessage message={fallback(block)}></InfoMessage>
		</div>
	{/if}
{/each}
