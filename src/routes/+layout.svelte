<script lang="ts">
	// Importe
	import { onMount } from 'svelte';
	import '../app.css';

	// Import von Layout-Komponenten
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	//Import von Theme Store
	import { applyTheme, getStoredTheme } from '$lib/util/theme';

	// Initialisierung Variablen
	import { name, uri, pronouns, slogan } from '$lib/store';

	// Seiten-Titel dynamisch setzen
	$: activeRoute = $uri.url.pathname;
	$: pageTitle =
		activeRoute === '/'
			? name + ' (' + pronouns + ') - ' + slogan
			: activeRoute === '/about'
				? 'Über mich - ' + name + ' (' + pronouns + ') - ' + slogan
				: activeRoute === '/contact'
					? 'Kontakt - ' + name + ' (' + pronouns + ') - ' + slogan
					: activeRoute === '/legal/privacy'
						? 'Datenschutzerklärung - ' + name + ' (' + pronouns + ') - ' + slogan
						: activeRoute === '/legal/imprint'
							? 'Impressum - ' + name + ' (' + pronouns + ') - ' + slogan
							: name + ' (' + pronouns + ') - ' + slogan;

	// Funktion, um zum Seitenanfang zu scrollen
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	let isVisible = false;
	onMount(() => {
		window.addEventListener('scroll', () => {
			isVisible = window.scrollY > 100;
		});
	});

	// Theme Toggle
	onMount(() => {
		const storedTheme = getStoredTheme();
		applyTheme(storedTheme);

		//Reagiere auf System-Theme Änderungen
		const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
		const handlerTheme = () => {
			if ((document.documentElement.dataset.theme ?? 'system') === 'system') {
				applyTheme('system');
			}
		};
		matchMedia.addEventListener?.('change', handlerTheme);
		return () => matchMedia.removeEventListener?.('change', handlerTheme);
	});

	// Header loading animation
	import { tick } from 'svelte';

	let headerShowLinks: boolean = false;
	let headerVisibleLinks: number = 0;
	let headerLinkWidths: number[] = [];
	let headerContainerEl: HTMLElement;
	let headerMeasured: boolean = false;
	const headerGap: number = 4;
	const headerContainerPaddingPerSide: number = 4;

	onMount(() => {
		setTimeout(() => {
			headerShowLinks = true;
		}, 200);
	});
	$: if (headerShowLinks && headerContainerEl && !headerMeasured) {
		tick().then(() => {
			const items = headerContainerEl.querySelectorAll('.menu-item');
			if (items.length > 0) {
				headerLinkWidths = Array.from(items).map((el) =>
					Math.round(el.getBoundingClientRect().width)
				);

				headerMeasured = true;
			}
		});
	}
	$: if (headerMeasured) {
		headerLinkWidths.forEach((_, i) => {
			setTimeout(() => {
				headerVisibleLinks = i + 1;
			}, i * 400);
		});
	}
	$: headerBgWidth =
		headerLinkWidths.length && headerVisibleLinks > 0
			? headerLinkWidths.slice(0, headerVisibleLinks).reduce((acc, w) => acc + w, 0) +
				Math.max(0, headerVisibleLinks - 1) * headerGap +
				headerContainerPaddingPerSide * 2
			: 0;

	// Header scroll animation
	let headerIsScrolled: boolean = false;

	onMount(() => {
		const update = () => {
			headerIsScrolled = window.scrollY > 100;
		};

		window.addEventListener('scroll', update);
		update();

		return () => window.removeEventListener('scroll', update);
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
	<Header />
	<main class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
		<slot />
	</main>
	<Footer />
</div>
