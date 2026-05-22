<script lang="ts">
	import { page } from '$app/stores';
	import Image from '$lib/components/ui/Image.svelte';
	import { je_cms_base_url, img_alte_waage } from '$lib/store';
</script>

<section class="container py-8 sm:py-12">
	<div
		class="relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950"
	>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<!-- Media -->
			<div class="relative min-h-[25vh] md:min-h-[60vh] overflow-hidden">
				<Image fill src={img_alte_waage} alt="Braunschweig Alte Waage" classNames="object-cover" />
				<div
					class="absolute inset-0 bg-linear-to-b from-white/15 via-white/5 to-white/25 dark:from-zinc-950/75 dark:via-zinc-950/45 dark:to-zinc-950/80"
				></div>

				<!-- Badge ... -->
				<div class="absolute left-4 top-4 sm:left-6 sm:top-6">
					<span
						class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/70 border border-white/40 backdrop-blur-md dark:bg-zinc-900/60 dark:border-zinc-800/70"
					>
						<span class="h-2 w-2 rounded-full bg-accent"></span>
						<span class="text-zinc-700 dark:text-zinc-200">Fehler</span>
					</span>
				</div>
			</div>

			<!-- Text -->
			<div class="p-5 sm:p-7 lg:p-10 flex flex-col justify-center">
				<div
					class="w-full rounded-2xl p-4 sm:p-5 bg-white/70 border border-zinc-200/60 shadow-sm dark:bg-transparent dark:border-transparent dark:shadow-none"
				>
					<p class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Status</p>

					<h1
						class="mt-1 text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
					>
						{$page.status}
					</h1>

					<h2
						class="mt-4 text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-200"
					>
						{#if $page.status === 404}
							Diese Seite existiert nicht.
						{:else}
							{$page.error?.message ?? 'Ein unerwarteter Fehler ist aufgetreten.'}
						{/if}
					</h2>

					<p class="mt-3 text-sm sm:text-base text-zinc-700/90 dark:text-zinc-400 leading-relaxed">
						{#if $page.status === 404}
							Wenn du über einen Link hier gelandet bist, kann die Seite verschoben oder entfernt
							worden sein.
						{:else}
							Leider ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später erneut.
						{/if}
					</p>

					<div class="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:gap-3">
						<a
							href="/"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white hover:scale-105 transition-transform duration-300"
						>
							Zur Startseite
						</a>

						<a
							href="/contact"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:scale-105 transition-transform duration-300"
						>
							Fehler melden
						</a>
					</div>

					{#if $page.status !== 404 && $page.error?.message}
						<p class="mt-5 text-xs text-zinc-500 dark:text-zinc-500">
							Technischer Hinweis: {$page.error.message}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
