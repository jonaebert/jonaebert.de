<script lang="ts">
	import Hero from '$lib/components/ui/braunschweig2035/Hero.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { je_cms_base_url } from '$lib/store';
	import Image from '$lib/components/ui/Image.svelte';

	// Hier könntest du dynamische Daten laden, z. B. aus Strapi
	const slogan = 'Klimaneutrales Braunschweig - Jetzt handeln!';

	// Themenbereiche (könnten später aus Strapi geladen werden)
	const themenbereiche = [
		{
			titel: 'Energieeffizienz in Gebäuden',
			beschreibung:
				'Ich setze mich für eine Sanierungsoffensive ein, um den Energieverbrauch in öffentlichen und privaten Gebäuden zu reduzieren. Die Stadt Braunschweig soll Eigentümer:innen mit Beratungsangeboten dabei unterstützen, ihre Häuser klimafreundlich zu modernisieren. Die „Grüne Hausnummer” stellt einen zusätzlichen Anreiz für besonders energieeffiziente Gebäude dar.',
			bild: 'Energieeffizienz_in_Gebaeuden_51225f9678.png',
			alt: 'Reihenhaus mit Weinreben an der Außenwand',
			zustaendigkeit: 'rat'
		},
		{
			titel: 'Ausbau erneuerbarer Energien',
			beschreibung:
				'Ich möchte, dass Braunschweig Vorreiter bei der Nutzung von Solar-, Wind- und Geothermie wird. Die Stadt soll Bürgerenergiegenossenschaften unterstützen. Ich setze mich außerdem für mehr Photovoltaikanlagen auf öffentlichen & Dächern ein. Die Akzeptanzabgabe soll zu einem großen Teil den Stadtbezirken zugutekommen, um die Akzeptanz zu erhöhen.',
			bild: 'Ausbau_erneuerbare_Energien_63cd48ea06.png',
			alt: 'Solarpanels auf einer Wiese',
			zustaendigkeit: 'rat'
		},
		{
			titel: 'Nachhaltige Mobilität',
			beschreibung:
				'Ich möchte den Ausbau von Radwegen, den öffentlichen Nahverkehr und von Sharing-Angebote vorantreiben. Ziel ist es, den Autoverkehr zu reduzieren, einen komfortablen und emissionsfreien Verkehr für alle zu ermöglichen. Velorouten sollen die Stadtteile miteinander verbinden und den Umstieg auf das Fahrrad erleichtern. Die vorhandenen Radwege sollen nach dem Braunschweiger Standard saniert und ausgebaut werden, um die Sicherheit zu erhöhen.',
			bild: 'Nachhaltige_Mobilitaet_3541876c82.png',
			alt: 'Fahrradweg in der Stadt',
			zustaendigkeit: 'beides'
		},
		{
			titel: 'Grüne Infrastruktur',
			beschreibung:
				'Mehr Parks, begrünte Dächer und Fassaden sowie urbane Gärten verbessern das Mikroklima und die Lebensqualität. Ich setze mich für eine grüne Stadt ein, die Hitzeinseln reduziert und die Biodiversität fördert. Anhand der guten Umsetzung des Pockets Parks Kannengießerstraße soll die Umsetzung weiterer Pockets Parks in Braunschweig geprüft werden.',
			bild: 'Parkanlage_c7a3e96c2d.png',
			alt: 'Park mit Bäumen, Wiese und einer Bank',
			zustaendigkeit: 'beides'
		}
	];
</script>

<div
	class="font-barlow bg-grashalm text-zinc-900 dark:text-white rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden"
>
	<!-- HERO SECTION -->
	<Hero {slogan} />

	<!-- Themenbereiche -->
	<section class="max-w-6xl mx-auto my-12 px-4 space-y-12">
		{#each themenbereiche as bereich, index}
			<div
				class="flex flex-col md:flex-row gap-8 items-center rounded-xl p-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
				class:md:flex-row-reverse={index % 2 === 1}
			>
				<div>
					<Image
						src={`${je_cms_base_url}/uploads/${bereich.bild}`}
						alt={bereich.alt}
						classNames="rounded-lg object-cover w-full h-64"
					/>
				</div>

				<!-- Text mit Titel + Badge -->
				<div class="w-full md:w-1/2">
					<div class="flex items-center gap-2 mb-4">
						<h2 class="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
							{bereich.titel}
						</h2>
						{#if bereich.zustaendigkeit === 'beides'}
							<span
								class="flex justify-center px-2 py-1 text-xs font-medium bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100 rounded-full"
							>
								Rat & Stadtbezirksrat
							</span>
						{:else if bereich.zustaendigkeit === 'rat'}
							<span
								class="flex justify-center px-2 py-1 text-xs font-medium bg-emerald-200 text-emerald-900 dark:bg-emerald-700 dark:text-emerald-100 rounded-full"
							>
								Rat der Stadt
							</span>
						{:else if bereich.zustaendigkeit === 'stadtbezirksrat'}
							<span
								class="flex justify-center px-2 py-1 text-xs font-medium bg-lime-200 text-lime-900 dark:bg-lime-700 dark:text-lime-100 rounded-full"
							>
								Stadtbezirksrat 322
							</span>
						{/if}
					</div>
					<p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
						{bereich.beschreibung}
					</p>
				</div>
			</div>
		{/each}
	</section>

	<!-- MITMACHEN SECTION -->
	<section id="mitmachen" class="py-20 bg-zinc-50 dark:bg-zinc-900">
		<div class="container mx-auto px-4">
			<div class="text-center mb-12">
				<h2
					class="font-barlow-condensed uppercase text-3xl md:text-4xl text-zinc-900 dark:text-white"
				>
					Machen Sie <span class="text-accent">mit!</span>
				</h2>
				<p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
					Gemeinsam können wir Braunschweig verändern. Hier sind einige Möglichkeiten, wie Sie mich
					dabei unterstützen können.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- Unterstützung 1 -->
				<div
					class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
				>
					<div
						class="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4"
					>
						<Icon name="star" classes="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold mb-3">Wahlkampf unterstützen</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">
						Helfen Sie mit bei Plakataktionen, an Infoständen oder beim digitalen Wahlkampf – jede
						Hilfe zählt!
					</p>
					<a
						href="https://gruene-braunschweig.gruenes-cms.de/startseite-1"
						target="_blank"
						class="text-accent font-medium hover:underline">Mehr erfahren</a
					>
				</div>

				<!-- Unterstützung 2 -->
				<div
					class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
				>
					<div
						class="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4"
					>
						<Icon name="donation" classes="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold mb-3">Spenden</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">
						Finanzielle Unterstützung hilft uns dabei, den Wahlkampf professionell zu führen und
						eine hohe Sichtbarkeit zu erreichen.
					</p>
					<div class="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
						<p class="font-bold">HINWEIS:</p>
						<p>
							Ich selbst nehme keine Spenden an. Wenn Sie unseren Wahlkampf in Braunschweig jedoch
							unterstützen möchten, haben Sie die Möglichkeit, an den Kreisverband von BÜNDNIS
							90/DIE GRÜNEN Braunschweig zu spenden.
						</p>
					</div>
					<a
						href="https://gruene-braunschweig.de"
						target="_blank"
						class="text-accent font-medium hover:underline">Jetzt spenden</a
					>
				</div>

				<!-- Unterstützung 3 -->
				<div
					class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
				>
					<div
						class="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4"
					>
						<Icon name="comment" classes="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold mb-3">Ideen einbringen</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">
						Ihre Meinung ist mir wichtig! Teilen Sie mir Ihre Anliegen und Vorschläge für
						Braunschweig mit.
					</p>
					<a href="/contact" class="text-accent font-medium hover:underline">Kontakt aufnehmen</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ABSCHLUSS CTA -->
	<section class="py-20 bg-accent/10">
		<div class="container mx-auto px-4 text-center">
			<h2 class="text-4xl md:text-5xl font-barlow-condensed uppercase text-tanne mb-6">
				Mach's Grün
			</h2>
			<p class="text-lg text-zinc-700 dark:text-zinc-800 max-w-2xl mx-auto mb-8">
				Jede Stimme zählt! Geben Sie mir Ihre bei der Kommunalwahl 2026 und lassen Sie uns gemeinsam
				etwas bewegen!
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="https://gruene-braunschweig.gruenes-cms.de/kommunalwahl-2026-1"
					target="_blank"
					class="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
				>
					Unser GRÜNES Wahlprogramm
				</a>
				<a
					href="/#events"
					target="_self"
					class="px-6 py-3 border-2 border-tanne text-tanne rounded-lg font-medium hover:bg-accent/10 transition-colors flex items-center"
				>
					Veranstaltungen
				</a>
			</div>
		</div>
	</section>
</div>
