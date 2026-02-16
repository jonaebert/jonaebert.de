<script lang="ts">
	import BlogCardSkeleton from '$lib/components/skeleton/BlogCardSkeleton.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { je_cms_base_url } from '$lib/store.js';

	export let posts: Promise<any[]>;
	export let limit: number = 4;

	function coverUrl(item: any): string | null {
		const cover = item?.cover;
		if (!cover) return null;

		const rel = cover.formats?.small?.url ?? cover.formats?.thumbnail?.url ?? cover.url ?? null;
		if (!rel) return null;
		if (rel.startsWith('http://') || rel.startsWith('https://')) return rel;

		return `${je_cms_base_url}${rel.startsWith('/') ? '' : '/'}${rel}`;
	}
</script>

<section class="grid gap-5 sm:grid-cols-2">
	{#await posts}
		<BlogCardSkeleton items={limit} />
	{:then ps}
		{#each ps.slice(0, limit) as post (post.id ?? post.documentId)}
			<a
				href={`/blog/${post.documentId}`}
				class="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
				aria-label={`Blogbeitrag öffnen: ${post.title}`}
			>
				{#if coverUrl(post)}
					<div class="relative">
						<Image
							src={coverUrl(post)!}
							alt={post.cover?.alternativeText ?? post.title ?? 'Blogbild'}
							classNames="block w-full aspect-video object-cover"
							loading="lazy"
							copyright={post.copyright?.enabled
								? [
										{
											enabled: post.copyright.enabled,
											name: post.copyright.name,
											url: post.copyright.url || '',
											compact: true,
											size: 'xs'
										}
									]
								: []}
						/>
					</div>
				{/if}

				<div class="p-5">
					<div
						class="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30"
					>
						<Icon name={post.type} classes="h-4 w-4" />
						{#if post.type == 'article'}
							Artikel
						{:else if post.type == 'comment'}
							Kommentar
						{:else}
							<span>Beitrag</span>
						{/if}
					</div>

					<h2 class="mt-3 text-lg font-semibold tracking-tight line-clamp-2">{post.title}</h2>

					<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
						{post.description}
					</p>

					<div class="mt-4">
						<span
							class="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline"
						>
							Weiterlesen
							<Icon name="arrow-right" classes="w-4 h-4" />
						</span>
					</div>
				</div>
			</a>
		{/each}
	{:catch err}
		<div class="sm:col-span-2 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
			<div class="text-sm font-medium">Blog konnte nicht geladen werden</div>
			<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{String(err)}</div>
		</div>
	{/await}
</section>
