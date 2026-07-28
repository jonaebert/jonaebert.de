<script lang="ts">
	import { je_cms_base_url, name, pronouns } from '$lib/store.js';
	import Calendar from '$lib/components/ui/Calendar.svelte';
	import Blog from '$lib/components/ui/Blog.svelte';
	import Slogan from '$lib/components/ui/Slogan.svelte';
	import SocialIcons from '$lib/components/ui/SocialIcons.svelte';
	import BubbleBackground from '$lib/components/ui/BubbleBackground.svelte';
	import Hero from '$lib/components/ui/Hero.svelte';

	export let data;
	const { posts, events } = data;

	// Hero expanded
	let heroExpanded = false;
</script>

<section class="grid grid-cols-1 gap-5 lg:grid-cols-12">
	<!-- HERO -->
	<div
		class="order-1 relative overflow-hidden lg:order-0 lg:col-span-7 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 sm:p-6 lg:p-8 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950"
	>
		<video
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			poster={`${je_cms_base_url}/uploads/Hero_Video_Teaserimage_a9468bcb38.avif`}
			class="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
		>
			<source src={`${je_cms_base_url}/uploads/herovideo_57c323e489.webm`} type="video/webm" />
			<source src={`${je_cms_base_url}/uploads/herovideo_05a2d354f6.mp4`} type="video/mp4" />
			<source src="/home/herovideo.webm" type="video/webm" />
			<source src="/home/herovideo.mp4" type="video/mp4" />
		</video>
		<div
			class="absolute inset-0 z-1 bg-black/15 dark:bg-linear-to-b dark:from-zinc-950/80 dark:via-zinc-950/55 dark:to-zinc-950/85"
		></div>

		<BubbleBackground preset="hero" className="z-2" />

		<div class="relative z-10">
			<!-- Glass Box -->
			<div
				class="w-full max-w-none rounded-2xl p-4 sm:p-5 lg:p-6
				bg-white/60 backdrop-blur-md border border-white/50 shadow-sm
				dark:bg-zinc-950/20 dark:backdrop-blur-sm dark:border-white/10 dark:shadow-none"
			>
				<div
					class="inline-flex scale-105 items-center gap-2 rounded-full px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					<span class="text-zinc-600 dark:text-zinc-400"><Slogan /></span>
				</div>
				<div>
					<h1
						class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
					>
						<span class="text-accent font-bold">{name}</span>
						<span class="text-zinc-700 dark:text-zinc-300">({pronouns})</span>
					</h1>

					<div>
						<h2
							class="mt-4 text-zinc-900 dark:text-zinc-200 text-xl sm:text-2xl font-medium tracking-tight"
						>
							Politik für eine lebenswerte Zukunft in Braunschweig
						</h2>

						<div class:line-clamp-3={!heroExpanded} class:sm:line-clamp-none={true}>
							<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 max-w-2xl leading-relaxed">
								Der Klimawandel ist eine zentrale Herausforderung – auch auf kommunaler Ebene. In
								Braunschweig zeigt er sich konkret: durch steigende Temperaturen, wachsende
								Anforderungen an Infrastruktur und die Frage, wie wir Mobilität, Wohnen und
								Lebensqualität sozial gerecht gestalten.
							</p>

							<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 max-w-2xl leading-relaxed">
								Ich setze mich für eine Kommunalpolitik ein, die ökologische Verantwortung und
								soziale Gerechtigkeit zusammen denkt. Ziel ist eine lebenswerte Stadt mit
								langfristig tragfähigen Lösungen – gemeinsam mit den Menschen vor Ort.
							</p>
						</div>
						<div class="mt-3 sm:hidden">
							<button
								type="button"
								class="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
								on:click={() => (heroExpanded = !heroExpanded)}
								aria-expanded={heroExpanded}
							>
								{heroExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
								<svg
									class={`h-4 w-4 transition-transform ${heroExpanded ? 'rotate-180' : ''}`}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									aria-hidden="true"
								>
									<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</button>
						</div>
					</div>

					<div class="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:gap-3">
						<a
							href="/about"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white hover:scale-105 transition-transform ease-in-out duration-300"
						>
							Über mich
						</a>

						<a
							href="/braunschweig2035"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-magenta text-white hover:scale-105 transition-transform ease-in-out duration-300"
						>
							Braunschweig 2035
						</a>

						<a
							href="/contact"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:scale-105 transition-transform ease-in-out duration-300"
						>
							Kontakt
						</a>
					</div>
				</div>
				<div class="mt-6 w-fit">
					<SocialIcons />
				</div>
			</div>
		</div>
	</div>

	<!-- RIGHT COLUMN: STATUS + PORTRAIT -->
	<Hero {posts} {events} />

	<!-- Calendar Preview -->
	<div id="events" class="order-4 lg:order-0 lg:col-span-6">
		<Calendar {events} limit={7} />
	</div>

	<!-- Blog Preview -->
	<div id="posts" class="order-5 lg:order-0 lg:col-span-6">
		<Blog {posts} limit={6} />
	</div>
</section>
