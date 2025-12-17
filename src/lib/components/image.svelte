<script lang="ts">
	import { contextMenuAction } from '$lib/store';

	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
	export let copyright: { enabled: boolean; name: string; url: string }[] | null | undefined = [];
	export let loading: 'eager' | 'lazy' | null | undefined = undefined;
	export let decoding: 'sync' | 'async' | 'auto' | null | undefined = undefined;
	export let fetchpriority: 'high' | 'auto' | null | undefined = undefined;

	console.log('copyright prop:', copyright);

	function replacePaddingMarginWithZero(classes: string): string {
		return classes
			.split(' ')
			.map((cls) => {
				const normalMatch = /^(p|m)(t|b|l|r|x|y)?-\d+$/.test(cls);
				const arbitraryMatch = /^(p|m)(t|b|l|r|x|y)?-\[.+\]$/.test(cls);

				if (normalMatch) return cls.replace(/-\d+$/, '-0');
				if (arbitraryMatch) return cls.replace(/-\[.+\]$/, '-0');
				return cls;
			})
			.join(' ');
	}

	if (classNames !== '') {
		classNames = replacePaddingMarginWithZero(classNames);
	}
</script>

<div class="relative w-full h-full">
	<img {src} {alt} class={classNames} {loading} {decoding} {fetchpriority} use:contextMenuAction />
	{#if copyright && copyright.length > 0}
		{#if copyright[0].enabled === true}
			<div
				class="absolute right-2 bottom-2 z-20 rounded bg-white/95 px-2 py-1 text-[11px] text-black shadow"
			>
				{#if copyright[0].url && copyright[0].url.startsWith('https://')}
					<a
						href={copyright[0].url}
						target="_blank"
						rel="noopener noreferrer"
						on:click|stopPropagation
					>
						&copy; {copyright[0].name}
					</a>
				{:else}
					<span>&copy; {copyright[0].name}</span>
				{/if}
			</div>
		{/if}
	{/if}
</div>
