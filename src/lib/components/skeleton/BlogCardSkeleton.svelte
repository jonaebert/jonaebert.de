<script lang="ts">
	import SkeletonBlock from '$lib/components/skeleton/SkeletonBlock.svelte';

	// Anzahl der Skeleton-Cards
	export let items: number = 2;
</script>

<section class="grid gap-5 sm:grid-cols-2">
	{#each Array(items) as _}
		<article
			class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden
			       hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
			aria-hidden="true"
		>
			<!-- Cover (aspect-video wie echte Blog Cards) -->
			<SkeletonBlock className="w-full aspect-video rounded-none" />

			<div class="p-5">
				<!-- Kategorie-Pill -->
				<SkeletonBlock className="h-6 w-16 rounded-full" />

				<!-- Titel -->
				<div class="mt-3 space-y-2">
					<SkeletonBlock className="h-5 w-5/6" />
					<SkeletonBlock className="h-5 w-3/5" />
				</div>

				<!-- Excerpt -->
				<div class="mt-3 space-y-2">
					<SkeletonBlock className="h-4 w-11/12" />
					<SkeletonBlock className="h-4 w-8/12" />
				</div>

				<!-- Weiterlesen -->
				<div class="mt-4">
					<SkeletonBlock className="h-4 w-28 rounded-lg" />
				</div>
			</div>
		</article>
	{/each}
</section>
