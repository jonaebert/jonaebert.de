<script lang="ts">
	// Importe
	import { onMount } from 'svelte';
	import '../app.css';
	import Social from '$lib/components/blocks/Social.svelte';
	import Ticker from '$lib/components/blocks/Ticker.svelte';

	// Initialisierung Variabeln
	import {
		name,
		logo_clear,
		logo_small_clear,
		logo,
		uri,
		pronouns,
		job,
		slogan,
		logo_small
	} from '$lib/store';
	import Image from '$lib/components/image.svelte';
	let isResponsive = false;
	let currentYear = new Date().getFullYear();

	// Ticker data
	export let data;
	const { tickers } = data;

	// Links
	let menuLinks = [
		{ title: 'Home', href: '/' },
		{ title: 'Über mich', href: '/about' },
		{ title: 'Kontakt', href: '/contact' }
	];
	let legalLinks = [
		{ title: 'Impressum', href: '/legal/imprint' },
		{ title: 'Datenschutzerklärung', href: '/legal/privacy' },
		{ title: 'Barriere melden', href: '/contact?barrier=true' }
	];
	let footerLinks = [
		{ title: 'GRÜNE Braunschweig', href: 'https://gruene-braunschweig.de/' },
		{
			title: 'GRÜNE Ratsfraktion Braunschweig',
			href: 'https://gruene-braunschweig-ratsfraktion.de/'
		},
		{ title: 'GRÜNE JUGEND Braunschweig', href: 'https://gj-braunschweig.de/' }
	];

	// Reactive statement, das auf Änderungen der aktuellen Route reagiert
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

	// Funktion zum Umschalten des responsiven Headers
	function toggleMenu(event) {
		isResponsive = !isResponsive;
		const button = event.currentTarget;
		button.setAttribute('aria-pressed', !(button.getAttribute('aria-pressed') === 'true'));
		const greenCircle = document.querySelector('.green-circle');
		const navBar = document.querySelector('.navbar');
		if (button.getAttribute('aria-pressed') === 'true') {
			greenCircle.classList.remove('hidden');
			navBar.classList.add('pb-4');
			window.addEventListener('click', handleClickOutside);
		} else {
			greenCircle.classList.add('hidden');
			navBar.classList.remove('pb-4');
			window.removeEventListener('click', handleClickOutside);
			console.error('Closing Menu');
		}
	}
	// Funktion zum Einklappen des Menüs nach der Navigation
	function closeMenu() {
		isResponsive = false;
		const button = document.querySelector('button[aria-pressed="true"]');
		const greenCircle = document.querySelector('.green-circle');
		const navBar = document.querySelector('.navbar');
		if (button) {
			button.setAttribute('aria-pressed', 'false');
		}
		greenCircle.classList.add('hidden');
		navBar.classList.remove('pb-4');
	}

	// Funktion zum Schließen des Menüs bei Klick außerhalb des Headers
	function handleClickOutside(event) {
		const header = document.querySelector('header');
		if (!header.contains(event.target)) {
			closeMenu();
		}
	}

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
	import ThemeSwitch from '$lib/components/blocks/ThemeSwitch.svelte';
	let isDarkMode: boolean = false;

	onMount(() => {
	    const saved = localStorage.getItem('theme');
    	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    	isDarkMode = saved === 'dark' || (!saved && prefersDark);
    	updateHtmlClass();
	});
	
	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		updateHtmlClass();
	}
	
	function updateHtmlClass() {
		if (typeof document === 'undefined') return; // SSR-Schutz
		if (isDarkMode) {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
			localStorage.setItem('theme', 'light');
		}
	}

	// Header loading animation
	import { tick } from 'svelte';
	import type { NumericRange } from '@sveltejs/kit';

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
				headerLinkWidths = Array.from(items).map(el =>
				Math.round(el.getBoundingClientRect().width)
			);

			headerMeasured = true;
		}});
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
	let headerisScrolled: boolean = false;
	
	onMount(() => {
		const update = () => {
			headerisScrolled = window.scrollY > 100;
		};

		window.addEventListener('scroll', update);
		update();

		return () => window.removeEventListener('scroll', update);
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<header
	class="fixed left-1/2 -translate-x-1/2 transition-all duration-300 ease-out mx-auto w-fit z-40"
	class:top-8={!headerisScrolled}
	class:top-2={headerisScrolled}
>
	<div class="items-center flex">
		<div
			class="relative w-12 h-fit rounded-full p-1 bg-primary-600 dark:bg-secondary-800 duration-500 ease-in-out transition-transform transform hover:scale-110"
		>
			<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<Image
					src={logo_small_clear}
					alt="Logo von {name}"
					classNames="h-full w-full rounded-full cover object-center"
				/>
			</a>
		</div>
		<div class="relative flex items-center ml-3">
			<div class="relative flex gap-1 p-1" bind:this={headerContainerEl}>
				{#if headerShowLinks && headerMeasured}
					<div
						class="absolute top-0 left-0 h-full rounded-full bg-primary-600 dark:bg-secondary-800 transition-all duration-400"
						style="width: {headerBgWidth}px;"
					></div>
				{/if}
				{#if headerShowLinks}	
					{#each menuLinks as link, i}
						<button
							class="menu-item font-semibold {activeRoute === link.href
								? 'bg-none'
								: 'bg-secondary-700'} hover:bg-secondary-none opacity-0 transform animate-slide-in shrink-0 rounded-full hover:scale-105 transition-transform duration-500 ease-in-out"
							style="animation-delay: {i * 400}ms"
							on:animationstart={() => (headerVisibleLinks = Math.max(headerVisibleLinks, i + 1))}
						>
							<a href={link.href} target="_self" class="px-3 py-1 inline-block">{link.title}</a>
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</header>

<div class="z-30">
	{#each tickers.data as ticker}
		<Ticker
			eventName={ticker.text}
			eventStartDate={new Date(ticker.startAt)}
			eventEndDate={new Date(ticker.endAt)}
			preWord={ticker.preWord}
			nowWord={ticker.nowWord}
		/>
	{/each}
</div>

<div class="flex flex-col grow min-h-screen bg-white dark:bg-grey-950 relative">
	<main class="grow z-20">
		<slot />
	</main>
</div>

<div class="fixed z-50">
	{#if isVisible}
		<button
			on:click={scrollToTop}
			class="fixed bottom-14 md:bottom-18.5 right-4 p-3 rounded-full shadow-2xl transition duration-300 hover:scale-115 bg-himmel-600 text-white cursor-pointer"
			aria-label="Scroll to top"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7" />
			</svg>
		</button>
	{/if}
	<div class="fixed bottom-4 right-4">
		<ThemeSwitch {isDarkMode} {toggleDarkMode} />
	</div>
</div>

<footer class="z-30 bg-secondary-900">
	<div class="mx-auto max-w-[95vw] xl:max-w-[60vw] p-4 py-6 lg:py-8">
		<div
			class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 headerGap-8 sm:headerGap-6 text-balance"
		>
			<div class="mb-6 md:mb-0 flex items-center">
				<a
					href="/"
					class="transition-transform duration-400 hover:scale-110 -translate-x-4 md:translate-x-0"
				>
					<Image
						src={logo_clear}
						alt="Logo von {name}"
						classNames="w-fit max-w-54 h-full me-3 hidden lg:block"
					/>
					<Image
						src={logo_small_clear}
						alt="Logo von {name}"
						classNames="w-fit max-w-42 h-full me-3 block lg:hidden"
					/>
				</a>
			</div>
				<div>
					<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">{name}</h2>
					<ul class="text-grey-400 font-medium font-montserrat">
						{#each menuLinks as link}
							<li class="mb-4 hover:text-white">
								<a href={link.href} class="hover:underline">{link.title}</a>
							</li>
						{/each}
					</ul>
				</div>
				<div>
				<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">Rechtliches ⚖️</h2>
					<ul class="text-grey-400 font-medium font-montserrat">
						{#each legalLinks as link}
							<li class="mb-4 wrap-break-words hyphens-auto hover:text-white">
								<a href={link.href} class="hover:underline">{link.title}</a>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">
						Schau mal hier vorbei 👀
					</h2>
					<ul class="text-grey-400 font-medium font-montserrat">
						{#each footerLinks as link}
							<li class="mb-4 hover:text-white">
								<a href={link.href} target="_blank" class="hover:underline">{link.title}</a>
							</li>
						{/each}
					</ul>
				</div>
		</div>
		<hr class="my-6 border-grey-700 sm:mx-auto lg:my-8" />
		<div class="sm:flex sm:items-center sm:justify-between">
			<div class="grid grid-rows-[auto] grid-cols-1 justify-items-start">
				<span class="text-sm text-grey-400 sm:text-center">
					&copy; 2023 - {currentYear} <a href="/" class="hover:underline">{name}</a>. Alle Rechte
					vorbehalten.
				</span>
				<span class="text-sm text-grey-400 sm:text-center">
					<br />
				</span>
				<span class="text-sm text-grey-400 sm:text-center">
					Erstellt mit <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a> und
					<a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
					gehostet von <a href="https://www.hetzner.com/de/" target="_blank">Hetzner</a> mit
					<a href="https://coolify.io/" target="_blank">Coolify</a>.
				</span>
				<span class="text-sm text-grey-400 sm:text-center">
					Basisdesign von <a href="https://www.gruene.de" class="hover:underline" target="_blank"
						>BÜNDNIS 90/DIE GRÜNEN</a
					>.
				</span>
			</div>
			<div class="flex mt-4 sm:justify-center sm:mt-0">
				<Social />
			</div>
		</div>
	</div>
</footer>

<style>
	@keyframes slide-in {
		from {
			transform: translateX(-24px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	.animate-slide-in {
		animation: slide-in 0.4s ease-out forwards;
	}
</style>
