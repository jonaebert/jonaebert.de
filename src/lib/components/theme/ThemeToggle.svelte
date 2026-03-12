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
	class="relative inline-flex rounded-xl border border-zinc-200/70 bg-white/70 p-1
		dark:border-zinc-800/70 dark:bg-zinc-900/70"
	role="group"
	aria-label="Darstellungsmodus wählen"
>
	<div
		class="pointer-events-none absolute left-1 top-1 h-9 w-9 sm:h-7 sm:w-9 rounded-lg
			bg-zinc-100 dark:bg-zinc-800/90
			transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)]"
		style="transform: translateX(calc({idx} * 2.25rem));"
	></div>

	<button
		type="button"
		class="relative z-10 flex h-9 w-9 sm:h-7 sm:w-9 items-center justify-center rounded-lg
			text-zinc-500 transition-colors duration-200
			hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100
			focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/80
			dark:focus-visible:ring-zinc-700/80"
		class:text-zinc-900={theme === 'light'}
		class:dark:text-zinc-100={theme === 'light'}
		on:click={() => setTheme('light')}
		aria-label="Hellmodus"
		aria-pressed={theme === 'light'}
	>
		<Icon name="sun" classes="h-4 w-4 sm:h-3.5 sm:w-3.5 stroke-[1.8] sm:stroke-[1.3]" />
	</button>

	<button
		type="button"
		class="relative z-10 flex h-9 w-9 sm:h-7 sm:w-9 items-center justify-center rounded-lg
			text-zinc-500 transition-colors duration-200
			hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100
			focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/80
			dark:focus-visible:ring-zinc-700/80"
		class:text-zinc-900={theme === 'system'}
		class:dark:text-zinc-100={theme === 'system'}
		on:click={() => setTheme('system')}
		aria-label="Systemmodus"
		aria-pressed={theme === 'system'}
	>
		<Icon name="monitor" classes="h-4 w-4 sm:h-3.5 sm:w-3.5 stroke-[1.8] sm:stroke-[1.3]" />
	</button>

	<button
		type="button"
		class="relative z-10 flex h-9 w-9 sm:h-7 sm:w-9 items-center justify-center rounded-lg
			text-zinc-500 transition-colors duration-200
			hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100
			focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/80
			dark:focus-visible:ring-zinc-700/80"
		class:text-zinc-900={theme === 'dark'}
		class:dark:text-zinc-100={theme === 'dark'}
		on:click={() => setTheme('dark')}
		aria-label="Dunkelmodus"
		aria-pressed={theme === 'dark'}
	>
		<Icon name="moon" classes="h-4 w-4 sm:h-3.5 sm:w-3.5 stroke-[1.8] sm:stroke-[1.3]" />
	</button>
</div>