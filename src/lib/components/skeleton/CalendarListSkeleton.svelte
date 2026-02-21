<script lang="ts">
	import SkeletonBlock from '$lib/components/skeleton/SkeletonBlock.svelte';
	export let items = 8;
</script>

<section class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
	<!-- Header -->
	<div class="flex items-center justify-between gap-4">
		<div class="min-w-0">
			<SkeletonBlock className="h-4 w-40" />
			<div class="mt-2">
				<SkeletonBlock className="h-3.5 w-52" />
			</div>
		</div>

		<SkeletonBlock className="h-9 w-28 rounded-xl" />
	</div>

	<!-- Items -->
	<div class="mt-5 space-y-3">
		{#each Array(items) as _}
			<div class="block rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden">
				<div class="flex items-center gap-4 p-4">
					<!-- Datum Badge (w-16 h-16, zentriert wie im echten Layout) -->
					<div
						class="rounded-2xl w-16 h-16 border border-zinc-200/70 dark:border-zinc-800/70
					           bg-zinc-50 dark:bg-zinc-900/30 grid place-items-center px-2"
					>
						<div class="w-full grid place-items-center gap-1">
							<SkeletonBlock className="h-6 w-7 rounded-lg" />
							<SkeletonBlock className="h-3 w-10 rounded-lg" />
						</div>
					</div>

					<!-- Optional Cover (hidden sm:block h-16 w-16) -->
					<div class="hidden sm:block">
						<SkeletonBlock className="h-16 w-16 rounded-2xl" />
					</div>

					<!-- Content -->
					<div class="min-w-0 flex-1">
						<div class="flex items-start justify-between gap-3">
							<SkeletonBlock className="h-4 w-2/3" />
							<!-- Status pill -->
							<SkeletonBlock className="h-6 w-20 rounded-full" />
						</div>

						<div class="mt-2 space-y-2">
							<SkeletonBlock className="h-3.5 w-3/4" />
							<SkeletonBlock className="h-3.5 w-1/2" />
						</div>

						<!-- Optional Beschreibung -->
						<div class="mt-3">
							<SkeletonBlock className="h-3.5 w-5/6" />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
