<script lang="ts">
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import Image from '$lib/components/Image.svelte';
	import { logo_small_clear, name, pronouns } from '$lib/store';
	import Slogan from '$lib/components/blocks/Slogan.svelte';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'Über mich' }
	];
</script>

<header
	class="sticky top-0 z-50 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<a href="/" class="group flex items-center gap-2">
			<div class="h-9 w-9 rounded-xl bg-accent">
				<Image
					src={logo_small_clear}
					alt="Logo von {name}"
					classNames="h-full w-full rounded-full cover object-center"
				/>
			</div>
			<div class="leading-tight">
				<div class="font-semibold tracking-tight">{name} ({pronouns})</div>
				<div class="text-xs text-zinc-500 dark:text-zinc-400">
					<Slogan />
				</div>
			</div>
		</a>

		<nav class="hidden md:flex items-center gap-1">
			{#each navItems as item}
				<a
					href={item.href}
					class="px-3 py-2 rounded-xl text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60 transition"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<ThemeToggle />
			<a
				href="/contact"
				class="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition"
			>
				Kontakt
			</a>
		</div>
	</div>
</header>
