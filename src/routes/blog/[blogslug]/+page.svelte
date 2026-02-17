<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { name, pronouns, je_cms_base_url, uri } from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import Image from '$lib/components/ui/Image.svelte';
	import Renderer from '$lib/components/stripe/Renderer.svelte';
	import { Icon } from '$lib/components/icons';
	import SharePanel from '$lib/components/blocks/SharePanel.svelte';

	export let data;
	let { post, previousPost, nextPost } = data;

	/* -----------------------------
	   Prepare post data
	----------------------------- */
	$: {
		post = data.post;
		previousPost = data.previousPost;
		nextPost = data.nextPost;
	}

	/* -----------------------------
	   Cover URL
	----------------------------- */
	function getCoverUrl(cover: any, highresolution: boolean): string | null {
		if (!cover) return null;

		// SVG direkt
		if (cover.ext === '.svg' && cover.url) return je_cms_base_url + cover.url;

		// Formate aus Strapi
		const rel =
			(highresolution && cover.formats?.large?.url) ||
			cover.formats?.thumbnail?.url ||
			cover.formats?.medium?.url ||
			cover.formats?.small?.url ||
			cover.url ||
			null;

		return rel ? (rel.startsWith('http') ? rel : je_cms_base_url + rel) : null;
	}

	/* -----------------------------
	 * Blog type helper
	----------------------------- */
	function typeLabel(type?: string) {
		if (type === 'article') return 'Artikel';
		if (type === 'comment') return 'Kommentar';
		return type ? type : 'Beitrag';
	}

	/* -----------------------------
	 * Get author avatar
	----------------------------- */
	function authorAvatarUrl(author: any): string | null {
		const avatar = author?.avatar;
		if (!avatar) return null;

		const rel =
			avatar.formats?.thumbnail?.url ??
			avatar.formats?.small?.url ??
			avatar.formats?.medium?.url ??
			avatar.url ??
			null;

		if (!rel) return null;
		if (rel.startsWith('http://') || rel.startsWith('https://')) return rel;
		return `${je_cms_base_url}${rel.startsWith('/') ? '' : '/'}${rel}`;
	}

	/* -----------------------------
	   Go back (if possible, otherwise to homepage)
	----------------------------- */
	function goBack() {
		if (history.length > 1) history.back();
		else window.location.href = '/';
	}

	/* -----------------------------
	   Share / Clipboard
	----------------------------- */
	let shared = false;
	let busy = false;

	async function onShare() {
		if (busy) return;
		busy = true;

		const ok = await share({
			title: post?.title,
			text: post?.description ?? '',
			url: $page.url.href
		});

		if (ok) {
			shared = true;
			setTimeout(() => (shared = false), 1400);
		}

		busy = false;
	}
</script>

<svelte:head>
	<title>{post?.title} – {name} ({pronouns})</title>
	<link rel="canonical" href={$uri.url.href} />
	<meta property="og:title" content={post?.title} />
	{#if post?.cover}
		<meta property="og:image" content={getCoverUrl(post.cover, false) ?? undefined} />
	{/if}
</svelte:head>

<section class="container py-10 sm:py-14">
	<div class="max-w-5xl mx-auto space-y-6">
		<!-- HEADER / HERO -->
		<div
			class="relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70"
		>
			{#if getCoverUrl(post?.cover, true)}
				<div
					class="absolute inset-0 bg-cover bg-center"
					style="background-image: url({getCoverUrl(post.cover, true)});"
				></div>
				<div class="absolute inset-0 bg-zinc-950/45 dark:bg-zinc-950/55" aria-hidden="true"></div>
			{:else}
				<div
					class="absolute inset-0 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950"
				></div>
			{/if}

			<div class="relative p-6 sm:p-8 space-y-4">
				<div class="flex items-center justify-between gap-4">
					<button
						type="button"
						on:click={goBack}
						class="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white/70 dark:hover:text-zinc-100 hover:cursor-pointer"
					>
						<Icon name="arrow-left" classes="h-4 w-4" />
						<span>Zurück</span>
					</button>

					<!-- Meta right: Typ + Author + Date -->
					<div class="flex flex-wrap items-center justify-end gap-2">
						<!-- Posttyp -->
						<span
							class="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border whitespace-nowrap bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/40 dark:text-zinc-300 dark:border-zinc-800"
						>
							<Icon name={post.type} classes="h-4 w-4" />
							<span>{typeLabel(post?.type)}</span>
						</span>

						<!-- Author -->
						{#if post?.author?.name}
							<span
								class="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border whitespace-nowrap bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/40 dark:text-zinc-300 dark:border-zinc-800"
							>
								{#if authorAvatarUrl(post.author)}
									<Image
										src={authorAvatarUrl(post.author)}
										alt={post.author.name}
										classNames="h-5 w-5 rounded-full object-cover border border-zinc-200/70 dark:border-zinc-800/70"
										loading="lazy"
									/>
								{:else}
									<span
										class="grid place-items-center h-5 w-5 rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
										aria-hidden="true"
									>
										{post.author.name.slice(0, 1).toUpperCase()}
									</span>
								{/if}
								<span>{post.author.name}</span>
							</span>
						{/if}

						<!-- Date -->
						{#if post?.createdAt}
							<span
								class="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border whitespace-nowrap bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/40 dark:text-zinc-300 dark:border-zinc-800"
							>
								<Icon name="calendar" classes="h-4 w-4" />
								<span>{FormatDate(post.createdAt, 'date')}</span>
							</span>
						{/if}
					</div>
				</div>

				<h1 class="text-2xl sm:text-3xl font-semibold text-white">
					{post?.title}
				</h1>

				{#if post?.description}
					<p class="text-sm sm:text-base text-white/90 max-w-3xl">
						{post.description}
					</p>
				{/if}
			</div>
		</div>

		<!-- Content -->
		<div
			class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-6 sm:p-8"
		>
			<div class="grid gap-8 lg:grid-cols-12">
				<!-- Left column -->
				<div class="lg:col-span-8 space-y-6">
					{#if post?.cover}
						<div
							class="md:float-right md:ml-6 md:mb-4 mb-4 overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 w-full md:w-64"
						>
							<Image
								src={getCoverUrl(post.cover, true) ?? ''}
								alt={post.cover?.alternativeText ?? post.title}
								classNames="w-full aspect-square object-cover"
								loading="lazy"
								copyright={post.copyright?.enabled
									? [
											{
												enabled: true,
												name: post.copyright.name,
												url: post.copyright.url,
												compact: true,
												size: 'xs'
											}
										]
									: undefined}
							/>
						</div>
					{/if}

					{#if post?.blocks?.length}
						<Renderer blocks={post.blocks} />
					{:else}
						<p class="text-zinc-600 dark:text-zinc-400">Kein Inhalt vorhanden.</p>
					{/if}
				</div>

				<!-- Right column (sticky) -->
				<aside class="lg:col-span-4 space-y-4 lg:sticky lg:top-24 self-start">
					<!-- Share -->
					<SharePanel
						url={$page.url.href}
						title={post?.title ?? ''}
						text={post?.description ?? ''}
					/>

					<!-- Infos -->
					<div
						class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-4"
					>
						<h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Infos</h2>

						<dl class="mt-3 space-y-3 text-sm">
							{#if post?.updatedAt}
								<div class="flex items-start justify-between gap-4">
									<div class="text-zinc-600 dark:text-zinc-400 inline-flex items-center gap-2">
										<Icon name="clock" classes="h-4 w-4" />
										<span>Zuletzt aktualisiert</span>
									</div>
									<div class="text-right text-zinc-900 dark:text-zinc-100">
										{FormatDate(post.updatedAt, 'date')}
									</div>
								</div>
							{/if}
						</dl>
					</div>
				</aside>
			</div>
		</div>
	</div>

	<!-- Prev/Next Post -->
	{#if previousPost || nextPost}
		<div class="grid gap-4 sm:grid-cols-2 pt-6 sm:pt-8">
			{#if previousPost}
				<a
					href={`/blog/${previousPost.documentId}`}
					on:click|preventDefault={() => goto(`/blog/${previousPost.documentId}`)}
					class="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
				>
					<div class="flex items-center gap-3 min-w-0">
						<div>
							<Icon
								name="arrow-left"
								classes="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition"
							/>
						</div>

						<div>
							<Image
								src={getCoverUrl(previousPost.cover, false) ?? ''}
								alt={previousPost.cover?.alternativeText ?? previousPost.title}
								classNames="h-16 w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
								loading="lazy"
								copyright={previousPost.copyright?.enabled
									? [
											{
												enabled: true,
												name: previousPost.copyright?.name,
												url: previousPost.copyright?.url || '',
												compact: true
											}
										]
									: []}
							/>
						</div>

						<div class="min-w-0">
							<div class="text-xs text-zinc-500 dark:text-zinc-400">Vorheriger Beitrag</div>
							<div
								class="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline truncate"
							>
								{previousPost.title}
							</div>
							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
								{FormatDate(previousPost.createdAt, 'date')}
							</div>
						</div>
					</div>
				</a>
			{:else}
				<div class="hidden sm:block" aria-hidden="true"></div>
			{/if}

			{#if nextPost}
				<a
					href={`/blog/${nextPost.documentId}`}
					on:click|preventDefault={() => goto(`/blog/${nextPost.documentId}`)}
					class="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
				>
					<div class="flex items-center gap-3 min-w-0">
						<div>
							<Image
								src={getCoverUrl(nextPost.cover, false) ?? ''}
								alt={nextPost.cover?.alternativeText ?? nextPost.title}
								classNames="h-16 w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
								loading="lazy"
								copyright={nextPost.copyright?.enabled
									? [
											{
												enabled: true,
												name: nextPost.copyright?.name,
												url: nextPost.copyright?.url || '',
												compact: true
											}
										]
									: []}
							/>
						</div>

						<div class="min-w-0">
							<div class="text-xs text-zinc-500 dark:text-zinc-400">Nächster Beitrag</div>
							<div
								class="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline truncate"
							>
								{nextPost.title}
							</div>
							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
								{FormatDate(nextPost.createdAt, 'date')}
							</div>
						</div>
					</div>

					<div>
						<Icon
							name="arrow-right"
							classes="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition"
						/>
					</div>
				</a>
			{/if}
		</div>
	{/if}
</section>
