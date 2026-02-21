<script lang="ts">
	import { name, address, contact, uri } from '$lib/store';

	const social = [
		{
			label: 'Facebook',
			handle: '@jonaebertbs',
			privacyUrl: 'https://www.facebook.com/privacy/policy/'
		},
		{
			label: 'GitHub',
			handle: '@jonaebert',
			privacyUrl: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement'
		},
		{
			label: 'Instagram',
			handle: '@jonaebertbs',
			privacyUrl: 'https://privacycenter.instagram.com/policy'
		},
		{
			label: 'LinkedIn',
			handle: 'jonaebert',
			privacyUrl: 'https://www.linkedin.com/legal/privacy-policy'
		},
		{
			label: 'Mastodon',
			handle: '@jonaebertbs@mastodon.social',
			privacyUrl: 'https://mastodon.social/privacy-policy'
		},
		{
			label: 'Threads',
			handle: '@jonaebertbs',
			privacyUrl: 'https://privacycenter.instagram.com/policy'
		},
		{
			label: 'TikTok',
			handle: '@jonaebertbs',
			privacyUrl: 'https://www.tiktok.com/legal/page/eea/privacy-policy/en'
		},
		{ label: 'YouTube', handle: '@jonaebert', privacyUrl: 'https://policies.google.com/privacy' }
	];

	const toc = [
		{ id: 'intro', label: 'Einleitung' },
		{ id: 'controller', label: 'Verantwortliche Stelle' },
		{ id: 'rights', label: 'Ihre Rechte (DSGVO)' },
		{ id: 'deletion', label: 'Löschung von Daten' },
		{ id: 'hosting', label: 'Webhosting' },
		{ id: 'cdn', label: 'CDN (Cloudflare)' },
		{ id: 'contact', label: 'Kontaktaufnahme' },
		{ id: 'content-services', label: 'Content-Dienste' },
		{ id: 'social', label: 'Soziale Netzwerke' },
		{ id: 'security', label: 'Sicherheitsmaßnahmen' },
		{ id: 'updates', label: 'Aktualität & Änderungen' }
	];
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={$uri.url.href} />
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
	<!-- Header -->
	<header class="mx-auto max-w-5xl">
		<p class="text-sm tracking-wide text-zinc-600 dark:text-zinc-400">Rechtliches</p>
		<h1 class="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
			Datenschutz
		</h1>
	</header>

	<!-- Layout: TOC + Content -->
	<div
		class="mt-8 grid w-full max-w-5xl mx-auto gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start"
	>
		<!-- TOC -->
		<aside class="lg:sticky lg:top-24 min-w-0">
			<details
				class="w-full min-w-0 rounded-3xl border border-zinc-200/70 bg-white/70 p-4 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 lg:open"
				open
			>
				<summary class="cursor-pointer select-none list-none">
					<div class="flex items-center justify-between gap-3">
						<div>
							<p class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
								Datenschutzerklärung
							</p>
							<p class="mt-0.5 font-semibold text-zinc-950 dark:text-zinc-50">Inhalt</p>
						</div>
					</div>
				</summary>

				<nav class="mt-4">
					<ul class="grid gap-1.5">
						{#each toc as item}
							<li>
								<a
									href={`#${item.id}`}
									class="block rounded-2xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-300 dark:hover:bg-zinc-900/40 break-all"
								>
									<span class="text-accent">#</span>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</details>
		</aside>

		<!-- Content -->
		<div class="grid gap-6 min-w-0">
			<!-- Intro -->
			<section
				id="intro"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<p class="leading-relaxed text-zinc-700 dark:text-zinc-300">
					Mit dieser Datenschutzerklärung möchten wir Sie über Art, Umfang und Zweck der
					Verarbeitung von personenbezogenen Daten (im Folgenden auch nur als „Daten“ bezeichnet)
					aufklären. Personenbezogene Daten sind alle Daten, die einen persönlichen Bezug zu Ihnen
					aufweisen, z. B. Name, Adresse, E-Mail-Adresse oder Ihr Nutzerverhalten. Die
					Datenschutzerklärung gilt für alle von uns vorgenommenen Daten-Verarbeitungsvorgänge
					sowohl im Rahmen unserer Kerntätigkeit als auch für die von uns vorgehaltenen
					Online-Medien.
				</p>
			</section>

			<!-- Controller -->
			<section
				id="controller"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Wer bei uns für die Datenverarbeitung verantwortlich ist
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Verantwortlich für die Datenverarbeitung ist:
				</p>

				<div class="mt-5 rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
					<p class="font-medium text-zinc-950 dark:text-zinc-50">{name}</p>
					<p class="mt-2 text-zinc-700 dark:text-zinc-300">
						{address.street}<br />
						{address.zipcode}
						{address.city}<br />
						{address.country}
					</p>

					<div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
						<a
							class="text-accent underline underline-offset-4 decoration-zinc-300 hover:decoration-current dark:decoration-zinc-700 break-all"
							href={`mailto:${contact.mail}`}
						>
							{contact.mail}
						</a>

						<a
							class="text-accent underline underline-offset-4 decoration-zinc-300 hover:decoration-current dark:decoration-zinc-700 break-all"
							href="/legal/imprint"
						>
							{$uri.url.protocol}//{$uri.url.host}/legal/imprint
						</a>
					</div>
				</div>
			</section>

			<!-- Rights -->
			<section
				id="rights"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<div class="flex items-start justify-between gap-4">
					<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
						Ihre Rechte nach der DSGVO
					</h2>
					<span
						class="hidden sm:inline-flex rounded-full px-3 py-1 text-xs ring-1 ring-inset ring-accent/40 text-accent"
					>
						Betroffenenrechte
					</span>
				</div>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Nach der DSGVO stehen Ihnen die nachfolgend aufgeführten Rechte zu, die Sie jederzeit bei
					dem unter <a href="#controller" class="text-accent underline underline-offset-4"
						>Verantwortliche Stelle</a
					> genannten Verantwortlichen geltend machen können:
				</p>

				<ul class="mt-5 grid gap-3">
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="font-semibold text-zinc-950 dark:text-zinc-50">Recht auf Auskunft</div>
						<div class="mt-1 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht, von uns Auskunft darüber zu verlangen, ob und welche Daten wir
							von Ihnen verarbeiten.
						</div>
					</li>
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="font-semibold text-zinc-950 dark:text-zinc-50">Recht auf Berichtigung</div>
						<div class="mt-1 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung
							unvollständiger Daten zu verlangen.
						</div>
					</li>
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="font-semibold text-zinc-950 dark:text-zinc-50">Recht auf Löschung</div>
						<div class="mt-1 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht, die Löschung Ihrer Daten zu verlangen.
						</div>
					</li>
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="font-semibold text-zinc-950 dark:text-zinc-50">Recht auf Einschränkung</div>
						<div class="mt-1 text-zinc-700 dark:text-zinc-300">
							Sie haben in bestimmten Fällen das Recht zu verlangen, dass wir Ihre Daten nur noch
							eingeschränkt bearbeiten.
						</div>
					</li>
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="font-semibold text-zinc-950 dark:text-zinc-50">
							Recht auf Datenübertragbarkeit
						</div>
						<div class="mt-1 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht zu verlangen, dass wir Ihnen oder einem anderen Verantwortlichen
							Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format übermitteln.
						</div>
					</li>
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="font-semibold text-zinc-950 dark:text-zinc-50">Beschwerderecht</div>
						<div class="mt-1 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Zuständig ist die
							Aufsichtsbehörde Ihres üblichen Aufenthaltsortes, Ihres Arbeitsplatzes oder unseres
							Firmensitzes.
						</div>
					</li>
				</ul>

				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<h3 class="text-base font-semibold text-zinc-950 dark:text-zinc-50">Widerrufsrecht</h3>
						<p class="mt-2 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht, die von Ihnen erteilte Einwilligung zur Datenverarbeitung
							jederzeit zu widerrufen.
						</p>
					</div>

					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<h3 class="text-base font-semibold text-zinc-950 dark:text-zinc-50">
							Widerspruchsrecht
						</h3>
						<p class="mt-2 text-zinc-700 dark:text-zinc-300">
							Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer Daten, die wir auf unser
							berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO stützen, Widerspruch
							einzulegen. Sofern Sie von Ihrem Widerspruchsrecht Gebrauch machen, bitten wir Sie um
							die Darlegung der Gründe.
						</p>
					</div>
				</div>

				<div class="mt-5 rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
					<p class="font-semibold text-zinc-950 dark:text-zinc-50">
						Unabhängig vom vorstehend Gesagten haben Sie jederzeit das Recht, der Verarbeitung Ihrer
						personenbezogenen Daten für Zwecke der Werbung und Datenanalyse zu widersprechen.
					</p>
					<p class="mt-2 text-zinc-700 dark:text-zinc-300">
						Ihren Widerspruch richten Sie bitte an die oben angegebene Kontaktadresse des
						Verantwortlichen.
					</p>
				</div>
			</section>

			<!-- Deletion -->
			<section
				id="deletion"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Wann löschen wir Ihre Daten?
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir löschen Ihre Daten dann, wenn wir diese nicht mehr brauchen oder Sie uns dies
					vorgeben. Das bedeutet, dass – sofern sich aus den einzelnen Datenschutzhinweisen dieser
					Datenschutzerklärung nichts anderes ergibt – wir Ihre Daten löschen,
				</p>

				<ul class="mt-5 grid gap-3">
					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<p class="text-zinc-700 dark:text-zinc-300">
							wenn der Zweck der Datenverarbeitung weggefallen ist und damit die jeweilige
							Rechtsgrundlage nicht mehr besteht, also bspw.
						</p>
						<ul class="mt-3 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
							<li class="mt-1">
								nach Beendigung der zwischen uns bestehenden vertraglichen oder mitgliedschaftlichen
								Beziehungen (Art. 6 Abs. 1 lit. b DSGVO) oder
							</li>
							<li class="mt-1">
								nach Wegfall unseres berechtigten Interesses an der weiteren Verarbeitung oder
								Speicherung Ihrer Daten (Art. 6 Abs. 1 lit. f DSGVO),
							</li>
						</ul>
					</li>

					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<p class="text-zinc-700 dark:text-zinc-300">
							wenn Sie von Ihrem Widerrufsrecht Gebrauch machen und keine anderweitige gesetzliche
							Rechtsgrundlage für die Verarbeitung im Sinne von Art. 6 Abs. 1 lit. b–f DSGVO
							eingreift,
						</p>
					</li>

					<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<p class="text-zinc-700 dark:text-zinc-300">
							wenn Sie von Ihrem Widerspruchsrecht Gebrauch machen und der Löschung keine zwingenden
							schutzwürdigen Gründe entgegenstehen.
						</p>
					</li>
				</ul>

				<p class="mt-5 text-zinc-700 dark:text-zinc-300">
					Sofern wir (bestimmte Teile) Ihrer Daten jedoch noch für andere Zwecke vorhalten müssen,
					weil dies etwa steuerliche Aufbewahrungsfristen (in der Regel 6 Jahre für
					Geschäftskorrespondenz bzw. 10 Jahre für Buchungsbelege) oder die Geltendmachung, Ausübung
					oder Verteidigung von Rechtsansprüchen aus vertraglichen Beziehungen (bis zu vier Jahren)
					erforderlich machen oder die Daten zum Schutz der Rechte einer anderen natürlichen oder
					juristischen Person gebraucht werden, löschen wir (den Teil) Ihrer Daten erst nach Ablauf
					dieser Fristen. Bis zum Ablauf dieser Fristen beschränken wir die Verarbeitung dieser
					Daten jedoch auf diese Zwecke (Erfüllung der Aufbewahrungspflichten).
				</p>
			</section>

			<!-- Hosting -->
			<section
				id="hosting"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Webhosting
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir bedienen uns zum Vorhalten unserer Internetseiten eines Anbieters, auf dessen Server
					unsere Internetseiten gespeichert und für den Abruf im Internet verfügbar gemacht werden
					(Hosting). Die von uns angemieteten Server befinden sich ausschließlich innerhalb
					Deutschlands. Hierbei können von dem Anbieter
				</p>

				<ul class="mt-5 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
					<li>das Datum und die Uhrzeit des Zugriffs auf unsere Internetseite</li>
					<li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
					<li>Zugriffsstatus (HTTP-Status)</li>
					<li>die übertragene Datenmenge</li>
					<li>der Internet-Service-Provider des zugreifenden Systems</li>
					<li>der von Ihnen verwendete Browsertyp und dessen Version</li>
					<li>das von Ihnen verwendete Betriebssystem</li>
					<li>die Internetseite, von welcher Sie ggf. auf unsere Internetseite gelangt sind</li>
					<li>die Seiten bzw. Unterseiten, welche Sie auf unserer Internetseite besuchen</li>
				</ul>

				<p class="mt-5 text-zinc-700 dark:text-zinc-300">
					protokolliert werden. Die vorgenannten Daten werden als Logfiles auf den Servern unseres
					Anbieters gespeichert. Dies ist erforderlich, um die Stabilität und Sicherheit des
					Betriebs unserer Internetseite zu gewährleisten.
				</p>

				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Betroffene Daten
						</div>
						<ul class="mt-2 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
							<li>Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
							<li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
							<li>Kommunikationsdaten (bspw. Geräteinfos, IP-Adresse)</li>
						</ul>
					</div>

					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Einordnung
						</div>
						<p class="mt-2 text-zinc-700 dark:text-zinc-300">
							<strong>Betroffene Personen:</strong> Nutzer unserer Internetpräsenz<br />
							<strong>Verarbeitungszweck:</strong> Ausspielen der Internetseiten, Gewährleistung des
							Betriebs<br />
							<strong>Rechtsgrundlage:</strong> Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
						</p>
					</div>
				</div>

				<div class="mt-6 rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
					<p class="font-semibold text-zinc-950 dark:text-zinc-50">
						Von uns beauftragter Webhoster
					</p>
					<p class="mt-2 text-zinc-700 dark:text-zinc-300">
						<strong>Hetzner Online GmbH</strong><br />
						Industriestr. 25, 91710 Gunzenhausen
					</p>
					<div class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
						<a
							class="text-accent underline underline-offset-4 decoration-zinc-300 hover:decoration-current dark:decoration-zinc-700 break-all"
							href="https://www.hetzner.de/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Internetseite
						</a>
						<a
							class="text-accent underline underline-offset-4 decoration-zinc-300 hover:decoration-current dark:decoration-zinc-700 break-all"
							href="https://www.hetzner.de/rechtliches/datenschutz"
							target="_blank"
							rel="noopener noreferrer"
						>
							Datenschutzerklärung
						</a>
					</div>
				</div>
			</section>

			<!-- CDN -->
			<section
				id="cdn"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Content-Delivery-Network
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir benutzen zum Ausspielen unserer Internetseiten ein Content-Delivery-Network (CDN). Ein
					CDN ist ein Netz regional verteilter und über das Internet verbundener Server.
				</p>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir möchten Sie darauf hinweisen, dass je nach Sitzland des unten genannten
					Diensteanbieters die über den Dienst erfassten Daten außerhalb des Raumes der Europäischen
					Union übertragen und verarbeitet werden können.
				</p>

				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Betroffene Daten
						</div>
						<ul class="mt-2 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
							<li>Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
							<li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
							<li>Kommunikationsdaten (bspw. Geräteinfos, IP-Adresse)</li>
						</ul>
					</div>

					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Einordnung
						</div>
						<p class="mt-2 text-zinc-700 dark:text-zinc-300">
							<strong>Verarbeitungszweck:</strong> Technische Optimierung, Analyse von Fehlern und
							Nutzerverhalten<br />
							<strong>Rechtsgrundlage:</strong> Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
						</p>
					</div>
				</div>

				<div class="mt-6 rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
					<p class="font-semibold text-zinc-950 dark:text-zinc-50">
						Eingesetzter CDN-Dienstleister
					</p>

					<div class="mt-3">
						<p class="font-medium text-zinc-950 dark:text-zinc-50">Cloudflare</p>
						<p class="mt-1 text-zinc-700 dark:text-zinc-300">
							Diensteanbieter: Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, United
							States
						</p>

						<div class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
							<a
								class="text-accent underline underline-offset-4 break-all"
								href="https://www.cloudflare.com/"
								target="_blank"
								rel="noopener noreferrer">Internetseite</a
							>
							<a
								class="text-accent underline underline-offset-4 break-all"
								href="https://www.cloudflare.com/privacypolicy/"
								target="_blank"
								rel="noopener noreferrer">Datenschutzerklärung</a
							>
							<a
								class="text-accent underline underline-offset-4 break-all"
								href="https://blog.cloudflare.com/what-cloudflare-logs/"
								target="_blank"
								rel="noopener noreferrer">Umfang der Datenerfassung</a
							>
						</div>
					</div>
				</div>
			</section>

			<!-- Contact -->
			<section
				id="contact"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Kontaktaufnahme
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Soweit Sie uns über E-Mail, Soziale Medien, Telefon, Fax, Post, unser Kontaktformular oder
					sonstwie ansprechen und uns hierbei personenbezogene Daten wie Ihren Namen, Ihre
					Telefonnummer oder Ihre E-Mail-Adresse zur Verfügung stellen oder weitere Angaben zu Ihrer
					Person oder Ihrem Anliegen machen, verarbeiten wir diese Daten zur Beantwortung Ihrer
					Anfrage.
				</p>

				<!-- Turnstile Hinweis -->
				<div class="mt-5 rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
					<p class="font-semibold text-zinc-950 dark:text-zinc-50">
						Spam-Schutz im Kontaktformular
					</p>

					<p class="mt-2 text-zinc-700 dark:text-zinc-300">
						Zum Schutz vor automatisierten Anfragen (Spam) nutzen wir <strong
							>Cloudflare Turnstile</strong
						>. Turnstile wird beim Aufruf der Kontaktseite geladen und verarbeitet dabei technische
						Informationen (z.&nbsp;B. IP-Adresse, Browser-/Geräteinformationen sowie Zeitstempel),
						um menschliche von automatisierten Anfragen zu unterscheiden und Missbrauch zu
						verhindern.
					</p>

					<p class="mt-3 text-zinc-700 dark:text-zinc-300">
						<strong>Rechtsgrundlage:</strong> Berechtigtes Interesse an der Sicherung unserer Systeme
						und dem Schutz vor Missbrauch/Spam, Art. 6 Abs. 1 lit. f DSGVO.
					</p>

					<p class="mt-3 text-zinc-700 dark:text-zinc-300">
						<strong>Dienstanbieter:</strong> Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107,
						United States
					</p>

					<div class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
						<a
							class="text-accent underline underline-offset-4 decoration-zinc-300 hover:decoration-current dark:decoration-zinc-700 break-all"
							href="https://www.cloudflare.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Internetseite
						</a>
						<a
							class="text-accent underline underline-offset-4 decoration-zinc-300 hover:decoration-current dark:decoration-zinc-700 break-all"
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Datenschutzerklärung
						</a>
					</div>
				</div>

				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Betroffene Daten
						</div>
						<ul class="mt-2 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
							<li>Bestandsdaten (bspw. Namen, Adressen)</li>
							<li>Kontaktdaten (bspw. E-Mail-Adresse, Telefonnummer, Postanschrift)</li>
							<li>Inhaltsdaten (Texte, Fotos, Videos)</li>
							<li>Vertragsdaten (bspw. Vertragsgegenstand, Vertragsdauer)</li>
						</ul>
					</div>

					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Einordnung
						</div>
						<p class="mt-2 text-zinc-700 dark:text-zinc-300">
							<strong>Betroffene Personen:</strong> Interessenten, Kunden, Geschäfts- und
							Vertragspartner<br />
							<strong>Verarbeitungszweck:</strong> Kommunikation, Beantwortung von Kontaktanfragen,
							Büro- und Organisationsverfahren<br />
							<strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO sowie berechtigtes Interesse,
							Art. 6 Abs. 1 lit. f DSGVO
						</p>
					</div>
				</div>

				<div class="mt-6 rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
					<h3 class="text-base font-semibold text-zinc-950 dark:text-zinc-50">
						Angaben zu dem von uns genutzten Drittanbieter
					</h3>
					<p class="mt-2 text-zinc-700 dark:text-zinc-300">
						Das Kontaktformular übermittelt Daten an eine selbstgehostete Instanz von n8n bei
						Hetzner. Die erhaltenen Nachrichten und Daten werden von unserer Seite umgehend nach der
						Bearbeitung gelöscht.
					</p>

					<div class="mt-3">
						<a
							class="text-accent underline underline-offset-4 break-all"
							href="https://www.hetzner.de/rechtliches/datenschutz"
							target="_blank"
							rel="noopener noreferrer"
						>
							Zur Datenschutzerklärung von Hetzner
						</a>
					</div>
				</div>
			</section>

			<!-- Content services -->
			<section
				id="content-services"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Content-Dienste
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir nutzen bestimmte Dienste, um über unsere Internetpräsenz bestimmte Inhalte oder
					Grafiken (Videos, Bilder, Musik, Schriftarten, Kartenmaterial) ausspielen zu können. Dabei
					verarbeiten die von uns eingesetzten Dienste die Ihnen zum Zeitpunkt Ihres Besuchs auf
					unseren Internetseiten zugeordnete IP-Adresse.
				</p>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir weisen darauf hin, dass je nach Sitzland des nachstehend genannten Diensteanbieters
					die nachfolgend näher benannten Daten auf Server außerhalb des Raumes der Europäischen
					Union übertragen und verarbeitet werden können.
				</p>

				<div class="mt-6 grid gap-4">
					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<p class="font-semibold text-zinc-950 dark:text-zinc-50">Strapi</p>
						<p class="mt-2 text-zinc-700 dark:text-zinc-300">
							Für die redaktionelle Verwaltung und Ausspielung von Blogbeiträgen sowie weiteren
							multimedialen Inhalten verwenden wir das Content-Management-System (CMS) von Strapi.
							Es handelt sich um eine selbst betriebene, bei Hetzner (Deutschland) betriebene
							Installation. Eine Übermittlung personenbezogener Daten an Strapi oder Dritte findet
							im Rahmen der CMS-Verwendung nicht statt.
						</p>
					</div>
				</div>
			</section>

			<!-- Social -->
			<section
				id="social"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Unsere Onlinepräsenzen bei sozialen Netzwerken
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir betreiben Onlinepräsenzen innerhalb der nachfolgend aufgelisteten sozialen Netzwerke.
					Besuchen Sie eine dieser Präsenzen, werden durch den jeweiligen Anbieter Daten erhoben und
					verarbeitet.
				</p>

				<ul class="mt-5 grid gap-3 sm:grid-cols-2">
					{#each social as item}
						<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
							<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
								{item.label}
							</div>
							<div class="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{item.handle}</div>
							<div class="mt-4 text-xs">
								<a
									class="text-accent underline underline-offset-4 break-all"
									href={item.privacyUrl}
									target="_blank"
									rel="noopener noreferrer">Zur Datenschutzerklärung von {item.label}</a
								>
							</div>
						</li>
					{/each}
				</ul>
			</section>

			<!-- Security -->
			<section
				id="security"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Sicherheitsmaßnahmen
				</h2>
				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Wir treffen technische und organisatorische Sicherheitsmaßnahmen nach dem Stand der
					Technik, um die Vorschriften der Datenschutzgesetze einzuhalten und Ihre Daten gegen
					unbefugten Zugriff zu schützen.
				</p>
			</section>

			<!-- Updates -->
			<section
				id="updates"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Aktualität und Änderung dieser Datenschutzerklärung
				</h2>

				<p class="mt-4 text-zinc-700 dark:text-zinc-300">
					Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong
						>21. Februar 2026</strong
					>. Aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden,
					diese Datenschutzerklärung anzupassen.
				</p>
			</section>
		</div>
	</div>
</div>
