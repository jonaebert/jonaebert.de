<script lang="ts">
	// Importe
	import '../app.css';
	import Social from '$lib/components/blocks/Social.svelte';
	import Ticker from '$lib/components/blocks/Ticker.svelte';

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
		{ title: 'GRÜNE Braunschweig', href: 'https://gruene-braunschweig.de/' },
		{
			title: 'GRÜNE Ratsfraktion Braunschweig',
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

<header
	class="font-poppins sticky top-0 w-full shadow-md z-40 bg-white text-secondary-600 overflow-hidden"
>
	<nav>
		<div
			class="navbar container flex flex-wrap items-center justify-between mx-auto group"
			aria-pressed="false"
		>
			<div
				class="block absolute top-0 right-0 size-8 md:size-16 bg-sun-600 rounded-full transform translate-x-1/2 -translate-y-1/2 z-30"
			></div>
			<div
				class="hidden green-circle md:block absolute bottom-0 left-0 size-10 md:size-20 bg-secondary-600 rounded-full transform -translate-x-1/2 translate-y-1/2"
			></div>
			<div
				class="block absolute bottom-0 right-0 size-16 md:size-24 bg-grashalm-600 rounded-full transform translate-x-1/2 translate-y-1/2 z-30"
			></div>
			<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<Image
					src={logo}
					alt="Logo von {name}"
					classNames="h-14 md:h-16 duration-500 ease-in-out transition-transform transform translate-x-1 scale-105 hover:scale-110"
				/>
				<!-- <span class="self-center text-2xl font-semibold whitespace-nowrap">Jona Ebert</span> -->
			</a>
			<button
				class="group md:hidden inline-flex w-12 h-12 text-center items-center justify-center rounded-sm transition mr-8"
				aria-pressed="false"
				on:click={toggleMenu}
				type="button"
			>
				<span class="sr-only">Menu</span>
				<svg
					class="w-6 h-6 fill-current pointer-events-none"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						class="origin-center -translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-y-0 group-aria-pressed:rotate-[135deg]"
						y="7"
						width="16"
						height="1.5"
						rx="1"
					></rect>
					<rect
						class="origin-center transition-all duration-300 group-aria-pressed:hidden"
						y="7"
						width="16"
						height="1.5"
						rx="1"
					></rect>
					<rect
						class="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-y-0 group-aria-pressed:-rotate-[135deg]"
						y="7"
						width="16"
						height="1.5"
						rx="1"
					></rect>
				</svg>
			</button>
			<div
				class={isResponsive ? 'w-full md:block md:w-auto' : 'hidden w-full md:block md:w-auto'}
				id="navbar"
			>
				<ul
					class="font-medium text-lg flex flex-col p-4 md:p-0 mt-4 border border-grey-100 rounded-lg bg-grey-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white"
				>
					{#each menuLinks as link}
						<li>
							<a
								href={link.href}
								class={activeRoute === link.href
									? 'font-bold block py-2 px-3 rounded-xs md:bg-transparent md:p-0'
									: 'block py-2 px-3 rounded-xs md:bg-transparent md:p-0'}
								aria-current="page"
								on:click={closeMenu}>{link.title}</a
							>
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
			class="p-3 rounded-full shadow-2xl transition duration-300 hover:scale-110 bg-himmel-600 text-neutral-600 hover:-translate-x-1 hover:-translate-y-1 hover:cursor-grab"
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

	<footer class="z-30 bg-secondary-900">
		<div class="mx-auto max-w-[95vw] xl:max-w-[60vw] p-4 py-6 lg:py-8">
			<div class="md:flex md:justify-around">
				<div class="mb-6 md:mb-0">
					<a
						href="/"
						class="flex items-center transition-transform duration-400 hover:scale-110 -translate-x-4 md:-translate-x-0"
					>
						<Image
							src={logo_small_clear}
							alt="Logo von {name}"
							classNames="h-32 me-3 hidden md:block"
						/>
						<Image src={logo_clear} alt="Logo von {name}" classNames="h-16 me-3 md:hidden block" />
						<!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-poppins">Jona Ebert</span> -->
					</a>
				</div>
				<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 text-balance">
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
						<h2 class="mb-6 text-md font-semibold text-white uppercase font-poppins">
							Rechtliches ⚖️
						</h2>
						<ul class="text-grey-400 font-medium font-montserrat">
							{#each legalLinks as link}
								<li class="mb-4 break-words hyphens-auto hover:text-white">
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
						Basisdesign von <a
							href="https://www.gruene.de"
							class="hover:underline"
							target="_blank">BÜNDNIS 90/DIE GRÜNEN</a
						>.
					</span>
				</div>
				<div class="flex mt-4 sm:justify-center sm:mt-0">
					<Social />
				</div>
			</div>
		</div>
	</footer>
</div>
