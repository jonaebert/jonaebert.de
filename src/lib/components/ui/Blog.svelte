<script lang="ts">
	import BlogCardSkeleton from '$lib/components/skeleton/BlogCardSkeleton.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import SocialIcons from './SocialIcons.svelte';
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
		<div class="sm:col-span-2">
			<BlogCardSkeleton items={limit} />
		</div>
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
			<div class="flex items-start gap-3">
				<!-- Optional Icon -->
				<div class="mt-0.5 text-zinc-500 dark:text-zinc-400">
					<Icon name="info" />
				</div>

				<div>
					<div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
						Beiträge sind aktuell nicht verfügbar
					</div>

					<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
						Der Blog konnte gerade nicht geladen werden. Bitte versuche es in ein paar Minuten erneut oder lade die Seite neu.
					</div>

					<!-- Actions -->
					<div class="mt-4 flex flex-wrap gap-2">
						<button
							on:click={() => location.reload()}
							class="inline-flex items-center rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 px-3 py-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 transition duration-200 ease-in-out hover:cursor-pointer"
						>
							Neu laden
						</button>

						<a
							href="/contact"
							class="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition duration-200 ease-in-out"
						>
							Problem melden
						</a>
					</div>

					<!-- Social Hinweis -->
					<div class="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
						Du findest aktuelle Updates auch auf meinen Social-Media-Kanälen.
					</div>

					<!-- Deine bestehende Komponente -->
					<div class="mt-2 max-w-fit">
						<SocialIcons />
					</div>

					<!-- Optional Debug -->
					{#if import.meta.env.DEV}
						<div class="mt-4 text-xs text-zinc-500/80 dark:text-zinc-400/80 break-all">
							{String(err)}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/await}
</section>
