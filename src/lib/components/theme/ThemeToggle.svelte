<script lang="ts">
	import { onMount } from 'svelte';
	import type { Theme } from '$lib/util/theme';
	import { applyTheme, getStoredTheme, storeTheme } from '$lib/util/theme';
	import Icon from '$lib/components/icons/Icon.svelte';

	let theme: Theme = 'system';

	onMount(() => {
		theme = getStoredTheme();
		applyTheme(theme);
	});

	function setTheme(t: Theme) {
		theme = t;
		storeTheme(t);
		applyTheme(t);
	}

	$: idx = theme === 'light' ? 0 : theme === 'system' ? 1 : 2;
</script>

<div
	class="relative inline-flex rounded-xl border border-zinc-200/70 dark:border-zinc-800/70
		bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden"
>
	<!-- Active indicator -->
	<div
		class="absolute inset-y-0 w-1/3 transition-transform duration-300 ease-out
			bg-linear-to-b from-white/70 to-zinc-100/70 dark:from-zinc-800/70 dark:to-zinc-900/20
			ring-1 ring-inset ring-zinc-900/5 dark:ring-white/10"
		style="transform: translateX({idx * 100}%);"
	></div>

	<button
		class="group relative px-3 py-2 flex items-center justify-center transition
			text-zinc-600 dark:text-zinc-400
			hover:text-zinc-900 dark:hover:text-zinc-100
			hover:bg-zinc-100/40 dark:hover:bg-zinc-800/40
			active:scale-[0.98]"
		class:text-zinc-900={theme === 'light'}
		class:dark:text-zinc-100={theme === 'light'}
		on:click={() => setTheme('light')}
		aria-label="Hellmodus"
	>
		<span
			class="transition-transform duration-200
				group-hover:scale-110
				{theme === 'light' ? 'scale-110' : ''}"
		>
			<Icon name="sun" classes="h-4 w-4" strokeWidth={1.8} />
		</span>
	</button>

	<button
		class="group relative px-3 py-2 flex items-center justify-center transition
			text-zinc-600 dark:text-zinc-400
			hover:text-zinc-900 dark:hover:text-zinc-100
			hover:bg-zinc-100/40 dark:hover:bg-zinc-800/40
			active:scale-[0.98]"
		class:text-zinc-900={theme === 'system'}
		class:dark:text-zinc-100={theme === 'system'}
		on:click={() => setTheme('system')}
		aria-label="Systemmodus"
	>
		<span
			class="transition-transform duration-200
				group-hover:scale-110
				{theme === 'system' ? 'scale-110' : ''}"
		>
			<Icon name="monitor" classes="h-4 w-4" strokeWidth={1.8} />
		</span>
	</button>

	<button
		class="group relative px-3 py-2 flex items-center justify-center transition
			text-zinc-600 dark:text-zinc-400
			hover:text-zinc-900 dark:hover:text-zinc-100
			hover:bg-zinc-100/40 dark:hover:bg-zinc-800/40
			active:scale-[0.98]"
		class:text-zinc-900={theme === 'dark'}
		class:dark:text-zinc-100={theme === 'dark'}
		on:click={() => setTheme('dark')}
		aria-label="Dunkelmodus"
	>
		<span
			class="transition-transform duration-200
				group-hover:scale-110
				{theme === 'dark' ? 'scale-110' : ''}"
		>
			<Icon name="moon" classes="h-4 w-4" strokeWidth={1.8} />
		</span>
	</button>
</div>
