<script lang="ts">
	import { name, pronouns } from '$lib/store';
	import Slogan from '$lib/components/blocks/Slogan.svelte';
	import Social from '../blocks/Social.svelte';

	const legalLinks = [
		{ href: '/legal/imprint', label: 'Impressum' },
		{ href: '/legal/privacy', label: 'Datenschutzerklärung' },
		{ href: '/contact?barrier=true', label: 'Barriere melden' }
	];

	const recLinks = [
		{ href: 'https://gruene-braunschweig.de/', label: 'GRÜNE Braunschweig' },
		{
			href: 'https://gruene-braunschweig-ratsfraktion.de/',
			label: 'GRÜNE Ratsfraktion Braunschweig'
		},
		{ href: 'https://gj-braunschweig.de/', label: 'GRÜNE JUGEND Braunschweig' }
	];

	const yearFrom = 2023;
</script>

<footer class="border-t border-zinc-200/70 dark:border-zinc-800/70">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
		<div class="grid gap-8 lg:grid-cols-12">
			<div class="lg:col-span-5">
				<div class="font-semibold tracking-wide">{name} ({pronouns})</div>
				<div class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					<Slogan />
				</div>

				<p class="mt-5 text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed text-balance">
					Entwickelt mit <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a> und <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>. Server-Betrieb bei <a href="https://www.hetzner.com/de/" target="_blank">Hetzner</a> mit <a href="https://coolify.io/" target="_blank">Coolify</a>.
				</p>
			</div>

			<div class="lg:col-span-3">
				<div class="text-sm font-medium">Rechtliches ⚖️</div>
				<div class="mt-3 flex flex-col gap-2">
					{#each legalLinks as item}
						<a
							class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition underline-offset-4 hover:underline"
							href={item.href}
						>
							{item.label}
						</a>
					{/each}
				</div>
			</div>

			<div class="lg:col-span-4 lg:justify-self-end">
				<div class="text-sm font-medium">Schau mal hier vorbei 👀</div>
				<div class="mt-3 flex flex-col gap-2">
					{#each recLinks as item}
						<a
							class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition underline-offset-4 hover:underline"
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.label}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-10 border-t border-zinc-200/70 dark:border-zinc-800/70 pt-8">
			<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div class="text-sm text-zinc-600 dark:text-zinc-400">
					&copy; {yearFrom} – {new Date().getFullYear()}
					{name}. Alle Rechte vorbehalten.
				</div>

				<div>
					<Social />
				</div>
			</div>
		</div>
	</div>
</footer>
