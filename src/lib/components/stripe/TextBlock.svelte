<script lang="ts">
	import { lexer } from 'marked';

	export let body: string;
	let tokens: any[] = [];

	tokens = lexer(body || '');

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

<div class="prose max-w-none mb-6 font-montserrat">
	{#each tokens as token}
		<div class="my-3">
			{#if token.type === 'paragraph'}
				<p>{@html token.text}</p>
			{:else if token.type === 'heading'}
				<svelte:element this={`h${token.depth}`} class={getHeadingClass(token.depth)}>
					{@html token.text}
				</svelte:element>
			{:else if token.type === 'code'}
				<div class="relative bg-secondary-700 rounded-lg p-4 h-auto max-w-5xl overflow-scroll">
					<pre><code class="text-sm text-primary-200 whitespace-pre">
					{@html escapeHtml(token.text)}
				</code></pre>
				</div>
			{:else if token.type === 'list'}
				<svelte:element
					this={token.ordered ? 'ol' : 'ul'}
					class={token.ordered
						? 'list-decimal list-inside pl-4 mb-4'
						: 'list-disc list-inside pl-4 mb-4'}
				>
					{#each token.items as item}
						<li>{@html item.text}</li>
					{/each}
				</svelte:element>
			{:else}
				<p>{@html token.raw}</p>
			{/if}
		</div>
	{/each}
</div>
