<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { name, uri } from '$lib/store';
	import BlogTiles from '$lib/components/tiles/Blog.svelte';
	import CalendarTiles from '$lib/components/tiles/Calendar.svelte';
	import Social from '$lib/components/blocks/Social.svelte';
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';
	import Slogan from '$lib/components/blocks/Slogan.svelte';

	// Blog data
	export let data;
	const { posts, events } = data;
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href="{$uri.url.href}">
</svelte:head>

<div class="flex flex-col container items-center justify-center min-h-[100vh] relative z-10 p-30">
	<div class="absolute inset-0 bg-black opacity-55 z-10"></div>
	<video autoplay muted loop playsinline preload="auto" poster="https://cms.jonaebert.de/uploads/thumbnail_Hero_Video_Teaserimage_704af3dfc7.png" class="absolute z-9 inset-0 w-full h-full object-cover">
		<source src="/home/herovideo.mp4" type="video/mp4"/>
	</video>
	<div class="grid grid-cols-1 xl:grid-cols-2 grid-rows-1 w-full place-items-start z-30">
		<div class="flex flex-col space-y-6 mb-0 md:mb-15 row-start-1 col-start-1 lg:row-start-1 lg:col-start-1">
			<div class="relative grid grid-rows-[auto,auto,auto] place-items-start pt-0 md:pt-[10vh]">
				<div class="row-start-1 font-montserrat mt-6 md:mt-0">
					<Slogan />
				</div>
				<div class="row-start-2 text-3xl xl:text-5xl font-bold text-primary-600 md:mb-6 font-poppins">
					<h1>{name}</h1>
				</div>
				<div class="row-start-3">
					<Social />
				</div>
			</div>
		</div>
		<div class="flex justify-start row-start-2 col-start-1 lg:row-start-1 lg:col-start-2">
			<div class="relative w-xs md:w-md">
				<a href="/about" target="_self">
					<Image src="https://cms.jonaebert.de/uploads/small_Portrait_1000x1000_Cutout_7b47e25bf6.png" alt="Portrait {name}" classNames="w-full h-full hover:scale-105 duration-500 ease-in-out transform"/>
				</a>
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto px-4 py-12 max-w-(--breakpoint-xl)">
	<div class="text-left font-poppins">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-400 italic my-2 pb-7">Aktuelles</h2>
	</div>
	{#if posts.data[0]}
		<BlogTiles items={posts.data} />
	{:else}
		<div class="flex text-center font-montserrat justify-start">
			<InfoMessage message="Es konnten aktuell keine Beiträge gefunden werden!"></InfoMessage>
		</div>
	{/if}
</div>

<div class="relative bg-[url('https://cms.jonaebert.de/uploads/medium_See_and_Wald_Hintergrund_b3d10959ff.png')] md:bg-fixed bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center">
	<div class="absolute inset-0 bg-black opacity-55"></div>
	<div class="container relative py-7 text-start text-balance text-white dark:text-grey-300">
		<h2 class="text-3xl md:text-4xl font-bold italic my-2">
			Politik für eine lebenswerte Welt
		</h2>
		<div class="font-montserrat text-lg grid gap-4">
			<div>
				Unser Klima verändert sich rasant und mit jedem Kilogramm CO₂ mehr wird dieser Planet zu
				einem lebensfeindlichen Ort. Wir steuern bereits auf eine Klimakatastrophe zu, die bald
				unvermeidlich sein wird. Wir stellen fest, dass unsere Sommer immer wärmer und unsere Winter
				immer milder werden. Wir feiern jedes Jahr einen neuen Temperaturrekord. Ein Umdenken in der
				Politik und Wirtschaft geht nur sehr langsam voran.
			</div>
			<div>
				Das Klima wird von vielen Menschen ignoriert, geleugnet und nicht geglaubt. Eine so große
				Ignoranz gegenüber der Klimakatastrophe können und dürfen wir uns nicht leisten. Diese Krise
				wird unsere Lebensgrundlagen zerstören. Wir als Menschheit und wir als Individuen müssen
				alle gemeinsam gegen diese lebenszerstörende Krise arbeiten und nicht gegeneinander.
			</div>
			<div>
				Es muss schnellstmöglich ein Umdenken in der Politik stattfinden und es müssen wirksame
				Lösungen in Richtung einer klimagerechten Welt erarbeitet werden, die alle Menschen
				einbezieht und die Lebensgrundlagen bewahrt. Eine Ausbeutung unseres Planeten darf nicht
				fortgesetzt werden!
			</div>
			<div>Mit diesen Worten stehe ich für eine besser und klimagerechte Welt!</div>
		</div>
	</div>
</div>

<div class="container mx-auto px-4 py-12 max-w-(--breakpoint-xl)">
	<div class="text-left font-poppins">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-400 italic my-2">Termine</h2>
		<h3 class="text-2xl md:text-3xl font-semibold text-black dark:text-grey-300 italic my-2 pb-10">
			Hier kannst du mich treffen!
		</h3>
	</div>
	{#if events[0]}
		<CalendarTiles items={events}></CalendarTiles>
	{:else}
		<div class="flex text-center font-montserrat justify-start">
			<InfoMessage message="Es konnten aktuell keine Veranstaltungen gefunden werden!"
			></InfoMessage>
		</div>
	{/if}
</div>

<div class="relative bg-[url('https://cms.jonaebert.de/uploads/medium_Braunschweig_Alte_Waage_ced5cdd56e.png')] md:bg-fixed bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center">
	<div class="absolute inset-0 bg-black opacity-55"></div>
	<div class="container relative py-7 text-start text-balance text-white dark:text-grey-300">
		<h2 class="text-3xl md:text-4xl font-bold italic my-2">Politik in Braunschweig</h2>
		<div class="font-montserrat text-lg grid gap-4">
			<div>
				Im Jahr 2021 zog ich in einer schwierigen Zeit nach Braunschweig. Ich war sehr aufgeregt,
				denn ich hatte gehört, dass diese Stadt eine ganz besondere Atmosphäre hat. Doch das schöne
				Braunschweig mit seinen historischen Sehenswürdigkeiten wie dem beeindruckenden
				Braunschweiger Dom und dem malerischen Magniviertel hat mich von den ersten Tagen an mit
				offenen Armen empfangen und begeistert.
			</div>
			<div>
				Im Jahr 2022 war ich sehr glücklich, Teil der Grünen Partei zu werden und meine politischen
				Interessen zu vertiefen und mich für meine Überzeugungen zu engagieren. Die Arbeit mit den
				Grünen hat mir die wunderbare Möglichkeit gegeben, aktiv an der Gestaltung unserer Stadt
				mitzuwirken und mich für Projekte einzusetzen, die mir sehr am Herzen liegen. Im April 2023
				habe ich dann die Letzte Generation kennengelernt und durfte dort eine Weile mitwirken. Das
				hat mir ganz neue Perspektiven eröffnet, auch was den Klimaschutz und den zivilen Ungehorsam
				betrifft.
			</div>
			<div>
				Diese Erfahrungen haben mich dazu inspiriert, mich noch intensiver für Braunschweig
				einzusetzen. Es ist mir eine große Freude, derzeit die AG Digitales zu koordinieren und mich
				so leidenschaftlich für unser schönes Braunschweig einzusetzen. Mein Ziel ist es, ein
				buntes, offenes und lebendiges Braunschweig zu fördern und zu unterstützen. Die Vielfalt und
				Geschichte dieser Stadt, von den mittelalterlichen Weichbilden bis hin zur modernen
				Architektur des Happy RIZZI House, inspiriert mich täglich.
			</div>
		</div>
	</div>
</div>
