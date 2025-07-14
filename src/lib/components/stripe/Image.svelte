<script lang="ts">
	import { lexer } from 'marked';
	import Image from '$lib/components/image.svelte'; 

	export let body: string;
	let tokens: any[] = [];

	tokens = lexer(body || '');

	console.log(body);

	function escapeHtml(html: string): string {
		return html
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function getHeadingClass(level: number): string {
		const classes: any = {
			1: 'text-4xl font-bold text-secondary-900 font-poppins italic',
			2: 'text-3xl md:text-4xl font-bold text-secondary-900 font-poppins italic',
			3: 'text-2xl md:text-3xl font-semibold text-black font-poppins italic',
			4: 'text-xl md:text-2xl font-semibold text-black font-poppins italic',
			5: 'text-md md:text-xl font-semibold text-black font-poppins italic',
			6: 'text-md md:text-xl font-medium text-black font-poppins italic'
		};
		return classes[level] || '';
	}
</script>

<div class="prose max-w-none mb-6">
	{#each tokens as token}
		{#if token.type === 'image'}
			<Image
				src={token.href}
				alt={token.text}
				classNames="w-full object-cover transition-all duration-500 hover:scale-105 group-hover/teaser-image:scale-105 aspect-3/2 aspect-[3/2] bg-transparent"
				copyright={[]}
			/>
		{:else if token.type === 'heading'}
			<svelte:element this={`h${token.depth}`} class={getHeadingClass(token.depth)}>
				{@html token.text}
			</svelte:element>
		{:else}
			<p>{@html token.raw}</p>
		{/if}
	{/each}
</div>
