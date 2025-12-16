<script lang="ts">
	import { name, je_cms_api_base_url, pronouns, uri } from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import Image from '$lib/components/image.svelte';
	import Renderer from '$lib/components/stripe/Renderer.svelte';

	export let data;
	let { post, cover } = data;

	function getCoverUrl(cover: any, highresolution: boolean): string {
		if (!cover) {
			return '/home/braunschweig_alte_waage.svg';
		}

		if (cover.ext === '.svg') {
			return je_cms_api_base_url + cover.url;
		} else if (cover.formats?.thumbnail?.url) {
			if (highresolution === true && cover.formats?.large?.url) {
				return je_cms_api_base_url + cover.formats.large.url;
			} else if (cover.formats?.thumbnail?.url) {
				return je_cms_api_base_url + cover.formats.thumbnail.url;
			}
		}

		// Fallback
		return '/home/braunschweig_alte_waage.svg';
	}
</script>

<svelte:head>
	<title>{post.data.title} - {name} ({pronouns})</title>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={$uri.url.href} />
	<meta property="og:title" content={post.data.title} />
	<meta property="og:image" content={getCoverUrl(cover, false)} />
</svelte:head>

<div class="relative min-h-screen flex flex-col">
	<!-- Hintergrundbild -->
	<div
		class="absolute inset-0 -z-50 bg-cover bg-center bg-no-repeat bg-fixed"
		style="background-image: url({getCoverUrl(cover, true)});"
	></div>
	<!-- Schwarzer Overlay -->
	<div class="absolute inset-0 bg-black opacity-55 -z-40"></div>

	<!-- Inhalt: Titel + Content -->
	<div class="container md:pt-30 grow flex flex-col justify-between">
		<!-- Platzhalter notwendig -->
		<div></div>
		<!-- Titel und Datum -->
		<div class="py-5 flex justify-center text-pretty hyphens-auto md:hyphens-none mt-20 md:mt-0">
			<div class="md:max-w-[60%] grid gap-5">
				<h1 class="text-5xl md:text-6xl font-bold text-neutral-600 dark:text-secondary-200 my-2">
					{post.data.title}
				</h1>
				<div class="text-white dark:text-gray-300">
					{FormatDate(post.data.createdAt, 'day')}. {FormatDate(post.data.createdAt, 'monthshort')}
					{FormatDate(post.data.createdAt, 'year')}
				</div>
			</div>
		</div>

		<!-- Blog-Content am unteren Rand -->
		<div class="min-w-[48vw] max-w-[95vw] xl:max-w-[60vw] mx-auto text-pretty bg-white dark:bg-gray-950 shadow-lg rounded-t-xl">
			<div class="p-6 relative">
				<div class="float-left md:float-right max-w-sm mr-8 md:ml-8 md:mr-0 mb-8 md:mb-0 relative">
					{#snippet image_blog(src: any, alt: any, cp_name: any, cp_url: any)}
						<Image
							{src}
							alt={cover.alternativeText}
							classNames="rounded-lg"
							copyright={[{ name: cp_name, url: cp_url }]}
						/>
					{/snippet}
					{#if cover}
						{#if post.data.copyright[0].enabled == true}
							{#if post.data.copyright[0].name && post.data.copyright[0].url}
								{@render image_blog(
									getCoverUrl(cover, true),
									cover.alternativeText,
									post.data.copyright[0].name,
									post.data.copyright[0].url
								)}
							{:else if post.data.copyright[0].name}
								{@render image_blog(
									getCoverUrl(cover, true),
									cover.alternativeText,
									post.data.copyright[0].name,
									''
								)}
							{/if}
						{:else}
							{@render image_blog(getCoverUrl(cover, true), cover.alternativeText, '', '')}
						{/if}
					{:else}
						{@render image_blog('/contact/teaser.svg', `Teaser Bild ${post.data.title}`, '', '')}
					{/if}
				</div>
				<article>
					<Renderer blocks={post.data.blocks} />
				</article>
			</div>
		</div>
	</div>
</div>
