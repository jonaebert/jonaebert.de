<script lang="ts">
	// Importe
	import '../app.css';
	import Social from '$lib/components/blocks/Social.svelte';
	import Ticker from '$lib/components/blocks/Ticker.svelte';

	//Vercel Speed Insights
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	// Vercel Analytics
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	// Initialisierung Variabeln
	import { name, logo_clear, logo_small_clear, logo, uri, pronouns, job } from '$lib/store';
	import Image from '$lib/components/image.svelte';
	let isResponsive = false;
	let currentYear = new Date().getFullYear();

	// Links
	let menuLinks = [
		{ title: 'Home', href: '/' },
		{ title: 'Über mich', href: '/about' },
		{ title: 'Kontakt', href: '/contact' }
	];
	let legalLinks = [
		{ title: 'Impressum', href: '/legal/imprint' },
		{ title: 'Datenschutzerklärung', href: '/legal/privacy' }
	];
	let footerLinks = [
		{ title: "DIE GRÜNEN Braunschweig", href: 'https://gruene-braunschweig.de/' },
		{
			title: 'Grüne Ratsfraktion Braunschweig',
			href: 'https://gruene-braunschweig-ratsfraktion.de/'
		}
	];

	// Reactive statement, das auf Änderungen der aktuellen Route reagiert
	$: activeRoute = $uri.url.pathname;
	$: pageTitle =
		activeRoute === '/'
			? name + ' (' + pronouns + ') - ' + job
			: activeRoute === '/about'
				? 'Über mich - ' + name + ' (' + pronouns + ') - ' + job
				: activeRoute === '/contact'
					? 'Kontakt - ' + name + ' (' + pronouns + ') - ' + job
					: activeRoute === '/legal/privacy'
						? 'Datenschutzerklärung - ' + name + ' (' + pronouns + ') - ' + job
						: activeRoute === '/legal/imprint'
							? 'Impressum - ' + name + ' (' + pronouns + ') - ' + job
							: name + ' (' + pronouns + ') - ' + job;

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
			addMenuEventListeners();
		} else {
			greenCircle.classList.add('hidden');
			navBar.classList.remove('pb-4');
			removeMenuEventListeners();
			console.error("Closing Menu");
		}
	}
	// Funktion zum Einklappen des Menüs nach der Navigation
	function closeMenu(event) {
		isResponsive = false;
		const button = document.querySelector('button[aria-pressed="true"]');
		const greenCircle = document.querySelector('.green-circle');
		const navBar = document.querySelector('.navbar');
		if (button) {
			button.setAttribute('aria-pressed', 'false');
		}
		greenCircle.classList.add('hidden');
		navBar.classList.remove('pb-4');
		removeMenuEventListeners();
	}

	// Funktion zum Schließen des Menüs bei Klick außerhalb des Headers
	function handleClickOutside(event) {
		const header = document.querySelector('header');
		if (!header.contains(event.target)) {
			closeMenu("");
		}
	}

	// Funktion zum Hinzufügen der Event-Listener für das Menü
	function addMenuEventListeners() {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('click', handleClickOutside);
	}
	// Funktion zum Entfernen der Event-Listener für das Menü
	function removeMenuEventListeners() {
		window.removeEventListener('scroll', handleScroll);
		window.removeEventListener('click', handleClickOutside);
	}

	// Funktion zum Behandeln des Scroll-Events
	function handleScroll() {
		closeMenu();
	}

	// Funktion, um zum Seitenanfang zu scrollen
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	import { onMount } from 'svelte';
	let isVisible = false;
	onMount(() => {
		window.addEventListener('scroll', () => {
			isVisible = window.scrollY > 100;
		});
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<header class="font-poppins sticky top-0 w-full shadow-md z-40 bg-white text-je-tanne container overflow-hidden">
	<nav>
		<div class="max-w-(--breakpoint-xl) navbar flex flex-wrap items-center justify-between mx-auto p-0 group" aria-pressed="false">
			<div class="block absolute top-0 right-0 size-8 md:size-16 bg-je-magical-korallenriff rounded-full transform translate-x-1/2 -translate-y-1/2 z-30"></div>
			<div class="hidden green-circle md:block absolute bottom-0 left-0 size-10 md:size-20 bg-je-mystical-waldtiefe-700 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
			<div class="block absolute bottom-0 right-0 size-16 md:size-24 bg-je-magical-sonnenglanz rounded-full transform translate-x-1/2 translate-y-1/2 z-30"></div>
			<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<Image src={logo} alt="Logo von {name}" classNames="h-14 md:h-16 duration-500 ease-in-out transition-transform transform translate-x-1 scale-105 hover:scale-110" />
				<!-- <span class="self-center text-2xl font-semibold whitespace-nowrap">Jona Ebert</span> -->
			</a>
			<button class="group md:hidden inline-flex w-12 h-12 text-center items-center justify-center rounded-sm transition mr-3" aria-pressed="false" on:click={toggleMenu} type="button">
				<span class="sr-only">Menu</span>
				<svg class="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<rect class="origin-center -translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-y-0 group-aria-pressed:rotate-[135deg]" y="7" width="16" height="1.5" rx="1"></rect>
					<rect class="origin-center transition-all duration-300 group-aria-pressed:hidden" y="7" width="16" height="1.5" rx="1"></rect>
					<rect class="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-y-0 group-aria-pressed:-rotate-[135deg]" y="7" width="16" height="1.5" rx="1"></rect>
				</svg>
			</button>
			<div class={isResponsive ? "w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"} id="navbar">
				<ul class="font-medium text-lg flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
					{#each menuLinks as link}
						<li>
							<a href={link.href} class={activeRoute === link.href
								? 'font-bold block py-2 px-3 rounded-xs md:bg-transparent md:p-0'
								: 'block py-2 px-3 rounded-xs md:bg-transparent md:p-0'} aria-current="page" on:click={closeMenu}>{link.title}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</nav>
</header>

<div class="z-30">
	<Ticker />
</div>

{#if isVisible}
	<div class="z-50 fixed bottom-4 right-4">
		<button
			on:click={scrollToTop}
			class="p-3 rounded-full shadow-2xl transition duration-300 hover:scale-110 bg-je-mystical-schwarzgruen-500 text-je-magical-fata_morgana hover:bg-je-mystical-schwarzgruen-800 hover:text-je-magical-sonnenglanz"
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
	</div>
{/if}

<div class="flex flex-col grow min-h-screen bg-white relative">
	<main class="grow z-20">
		<slot />
	</main>

	<footer class="z-30 bg-je-secondary-900">
		<div class="mx-auto w-full max-w-(--breakpoint-xl) p-4 py-6 lg:py-8">
			<div class="md:flex md:justify-around">
				<div class="mb-6 md:mb-0">
					<a href="/" class="flex items-center transition-transform duration-400 hover:scale-110 -translate-x-4 md:-translate-x-0">
						<Image
							src={logo_small_clear}
							alt="Logo von {name}"
							classNames="h-32 me-3 hidden md:block"
						/>
						<Image
							src={logo_clear}
							alt="Logo von {name}"
							classNames="h-16 me-3 md:hidden block"
						/>
						<!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-poppins">Jona Ebert</span> -->
					</a>
				</div>
				<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 text-balance">
					<div>
						<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">{name}</h2>
						<ul class="text-gray-400 font-medium font-montserrat">
							{#each menuLinks as link}
								<li class="mb-4 hover:text-white">
									<a href={link.href} class="hover:underline">{link.title}</a>
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">Rechtliches ⚖️</h2>
						<ul class="text-gray-400 font-medium font-montserrat">
							{#each legalLinks as link}
								<li class="mb-4 break-words hyphens-auto hover:text-white">
									<a href={link.href} class="hover:underline">{link.title}</a>
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">Schau mal hier vorbei 👀</h2>
						<ul class="text-gray-400 font-medium font-montserrat">
							{#each footerLinks as link}
								<li class="mb-4 hover:text-white">
									<a href={link.href} target="_blank" class="hover:underline">{link.title}</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
			<hr class="my-6 border-gray-700 sm:mx-auto lg:my-8" />
			<div class="sm:flex sm:items-center sm:justify-between">
				<span class="text-sm text-gray-400 sm:text-center">
					&copy; 2023 - {currentYear} <a href="/" class="hover:underline">{name}</a>. Alle Rechte vorbehalten.
				</span>
				<div class="flex mt-4 sm:justify-center sm:mt-0">
					<Social />
				</div>
			</div>
		</div>
	</footer>
</div>
