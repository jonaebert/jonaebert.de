<script lang="ts">
	import { contextMenuAction } from '$lib/store';
	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
	export let copyright: { name: string; url: string }[] = [{ name: '', url: '' }];

	function replacePaddingMarginWithZero(classes: string): string {
		return classes
			.split(' ')
			.map((cls) => {
				const normalMatch = /^(p|m)(t|b|l|r|x|y)?-\d+$/.test(cls);
				const arbitraryMatch = /^(p|m)(t|b|l|r|x|y)?-\[.+\]$/.test(cls);

				if (normalMatch) {
					// Zahl durch 0 ersetzen
					return cls.replace(/-\d+$/, '-0');
				} else if (arbitraryMatch) {
					// Arbitrary Value komplett durch 0 ersetzen
					// z.B. p-[10px] -> p-0, mt-[3rem] -> mt-0
					return cls.replace(/-\[.+\]$/, '-0');
				}
				return cls;
			})
			.join(' ');
	}

	if (classNames !== '') {
		classNames = replacePaddingMarginWithZero(classNames);
	}
</script>

<div class="relative w-full h-full">
	<img {src} {alt} class={classNames} use:contextMenuAction />

	{#if copyright.length > 0 && copyright[0].name !== ''}
		<div class="absolute right-2 bottom-2 bg-gray-50 rounded p-1 text-xs text-black opacity-75">
			{#if copyright[0].url && copyright[0].url.startsWith('https://')}
				<a href={copyright[0].url} target="_blank" rel="noopener noreferrer">
					<p class="text-end">&copy; {copyright[0].name}</p>
				</a>
			{:else}
				<p class="text-end">&copy; {copyright[0].name}</p>
			{/if}
		</div>
	{/if}
</div>

