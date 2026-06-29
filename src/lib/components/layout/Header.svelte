<script lang="ts">
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import { logo_small_clear, name, pronouns } from '$lib/store';
	import Slogan from '$lib/components/ui/Slogan.svelte';
	import { onMount } from 'svelte';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'Über mich' }
	];

	let mobileOpen = false;

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}
	function closeMobile() {
		mobileOpen = false;
	}

	onMount(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMobile();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<header
	class="sticky top-0 z-50 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- Top row -->
		<div class="h-16 flex items-center justify-between gap-3">
			<a href="/" class="group flex items-center gap-2 min-w-0" on:click={closeMobile}>
				<div class="h-9 w-9 shrink-0 rounded-xl bg-accent flex items-center justify-center">
					<Image
						src={logo_small_clear}
						alt="Logo von {name}"
						classNames="h-full w-full rounded-full cover object-center"
					/>
				</div>

				<!-- Title block -->
				<div class="min-w-0 leading-tight">
					<div class="font-semibold tracking-tight text-[15px] sm:text-base">
						{name}
						<span class="hidden sm:inline text-zinc-500 dark:text-zinc-400 font-medium"
							>({pronouns})</span
						>
					</div>
					<!-- Auf sehr kleinen Screens optional ausblenden -->
					<div class="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 truncate">
						<Slogan />
					</div>
				</div>
			</a>

			<!-- Right controls -->
			<div class="flex items-center gap-2 shrink-0">
				<!-- Theme toggle (auf xs leicht kleiner) -->
				<div class="scale-[0.9] sm:scale-100 origin-right">
					<ThemeToggle />
				</div>

				<!-- Desktop nav -->
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

				<!-- Mach's Grün -->
				<a
					href="/braunschweig2031"
					class="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-magenta hover:scale-105 text-white transition-all ease-in-out duration-300"
				>
					Braunschweig 2031
				</a>

				<!-- Desktop contact -->
				<a
					href="/contact"
					class="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white hover:scale-105 transition-all ease-in-out duration-300"
				>
					Kontakt
				</a>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-950/40 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60 transition"
					aria-label="Menü öffnen"
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav"
					on:click={toggleMobile}
				>
					<!-- Hamburger / X -->
					{#if mobileOpen}
						<svg
							viewBox="0 0 24 24"
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
						>
							<path d="M6 6l12 12" />
							<path d="M18 6L6 18" />
						</svg>
					{:else}
						<svg
							viewBox="0 0 24 24"
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
						>
							<path d="M4 7h16" />
							<path d="M4 12h16" />
							<path d="M4 17h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile dropdown -->
		<div
			id="mobile-nav"
			class="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out
				{mobileOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'}"
		>
			<div class="pt-2">
				<!-- Slogan auf mobile sichtbar (unter Menü) -->
				<div class="sm:hidden text-xs text-zinc-500 dark:text-zinc-400 px-2 pb-3">
					<Slogan />
				</div>

				<div class="grid gap-1">
					{#each navItems as item}
						<a
							href={item.href}
							on:click={closeMobile}
							class="px-3 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60 transition"
						>
							{item.label}
						</a>
					{/each}

					<a
						href="/braunschweig2031"
						on:click={closeMobile}
						class="mt-1 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-magenta hover:scale-105 text-white"
					>
						Braunschweig 2031
					</a>

					<a
						href="/contact"
						on:click={closeMobile}
						class="mt-1 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition"
					>
						Kontakt
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
