<script lang="ts">
	import { contextMenuAction } from '$lib/store';
	import { browser } from '$app/environment';
	import { portal } from '$lib/actions/portal';
	import { tick, onDestroy } from 'svelte';
	import Copyright from '$lib/components/ui/Copyright.svelte';

	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
	export let copyright:
		| {
				enabled: boolean;
				name: string;
				url: string;
				size: 'xs' | 'sm' | 'md';
		  }[]
		| null
		| undefined = [];
	export let fill: boolean = false;

	export let loading: 'eager' | 'lazy' | null | undefined = undefined;
	export let decoding: 'sync' | 'async' | 'auto' | null | undefined = undefined;
	export let fetchpriority: 'high' | 'auto' | null | undefined = undefined;

	let rootEl: HTMLDivElement | null = null;
</script>

<div
	class={`relative ${fill ? 'block w-full h-full' : 'inline-block align-middle'}`}
	bind:this={rootEl}
>
	<div class={`overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
		<img
			{src}
			{alt}
			class={`block ${fill ? 'w-full h-full' : 'max-w-full'} ${classNames}`}
			{loading}
			{decoding}
			{fetchpriority}
			use:contextMenuAction
		/>
	</div>

	<Copyright {copyright} {rootEl} />
</div>
