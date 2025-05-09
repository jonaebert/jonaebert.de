<!-- <script lang="ts">
	import { contextMenuAction, uri } from '$lib/store';
	import imageLoader from '$lib/util/imageLoader';

	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
</script>

<img {src} {alt} class={classNames} use:contextMenuAction /> -->

<script lang="ts">
	import { contextMenuAction, uri } from '$lib/store';
	import imageLoader from '$lib/util/imageLoader';

	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
	export let classes: string = '';

	if (classes) {
		classes = classes;
	} else if (classNames) {
		classes = classNames;
	}

	// Bildoptimierung konfigurieren
	let optimizedSrc: string;

	// `optimizedSrc` vorbereiten, sobald sich `src` ändert
	$: optimizedSrc = imageLoader({
		uri: $uri,
		src,
		width: 1500,
		quality: 75 // Optional
	});
	console.log(optimizedSrc);
</script>

<img src={optimizedSrc} {alt} class={classes} use:contextMenuAction />
