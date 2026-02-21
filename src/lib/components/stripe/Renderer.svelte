<script lang="ts">
	import { components } from './components';

	export let blocks: Array<any> = [];
</script>

{#each blocks as block}
	{#if components[block.__component]}
		<svelte:component this={components[block.__component]} {...block} />
	{:else}
		<div class="my-4">
			<div
				class="group relative flex items-start gap-3 rounded-2xl border border-rose-200/60 bg-rose-50/80 px-4 py-3 text-sm text-rose-900 shadow-sm backdrop-blur-sm
			dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200"
			>
				<!-- Icon -->
				<svg
					class="mt-0.5 h-5 w-5 shrink-0 text-rose-500 dark:text-rose-400"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<circle cx="12" cy="16" r="1" />
				</svg>

				<!-- Content -->
				<div class="flex-1">
					<p class="font-medium">Block konnte nicht geladen werden</p>
					<p class="mt-0.5 text-xs opacity-80">
						Unbekannter Komponenten-Typ:
						<span class="font-mono">
							{block.__component}
						</span>
					</p>
				</div>
			</div>
		</div>
	{/if}
{/each}
