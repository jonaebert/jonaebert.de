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
			: activeRoute === '/braunschweig2035'
				? 'Kommunalwahl 2026 – Braunschweig 2035 – ' + name + ' (' + pronouns + ') - ' + slogan
				: activeRoute === '/about'
					? 'Über mich - ' + name + ' (' + pronouns + ') - ' + slogan
					: activeRoute === '/contact'
						? 'Kontakt - ' + name + ' (' + pronouns + ') - ' + slogan
						: activeRoute === '/legal/privacy'
							? 'Datenschutzerklärung - ' + name + ' (' + pronouns + ') - ' + slogan
							: activeRoute === '/legal/imprint'
								? 'Impressum - ' + name + ' (' + pronouns + ') - ' + slogan
								: name + ' (' + pronouns + ') - ' + slogan;
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
