<script lang="ts">
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';

	export let body: any[];

	function escapeHtml(html: string): string {
		return html
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function childrenToHtml(item: any, escape: boolean = false): string {
		return item.children
			.map((child: any) => {
				// Formatierungen anwenden
				const classes: string[] = [];
				if (child.bold) classes.push('font-bold');
				if (child.italic) classes.push('italic');
				if (child.underline) classes.push('underline');
				if (child.strikethrough) classes.push('line-through');

				if (child.type === 'text') {
					// Zeilenumbrüche (\n) in <br> umwandeln
					const lines = child.text.split('\n');
					const escapedLines = lines.map((line: string) => escape ? escapeHtml(line) : line);
					let raw = escapedLines.join('<br>');

					return `<span class="${classes.join(' ')}">${raw}</span>`;
				} else if (child.type === 'link') {
					const innerHtml = childrenToHtml(child, escape);
					const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';

					return `<a target=${child.target ? child.target : '_blank'} href="${child.url}"${classAttr}>${innerHtml} 🔗</a>`
				} else {
					return child.raw ?? '';
				}
			})
		.join('');
	}

	function getHeadingClass(level: number): string {
		const classes: any = {
			1: 'text-4xl font-bold text-secondary-900 dark:text-secondary-400',
			2: 'text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-400',
			3: 'text-2xl md:text-3xl font-semibold text-black dark:text-gray-400',
			4: 'text-xl md:text-2xl font-semibold text-black dark:text-gray-300',
			5: 'text-md md:text-xl font-semibold text-black dark:text-gray-200',
			6: 'text-md md:text-xl font-medium text-black dark:text-gray-100'
		};
		return classes[level] || '';
	}
</script>

<div class="prose max-w-none mb-6 text-black dark:text-gray-300">
	{#each body as item}
		{#if item.type === 'paragraph'}
			{@html (() => {
				const html = childrenToHtml(item);
				return `<p class="my-3 leading-relaxed">${html}</p>`;
			})()}
		{:else if item.type === 'heading'}
			<svelte:element this={`h${item.level}`} class={getHeadingClass(item.level)}>
				{@html (() => {
					const html = childrenToHtml(item);
					return `<p class="my-3 leading-relaxed">${html}</p>`;
				})()}
			</svelte:element>
		{:else if item.type === 'list'}
			<svelte:element this={item.format === 'ordered' ? 'ol' : 'ul'} class={item.format === 'ordered' ? 'mb-4 my-3 list-decimal list-inside pl-4' : 'mb-4 my-3 list-disc list-inside pl-4'}>
				{#each item.children as child}
					{@html (() => {
						const html = childrenToHtml(child);
						return `<li class="my-3 leading-relaxed">${html}</li>`;
					})()}
				{/each}
			</svelte:element>
		{:else if item.type === 'code'}
			<div class="my-3 relative bg-secondary-700 rounded-lg p-4 h-auto max-w-4xl overflow-auto">
				<pre>{@html (() => {
						const html = childrenToHtml(item, true);
						return `<code class="leading-relaxed text-sm text-primary-200 whitespace-pre">${html}</code>`;
				})()}</pre>
			</div>
		{:else if item.type === 'image'}
			<div class="my-3 flex text-center justify-start uppercase">
				<InfoMessage message="Bitte Image Komponente nutzen!"></InfoMessage>
			</div>
		{:else if item.type === 'quote'}
			<div class="my-3 flex text-center justify-start uppercase">
				<InfoMessage message="Bitte Quote Komponente nutzen!"></InfoMessage>
			</div>
		{:else}
			<div class="my-3 flex text-center justify-start uppercase">
				<InfoMessage message="Unbekannter Typ: {item.type}"></InfoMessage>
			</div>
		{/if}
	{/each}
</div>
