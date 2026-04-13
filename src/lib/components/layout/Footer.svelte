<script lang="ts">
	import { name, pronouns } from '$lib/store';
	import Slogan from '$lib/components/ui/Slogan.svelte';
	import SocialIcons from '$lib/components/ui/SocialIcons.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import BubbleBackground from '$lib/components/ui/BubbleBackground.svelte';

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
	const currentYear = new Date().getFullYear();
</script>

<footer
	class="relative overflow-hidden border-t border-zinc-200/70 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-950"
>
	<BubbleBackground preset="cta" className="z-0 opacity-90" />

	<div class="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
		<div
			class="rounded-3xl border border-white/50 bg-white/55 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-6 lg:p-8"
		>
			<div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
				<div class="lg:col-span-5">
					<div
						class="inline-flex scale-105 items-center gap-2 rounded-full border border-[var(--accent)]/15 bg-white/70 px-3 py-1 text-xs backdrop-blur-sm dark:border-[var(--accent)]/20 dark:bg-zinc-900/70"
					>
						<span class="text-[var(--accent)]"><Slogan /></span>
					</div>

					<div class="mt-4">
						<h2
							class="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl"
						>
							<span class="font-bold text-[var(--accent)]">{name}</span>
							<span class="ml-2 text-zinc-500 dark:text-zinc-400">({pronouns})</span>
						</h2>
					</div>

					<div class="mt-6 flex flex-wrap gap-3">
						<a
							href="/about"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white hover:scale-105 transition-transform duration-300"
						>
							Über mich
						</a>

						<a
							href="/contact"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:scale-105 transition-transform duration-300"
						>
							Kontakt
						</a>
					</div>
				</div>

				<div class="lg:col-span-7">
					<div class="grid gap-5 sm:grid-cols-2">
						<div
							class="rounded-2xl p-5 bg-zinc-50 dark:bg-white/10 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div
								class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
							>
								<Icon name="scale" classes="h-4 w-4 text-[var(--accent)]" />
								<span>Rechtliches</span>
							</div>

							<nav class="mt-4 flex flex-col gap-3">
								{#each legalLinks as item}
									<a
										class="text-sm text-zinc-600 transition hover:text-(--accent) hover:underline underline-offset-4 dark:text-zinc-400 dark:hover:text-(--accent)"
										href={item.href}
									>
										{item.label}
									</a>
								{/each}
							</nav>
						</div>

						<div
							class="rounded-2xl p-5 bg-zinc-50 dark:bg-white/10 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div
								class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
							>
								<Icon name="compass" classes="h-4 w-4 text-[var(--accent)]" />
								<span>Empfehlungen</span>
							</div>

							<nav class="mt-4 flex flex-col gap-3">
								{#each recLinks as item}
									<a
										class="text-sm text-zinc-600 transition hover:text-[var(--accent)] hover:underline underline-offset-4 dark:text-zinc-400 dark:hover:text-[var(--accent)]"
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{item.label}
									</a>
								{/each}
							</nav>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-8 border-t border-zinc-200/70 pt-5 dark:border-zinc-800/70">
				<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div class="space-y-2">
						<p class="text-sm text-zinc-600 dark:text-zinc-400">
							&copy; {yearFrom}{yearFrom !== currentYear ? `–${currentYear}` : ''}
							{name}. Alle Rechte vorbehalten.
						</p>

						<p class="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
							Entwickelt mit
							<a
								href="https://kit.svelte.dev/"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-[var(--accent)] hover:underline"
							>
								SvelteKit
							</a>
							und
							<a
								href="https://tailwindcss.com/"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-[var(--accent)] hover:underline"
							>
								Tailwind CSS
							</a>. Server-Betrieb bei
							<a
								href="https://www.hetzner.com/de/"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-[var(--accent)] hover:underline"
							>
								Hetzner
							</a>
							mit
							<a
								href="https://coolify.io/"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-[var(--accent)] hover:underline"
							>
								Coolify
							</a>.
						</p>
					</div>

					<div class="w-fit">
						<SocialIcons />
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
