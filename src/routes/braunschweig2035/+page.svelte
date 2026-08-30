<script lang="ts">
	import Hero from '$lib/components/ui/braunschweig2035/Hero.svelte';
	import Blog from '$lib/components/ui/Blog.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';

	export let data;
	const { posts } = data;
</script>

<div
	class="font-barlow bg-grashalm text-zinc-900 dark:text-white rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 overflow-hidden"
>
	<!-- HERO SECTION -->
	<Hero />

	<!-- THEMEN SECTION -->
	<section id="themen" class="py-20 bg-zinc-50 dark:bg-zinc-900">
		<div class="container mx-auto px-4">
			<div class="text-center mb-12">
				<h2
					class="font-barlow-condensed uppercase text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white"
				>
					Wofür ich mich <span class="text-accent">einsetze</span>
				</h2>
				<p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
					Drei zentrale Themen, die unsere Stadt bewegen – und meine Lösungsansätze
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<!-- Thema 1 -->
				<div
					class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
				>
					<div
						class="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4"
					>
						<Icon name="earth" classes="h-6 w-6 stroke-20" />
					</div>
					<h3 class="text-xl font-bold mb-3">Klimaneutrale Stadt</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">
						Bis 2035 soll Braunschweig klimaneutral werden – mit sozialem Ausgleich und innovativen
						Lösungen für die Bereiche Energie, Verkehr und Bauen.
					</p>
					<a href="/braunschweig2035/climate" class="text-accent font-medium hover:underline"
						>Mehr erfahren</a
					>
				</div>

				<!-- Thema 2 -->
				<div
					class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
				>
					<div
						class="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4"
					>
						<Icon name="pin" classes="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold mb-3">Lebenswerte Quartiere</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">
						Entsiegelung vorantreiben, Grünflächen erhalten und lebendige Nachbarschaften für alle
						Generationen fördern. Für eine klimaresiliente Stadt, in der alle gut leben können!
					</p>
					<!--<a href="/wohnraum" class="text-accent font-medium hover:underline">Mehr erfahren</a>-->
				</div>

				<!-- Thema 3 -->
				<div
					class="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
				>
					<div
						class="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4"
					>
						<Icon name="lightning" classes="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold mb-3">Moderne Mobilität</h3>
					<p class="text-zinc-600 dark:text-zinc-400 mb-4">
						Sichere Radwege, ein attraktiver ÖPNV und autofreie Zonen sind wichtig, damit sich alle
						gut und sicher in der Stadt fortbewegen können.
					</p>
					<!--<a href="/mobilitaet" class="text-accent font-medium hover:underline">Mehr erfahren</a>-->
				</div>
			</div>
		</div>
	</section>

	<!-- AKTUELLES SECTION -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<div class="flex justify-between items-center mb-12">
				<div>
					<h2
						class="font-barlow-condensed uppercase text-3xl md:text-4xl text-zinc-900 dark:text-white"
					>
						Aktuelles <span class="text-tanne">zur Wahl</span>
					</h2>
					<p class="mt-2 text-lg text-zinc-600 dark:text-zinc-800">
						Neuigkeiten, Veranstaltungen und meine Positionen zu aktuellen Themen
					</p>
				</div>
			</div>

			{#if posts.length === 0}
				<p class="text-zinc-600 dark:text-zinc-800 text-center">
					Aktuell keine Beiträge zur Kommunalwahl gefunden. <br /> Bitte schauen Sie später noch einmal
					vorbei.
				</p>
			{:else}
				<Blog {posts} limit={4} />
			{/if}

			<div class="text-center mt-12">
				<a
					href="/#posts"
					class="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
				>
					Alle Beiträge anzeigen
				</a>
			</div>
		</div>
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
