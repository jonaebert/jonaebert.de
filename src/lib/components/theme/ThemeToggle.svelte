<script lang="ts">
	import { onMount } from 'svelte';
	import type { Theme } from '$lib/util/theme';
	import { applyTheme, getStoredTheme, storeTheme } from '$lib/util/theme';

	let theme: Theme = 'system';

	onMount(() => {
		theme = getStoredTheme();
	});

	function setTheme(t: Theme) {
		theme = t;
		storeTheme(t);
		applyTheme(t);
	}
</script>

<div
	class="inline-flex items-center rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden"
>
	<button
		class="px-3 py-2 text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition {theme ===
		'light'
			? 'bg-zinc-100 dark:bg-zinc-900'
			: ''}"
		on:click={() => setTheme('light')}
		aria-label="Light mode"
	>
		☀️</button
	>
    <button
		class="px-3 py-2 text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition {theme ===
		'system'
			? 'bg-zinc-100 dark:bg-zinc-900'
			: ''}"
		on:click={() => setTheme('system')}
		aria-label="System mode"
	>
		🖥️</button
	>
    <button
		class="px-3 py-2 text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition {theme ===
		'dark'
			? 'bg-zinc-100 dark:bg-zinc-900'
			: ''}"
		on:click={() => setTheme('dark')}
		aria-label="Dark mode"
	>
		🌙</button
	>
</div>
