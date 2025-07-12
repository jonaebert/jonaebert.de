<script lang="ts">
	import { name, je_cms_api_base_url } from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import * as ph from '@prismicio/helpers';
	import { SliceZone } from '@prismicio/svelte';
	import Image from '$lib/components/image.svelte';

	import Paragraph from '$lib/components/prismic/paragraph.svelte';
	import Image_Blog from '$lib/components/prismic/image.svelte';
	import Heading from '$lib/components/prismic/heading.svelte';
	import Lists from '$lib/components/prismic/lists.svelte';
	import Embed from '$lib/components/prismic/embed.svelte';
	import Code from '$lib/components/prismic/code.svelte';
	import { text } from '@sveltejs/kit';
	import { faPhabricator } from '@fortawesome/free-brands-svg-icons';

	export let data;
	let { post } = data;

	const components = {
		paragraph: Paragraph,
		image: Image_Blog,
		heading1: Heading,
		heading2: Heading,
		heading3: Heading,
		heading4: Heading,
		heading5: Heading,
		heading6: Heading,
		'list-item': Lists,
		'o-list-item': Lists,
		embed: Embed,
		preformatted: Code
	};

	function teaserImage() {
		let image: string = '/home/teaser.webp';
		if (post.data.cover) {
			image = post.data.cover.formats.large.url;
			image = je_cms_api_base_url + image;
			return image;
		}
	}
</script>

<svelte:head>
	<title>{post.data.title} - {name}</title>
	<meta name="robots" content="index,follow" />
	<meta property="og:title" content={post.data.title} />
	<meta property="og:image" content={teaserImage()} />
</svelte:head>

<div class="relative min-h-[80vh] flex flex-col">
	<!-- Hintergrundbild -->
	<div
		class="absolute inset-0 -z-50 bg-cover bg-center bg-no-repeat bg-fixed"
		style="background-image: url({teaserImage()});"
	></div>
	<!-- Schwarzer Overlay -->
	<div class="absolute inset-0 bg-black opacity-55 -z-40"></div>

	<!-- Inhalt: Titel + Content -->
	<div class="container flex-grow flex flex-col justify-between">
		<!-- Platzhalter -->
		<div></div>
		<!-- Titel und Datum -->
		<div class="py-5 flex justify-center text-pretty">
			<div class="md:max-w-[60%] grid gap-5">
				<h1 class="text-5xl md:text-6xl font-bold text-neutral-600 italic my-2">
					{post.data.title}
				</h1>
				<div class="font-montserrat text-white">
					{FormatDate(post.data.publishedAt, 'day')}. {FormatDate(
						post.data.publishedAt,
						'monthshort'
					)}
					{FormatDate(post.data.publishedAt, 'year')}
				</div>
			</div>
		</div>

		<!-- Blog-Content am unteren Rand -->
		<div class="text-pretty bg-white shadow-lg rounded-t-xl">
			<div class="p-6 relative">
				<div class="float-right max-w-95 ml-8 mb-8 relative">
					{#if post.data.teaser_image[0] != undefined}
						<Image
							src={ph.asImageSrc(post.data.teaser_image[0].image)}
							alt={ph.asText(post.data.title)}
							classNames="float-right w-96 ml-8 mb-8 rounded-lg"
							copyright={[{ name: post.data.teaser_image[0].copyright, url: '' }]}
						/>
					{:else}
						<Image
							src={ph.asImageSrc(post.data.teaser_image[0].image)}
							alt={ph.asText(post.data.title)}
							classNames="float-right w-96 ml-8 mb-8 rounded-lg"
							copyright={[{ name: '', url: '' }]}
						/>
					{/if}
				</div>
				<article>
					<SliceZone slices={post.data.body} {components} />
				</article>
			</div>
		</div>
	</div>
</div>
