<script lang="ts">
	import { name, address, contact, uri } from '$lib/store';
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href="{$uri.url.href}">
</svelte:head>

<div class="container py-12 grid gap-5 text-black dark:text-grey-400">
	<h1 class="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-600 my-2">Datenschutz</h1>
	<div class="text-balance font-montserrat mb-4">
		Mit dieser Datenschutzerklärung möchten wir Sie über Art, Umfang und Zweck der Verarbeitung von
		personenbezogenen Daten (im Folgenden auch nur als "Daten" bezeichnet) aufklären.
		Personenbezogene Daten sind alle Daten, die einen persönlichen Bezug zu Ihnen aufweisen, z.B.
		Name, Adresse, E-Mail-Adresse oder Ihr Nutzerverhalten. Die Datenschutzerklärung gilt für alle
		von uns vorgenommene Daten-Verarbeitungsvorgänge sowohl im Rahmen unserer Kerntätigkeit als auch
		für die von uns vorgehaltenen Online-Medien.
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Wer bei uns für die Datenverarbeitung verantwortlich ist
		</h2>
		<div class="font-montserrat text-balance mb-4">
			Verantwortlich für die Datenverarbeitung ist:
		</div>
		<div class="font-montserrat text-balance mb-4">
			{name} <br />
			{address.street} <br />
			{address.zipcode}
			{address.city} <br />
			{address.country} <br /> <a href="mailto:{contact.mail}"> {contact.mail} </a> <br />
			<a href="/legal/imprint"> {$uri.url.protocol}//{$uri.url.host}/legal/imprint </a>
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Ihre Rechte nach der DSGVO
		</h2>
		<div class="text-balance font-montserrat mb-4">
			Nach der DSGVO stehen Ihnen die nachfolgend aufgeführten Rechte zu, die Sie jederzeit bei dem
			in Ziffer 1. dieser Datenschutzerklärung genannten Verantwortlichen geltend machen können:
		</div>
		<div class="text-balance font-montserrat mb-4">
			<ul class="list-disc">
				<li class="mb-2">
					<strong>Recht auf Auskunft:</strong> Sie haben das Recht, von uns Auskunft darüber zu verlangen,
					ob und welche Daten wir von Ihnen verarbeiten.
				</li>
				<li class="mb-2">
					<strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die Berichtigung unrichtiger
					oder Vervollständigung unvollständiger Daten zu verlangen.
				</li>
				<li class="mb-2">
					<strong>Recht auf Löschung:</strong> Sie haben das Recht, die Löschung Ihrer Daten zu verlangen.
				</li>
				<li class="mb-2">
					<strong>Recht auf Einschränkung:</strong> Sie haben in bestimmten Fällen das Recht zu verlangen,
					dass wir Ihre Daten nur noch eingeschränkt bearbeiten.
				</li>
				<li class="mb-2">
					<strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht zu verlangen, dass wir
					Ihnen oder einem anderen Verantwortlichen Ihre Daten in einem strukturierten, gängigen und
					maschinenlesebaren Format übermitteln.
				</li>
				<li class="mb-2">
					<strong>Beschwerderecht</strong>: Sie haben das Recht, sich bei einer Aufsichtsbehörde zu
					beschweren. Zuständig ist die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes, Ihres
					Arbeitsplatzes oder unseres Firmensitzes.
				</li>
			</ul>
		</div>
		<h3 class="text-2xl md:text-3xl font-bold text-black dark:text-secondary-500 my-2">Widerrufsrecht</h3>
		<div class="text-balance font-montserrat mb-4">
			Sie haben das Recht, die von Ihnen erteilte Einwilligung zur Datenverarbeitung jederzeit zu
			widerrufen.
		</div>
		<h3 class="text-2xl md:text-3xl font-bold text-black dark:text-secondary-500 my-2">Widerspruchsrecht</h3>
		<div class="text-balance font-montserrat mb-4">
			Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer Daten, die wir auf unser
			berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO stützen, Widerspruch einzulegen. Sofern
			Sie von Ihrem Widerspruchsrecht Gebrauch machen, bitten wir Sie um die Darlegung der Gründe.
			Wir werden Ihre personenbezogenen Daten dann nicht mehr verarbeiten, es sei denn, wir können
			Ihnen gegenüber nachweisen, dass zwingende schutzwürdige Gründe an der Datenverarbeitung Ihre
			Interessen und Rechte überwiegen.
		</div>
		<div class="text-balance font-montserrat mb-4 font-bold underline">
			Unabhängig vom vorstehend Gesagten, haben Sie das jederzeitige Recht, der Verarbeitung Ihrer
			personenbezogenen Daten für Zwecke der Werbung und Datenanalyse zu widersprechen.
		</div>
		<div class="text-balance font-montserrat mb-4">
			Ihren Widerspruch richten Sie bitte an die oben angegebene Kontaktadresse des
			Verantwortlichen.
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Wann löschen wir Ihre Daten?
		</h2>
		<div class="text-balance font-montserrat mb-4">
			Wir löschen Ihre Daten dann, wenn wir diese nicht mehr brauchen oder Sie uns dies vorgeben.
			Das bedeutet, dass - sofern sich aus den einzelnen Datenschutzhinweisen dieser
			Datenschutzerklärung nichts anderes ergibt - wir Ihre Daten löschen,
		</div>
		<div class="text-balance font-montserrat mb-4">
			<ul class="list-disc">
				<li class="mb-2">
					wenn der Zweck der Datenverarbeitung weggefallen ist und damit die jeweilige in den
					einzelnen Datenschutzhinweisen genannte Rechtsgrundlage nicht mehr besteht, also bspw.
					<ul class="list-disc">
						<li class="mb-2">
							nach Beendigung der zwischen uns bestehenden vertraglichen oder mitgliedschaftlichen
							Beziehungen (Art. 6 Abs. 1 lit. a DSGVO) oder
						</li>
						<li class="mb-2">
							nach Wegfall unseres berechtigten Interesses an der weiteren Verarbeitung oder
							Speicherung Ihrer Daten (Art. 6 Abs. 1 lit. f DSGVO),
						</li>
					</ul>
				</li>
				<li class="mb-2">
					wenn Sie von Ihrem Widerrufsrecht Gebrauch machen und keine anderweitige gesetzliche
					Rechtsgrundlage für die Verarbeitung im Sinne von Art. 6 Abs. 1 lit. b-f DSGVO eingreift,
				</li>
				<li class="mb-2">
					wenn Sie vom Ihrem Widerspruchsrecht Gebrauch machen und der Löschung keine zwingenden
					schutzwürdigen Gründe entgegenstehen.
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			Sofern wir (bestimmte Teile) Ihre(r) Daten jedoch noch für andere Zwecke vorhalten müssen,
			weil dies etwa steuerliche Aufbewahrungsfristen (in der Regel 6 Jahre für
			Geschäftskorrespondenz bzw. 10 Jahre für Buchungsbelege) oder die Geltendmachung, Ausübung
			oder Verteidigung von Rechtsansprüchen aus vertraglichen Beziehungen (bis zu vier Jahren)
			erforderlich machen oder die Daten zum Schutz der Rechte einer anderen natürlichen oder
			juristischen Person gebraucht werden, löschen wir (den Teil) Ihre(r) Daten erst nach Ablauf
			dieser Fristen. Bis zum Ablauf dieser Fristen beschränken wir die Verarbeitung dieser Daten
			jedoch auf diese Zwecke (Erfüllung der Aufbewahrungspflichten).
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">Webhosting</h2>
		<div class="text-balance font-montserrat mb-4">
			Wir bedienen uns zum Vorhalten unserer Internetseiten eines Anbieters, auf dessen Server
			unsere Internetseiten gespeichert und für den Abruf im Internet verfügbar gemacht werden
			(Hosting). Die von uns angemieteten Server befinden sich ausschließlich innerhalb Deutschlands. Hierbei können von dem Anbieter all diejenigen über den von Ihnen genutzten Browser
			übertragenen Daten verarbeitet werden, die bei der Nutzung unserer Internetseiten anfallen.
			Hierzu gehören insbesondere Ihre IP-Adresse, die der Anbieter benötigt, um unser
			Online-Angebot an den von Ihnen genutzten Browser ausliefern zu können sowie sämtliche von
			Ihnen über unsere Internetseite getätigten Eingaben. Daneben kann der von uns genutzte
			Anbieter
		</div>
		<div class="text-balance font-montserrat mb-4">
			<ul class="list-disc">
				<li class="mb-2">das Datum und die Uhrzeit des Zugriffs auf unsere Internetseite</li>
				<li class="mb-2">Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
				<li class="mb-2">Zugriffsstatus (HTTP-Status)</li>
				<li class="mb-2">die übertragene Datenmenge</li>
				<li class="mb-2">der Internet-Service-Provider des zugreifenden Systems</li>
				<li class="mb-2">der von Ihnen verwendete Browsertyp und dessen Version</li>
				<li class="mb-2">das von Ihnen verwendete Betriebssystem</li>
				<li class="mb-2">
					die Internetseite, von welcher Sie gegebenenfalls auf unsere Internetseite gelangt sind
				</li>
				<li class="mb-2">
					die Seiten bzw. Unterseiten, welche Sie auf unserer Internetseite besuchen.
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			erheben. Die vorgenannten Daten werden als Logfiles auf den Servern unseres Anbieters
			gespeichert. Dies ist erforderlich, um die Stabilität und Sicherheit des Betriebs unserer
			Internetseite zu gewährleisten.
		</div>
		<div class="text-balance font-montserrat mb-4 font-bold">Betroffene Daten:</div>
		<div class="text-balance font-montserrat mb-4">
			<ul class="list-disc">
				<li class="mb-2">Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
				<li class="mb-2">Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
				<li class="mb-2">
					Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse)
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			<strong>Betroffene Personen: </strong>Nutzer unserer Internetpräsenz
		</div>
		<div class="text-balance font-montserrat mb-4">
			<strong>Verarbeitungszweck: </strong>Ausspielen unserer Internetseiten, Gewährleistung des
			Betriebs unserer Internetseiten
		</div>
		<div class="text-balance font-montserrat mb-4">
			<strong>Rechtsgrundlage:</strong> Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
		</div>
		<div class="text-balance font-montserrat mb-4 font-bold">Von uns beauftragte(r) Webhoster:</div>
		<div class="text-balance font-montserrat mb-4 font-bold">Hetzner Online</div>
		<div class="text-balance font-montserrat mb-4">
			Dienstanbieter: Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen<br />
			<a href="https://www.hetzner.de/" target="_blank" class="externalLink">Internetseite</a>
			<a href="https://www.hetzner.de/rechtliches/datenschutz" target="_blank" class="externalLink"
				>Datenschutzerklärung</a
			>
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Content-Delivery-Network
		</h2>
		<div class="text-balance font-montserrat mb-4">
			Wir benutzen zum Ausspielen unserer Internetseiten ein Content-Delivery-Network (CDN). Ein CDN
			ist ein Netz regional verteilter und über das Internet verbundener Server. Über das CDN werden
			skalierende Speicher- und Auslieferungskapazitäten zur Verfügung gestellt. Hierdurch werden
			die Ladezeiten unserer Internetseiten optimiert und auch bei großen Lastspitzen ein optimaler
			Datendurchsatz gewährleistet. Nutzeranfragen auf unseren Internetseiten werden über Server des
			CDN geleitet. Aus diesen Datenströmen werden Statistiken erstellt. Dies dient zum einen dazu,
			potentielle Bedrohungen für unsere Internetseiten durch Schadsoftware frühzeitig zu erkennen
			und zum anderen unser Angebot stetig zu verbessern und unsere Internetseiten für Sie als
			Nutzer nutzerfreundlicher auszugestalten.
		</div>
		<div class="text-balance font-montserrat mb-4">
			Wir möchten Sie darauf hinweisen, dass je nach Sitzland des unten genannten Diensteanbieters
			die über den Dienst erfassten Daten außerhalb des Raumes der Europäischen Union übertragen und
			verarbeitet werden können. Es besteht in diesem Fall das Risiko, dass das von der DSGVO
			vorgeschriebene Datenschutzniveau nicht eingehalten und die Durchsetzung Ihrer Rechte nicht
			oder nur erschwert erfolgen kann.
		</div>
		<div class="text-balance font-montserrat mb-4 font-bold">Betroffene Daten:</div>
		<div class="text-balance font-montserrat mb-4">
			<ul class="list-disc">
				<li class="mb-2">Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
				<li class="mb-2">Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
				<li class="mb-2">
					Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse)
				</li>
			</ul>
			<div class="text-balance font-montserrat mb-4">
				<strong>Verarbeitungszweck: </strong>Technische Optimierung der Internetpräsenz, Analyse von
				Fehlern und Nutzerverhalten
			</div>
			<div class="text-balance font-montserrat mb-4">
				<strong>Rechtsgrundlage:</strong> Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
			</div>
			<div class="text-balance font-montserrat mb-4">
				<strong>Eingesetze CDN-Dienstleister:</strong>
			</div>
			<div class="text-balance font-montserrat mb-4">
				<p class="font-bold">Cloudflare</p>
				<div>
					Diensteanbieter: Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA<br />
					<a href="https://www.cloudflare.com/" class="externalLink">Internetseite</a><br />
					<a href="https://www.cloudflare.com/privacypolicy/" class="externalLink"
						>Datenschutzerklärung</a
					><br />
					<a href="https://blog.cloudflare.com/what-cloudflare-logs/" class="externalLink"
						>Umfang der Datenerfassung</a
					>
				</div>
			</div>
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">Kontaktaufnahme</h2>
		<div class="text-balance font-montserrat mb-4">
			Soweit Sie uns über E-Mail, Soziale Medien, Telefon, Fax, Post, unser Kontaktformular oder
			sonstwie ansprechen und uns hierbei personenbezogene Daten wie Ihren Namen, Ihre Telefonnummer
			oder Ihre E-Mail-Adresse zur Verfügung stellen oder weitere Angaben zur Ihrer Person oder
			Ihrem Anliegen machen, verarbeiten wir diese Daten zur Beantwortung Ihrer Anfrage im Rahmen
			des zwischen uns bestehenden vorvertraglichen oder vertraglichen Beziehungen.
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Betroffene Daten:</p>
			<ul>
				<li>Bestandsdaten (bspw. Namen, Adressen)</li>
				<li>Kontakdaten (bspw. E-Mail-Adresse, Telefonnummer, Postanschrift)</li>
				<li>Inhaltsdaten (Texte, Fotos, Videos)</li>
				<li>Vertragsdaten (bspw. Vertragsgegenstand, Vertragsdauer)</li>
			</ul>
			<div class="text-balance font-montserrat mb-4">
				<strong>Betroffene Personen: </strong>Interessenten, Kunden, Geschäfts- und Vertragspartner
			</div>
			<div class="text-balance font-montserrat mb-4">
				<strong>Verarbeitungszweck: </strong>Kommunikation sowie Beantwortung von Kontaktanfragen,
				Büro und Organisationsverfahren
			</div>
			<div class="text-balance font-montserrat mb-4">
				<strong>Rechtsgrundlage:</strong> Vertragserfüllung und vorvertragliche Anfragen, Art. 6 Abs.
				1 lit. b DSGVO, berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
			</div>
			<div>
				<h3 class="text-2xl md:text-3xl font-bold text-black dark:text-secondary-500 my-2">
					Angaben zu dem von uns genutzten Drittanbieter:
				</h3>
				<div class="text-balance font-montserrat mb-4">
					Das Kontaktformular übermittelt Daten an eine selbstgehostete Instanz von Budibase bei Hetzner. Die erhaltenen
					Nachrichten und Daten werden von unserer Seite umgehend nach der Bearbeitung gelöscht.
				</div>
				<a href="https://www.hetzner.de/rechtliches/datenschutz" target="_blank" class="externalLink"
				>Zur Datenschutzerklärung von Hetzner</a
			>
			</div>
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">Content-Dienste</h2>
		<div class="text-balance font-montserrat mb-4">
			Wir nutzen bestimmte Dienste, um über unsere Internetpräsenz bestimmte Inhalte oder Grafiken
			(Videos, Bilder, Musik, Schriftarten, Kartenmaterial) ausspielen zu können. Dabei verarbeiten
			die von uns eingesetzten Dienste die Ihnen zum Zeitpunkt Ihres Besuchs auf unseren
			Internetseiten zugeordnete IP-Adresse, da nur so der jeweilige Inhalt in dem von Ihnen
			verwendeten Browser dargestellt werden kann. Darüber hinaus können die Anbieter dieser Dienste
			weitere Cookies auf Ihr Endgerät setzen, über die Informationen über Ihr Nutzungsverhalten,
			Ihre Interessen, das von Ihnen verwendete Gerät und den verwendeten Browser sowie Zeitpunkt
			und Dauer Ihrer Sitzung erhoben werden. Diese Daten verwenden die Anbieter regelmäßig für
			Analyse-, Statistik- und Marketingzwecke. Zudem können diese Informationen können auch mit
			Informationen aus anderen Quellen verbunden werden. Dies gilt insbesondere dann, wenn Sie
			selbst einen Account bei dem Dienstanbieter unterhalten und zum Zeitpunkt der Sitzung dort
			eingeloggt sind.
		</div>
		<div class="text-balance font-montserrat mb-4">
			Wir weisen darauf hin, dass je nach Sitzland des nachstehend genannten Diensteanbieters die
			nachfolgend näher benannten Daten auf Server außerhalb des Raumes der Europäischen Union
			übertragen und verarbeitet werden können. Es besteht in diesem Fall das Risiko, dass das von
			der DSGVO vorgeschriebene Datenschutzniveau nicht eingehalten und die Durchsetzung Ihrer
			Rechte nicht oder nur erschwert erfolgen kann.
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Betroffene Daten:</p>
			<ul class="list-disc">
				<li class="mb-2">Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
				<li class="mb-2">
					Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse)
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Betroffene Personen:</p>
			<ul class="list-disc">
				<li class="mb-2">Nutzer unserer Internetpräsenz</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Verarbeitungszweck:</p>
			<ul class="list-disc">
				<li class="mb-2">
					Ausspielen unserer Internetseiten, Anbieten von Inhalten, Gewährleistung des Betriebs
					unserer Internetseiten
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Rechtsgrundlage:</p>
			<ul class="list-disc">
				<li class="mb-2">
					Einwilligung über Cookie-Consent-Banner, Art. 6 Abs. 1 lit. a DSGVO, berechtigte
					Interessen, Art. 6 Abs. 1 lit. f DSGVO
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Wir nutzen folgende Content-Dienste:</p>
			<ul class="list-disc">
				<li class="mb-2">
					<p class="font-bold">Stripe</p>
					<div>
						<div class="mb-2">
							Für die redaktionelle Verwaltung und Ausspielung von Blogbeiträgen sowie weiteren multimedialen Inhalten auf unserer Internetpräsenz verwenden wir das Content-Management-System (CMS) von Stripe. Es handelt sich hierbei um eine von uns selbst betriebene und auf unseren eigenen Servern gehostete Installation, die bei unserem Webhosting-Dienstleister Hetzner Online GmbH in Deutschland betrieben wird.
							Die Nutzung des Stripe CMS erfolgt vollständig lokal auf den von uns gemieteten Servern. Eine Übermittlung personenbezogener Daten an Stripe oder Dritte findet im Rahmen der CMS-Verwendung nicht statt.
						</div>
						<div>
							Dienstanbieter: Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen
						</div>
						<div><a href="https://www.hetzner.de/">Internetseite</a></div>
						<div><a href="https://www.hetzner.de/rechtliches/datenschutz">Datenschutzerklärung</a></div>
					</div>
				</li>
				<li class="mb-2">
					<p class="font-bold">YouTube</p>
					<div>
						<div class="mb-2">
							Wir nutzen auf dieser Webseite Komponenten von YouTube, um hierüber Videos auf unseren
							Internetseiten einzubinden, so dass diese über Ihren Internetbrowser abgespielt werden
							können, wenn Sie unsere Internetseiten besuchen. Während Ihres Besuchs unseren
							Internetseiten werden sowohl YouTube als auch Google darüber informiert welche Seite
							bzw. Unterseite Sie aufgerufen haben, indem Ihre IP-Adresse an die externen Server von
							Google in den USA übermittelt wird. Diese Informationsübermittlung erfolgt unabhängig
							davon, ob die angezeigten Videos tatsächlich betrachtet oder angeklickt werden oder
							Sie in Ihrem YouTube oder Google Account eingeloggt sind. Diese Informationen werden
							gesammelt und Ihrem Google-Account zugeordnet, sofern Sie dort eingeloggt sind, wenn
							Sie unsere Internetseiten aufrufen.
						</div>
						<div>Dienstanbieter: YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA</div>
						<div>
							Sitz in der EU: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland
						</div>
						<div><a href="https://www.youtube.com/">Internetseite</a></div>
						<div><a href="https://policies.google.com/privacy">Datenschutzerklärung</a></div>
						<div>
							<a href="https://tools.google.com/dlpage/gaoptout?hl=de" class="font-bold"
								>Opt-Out-Möglichkeit</a
							>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Unsere Onlinepräsenzen bei sozialen Netzwerken
		</h2>
		<div class="text-balance font-montserrat mb-4">
			Wir betreiben Onlinepräsenzen innerhalb der nachfolgend aufgelisteten sozialen Netzwerke.
			Besuchen Sie eine dieser Präsenzen, werden durch den jeweiligen Anbieter die unten näher
			aufgeführten Daten erhoben und verarbeitet. In der Regel werden diese Daten zur Werbe- und
			Marktforschungszwecke erhoben und hiermit Nutzungsprofile angelegt. In den Nutzungsprofilen
			können Daten unabhängig des von Ihnen verwendeten Gerätes gespeichert werden. Dies ist
			insbesondere dann der Fall, wenn Sie Mitglied der jeweiligen Plattform und bei dieser
			eingeloggt sind. Die Nutzungsprofile können von den Anbietern dazu verwendet werden, um Ihnen
			interessenbezogene Werbung auszuspielen. Gegen die Erstellung von Nutzerprofilen steht Ihnen
			ein Widerrufsrecht zu. Um dieses auszuüben, müssen Sie sich an den jeweiligen Anbieter wenden.
		</div>
		<div class="text-balance font-montserrat mb-4">
			Wenn Sie einen Account bei einem der unten aufgeführten Anbieter besitzen und beim Besuch
			unserer Webseite dort eingeloggt sind, kann der jeweilige Anbieter Daten über Ihr
			Nutzungsverhalten auf unserer Webseite erheben. Um eine solche Verknüpfung Ihrer Daten zu
			verhindern, können Sie sich vor dem Besuch unserer Seite bei dem Dienst des Anbieters
			ausloggen.
		</div>
		<div class="text-balance font-montserrat mb-4">
			Zu welchem Zweck und in welchem Umfang Daten von dem Anbieter erhoben werden, können Sie den
			jeweiligen, im Folgenden mitgeteilten, Datenschutzerklärungen der Anbieter entnehmen.
		</div>
		<div class="text-balance font-montserrat mb-4">
			Wir möchten Sie darauf hinweisen, dass je nach Sitzland des unten genannten Anbieters die über
			dessen Plattform erfassten Daten außerhalb des Raumes der Europäischen Union übertragen und
			verarbeitet werden können. Es besteht in diesem Fall das Risiko, dass das von der DSGVO
			vorgeschriebene Datenschutzniveau nicht eingehalten und die Durchsetzung Ihrer Rechte nicht
			oder nur erschwert erfolgen kann.
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="font-bold">Betroffene Daten:</p>
			<ul class="list-disc">
				<li class="mb-2">
					Bestands- und Kontaktdaten (bspw. Name, Adresse, Telefonnummer, E-Mail-Adresse)
				</li>
				<li class="mb-2">Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
				<li class="mb-2">Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
				<li class="mb-2">
					Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse).
				</li>
			</ul>
		</div>
		<div class="text-balance font-montserrat mb-4">
			<strong>Verarbeitungszweck: </strong>Kommunikation und Marketing, Verfolgen und Anaylse von
			Nutzerverhalten
		</div>
		<div class="text-balance font-montserrat mb-4">
			<strong>Rechtsgrundlage:</strong> Einwilligung, Art. 6 Abs. 1 lit. a DSGVO, berechtigtes Interessen
			Art. 6 Abs. 1 lit. f DSGVO
		</div>
		<div class="text-balance font-montserrat mb-4">
			<strong>Widerspruchsmöglichkeiten: </strong>Zu den jeweiligen Widerspruchsmöglichkeiten
			(Opt-Out) verweisen wir auf die nachfolgend verlinkten Angaben der Anbieter.
		</div>
		<div class="text-balance font-montserrat mb-4">
			<p class="mb-2">
				<strong>Wir unterhalten Onlinepräsenzen auf folgenden sozialen Netzwerken:</strong>
			</p>
			<ul class="list-disc">
				<li class="mb-2">
					<p class="font-bold">BlueSky</p>
					<div>
						<p>Dienstanbieter: Bluesky, PBLLC, Seattle, Washington, United States, USA</p>
						<p><a href="https://bsky.social/">Internetseite</a></p>
						<p>
							<a href="https://bsky.social/about/support/privacy-policy">Datenschutzerklärung</a>
						</p>
					</div>
				</li>
			</ul>
			<ul class="list-disc">
				<li class="mb-2">
					<p class="font-bold">Facebook</p>
					<div>
						<p>Dienstanbieter: Facebook Inc., 1 Hacker Way, Menlo Park, CA 94025, USA</p>
						<p>
							Sitz in der EU: Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour,
							Dublin 2, Irland
						</p>
						<p><a href="https://www.facebook.com/">Internetseite</a></p>
						<p><a href="https://www.facebook.com/about/privacy/">Datenschutzerklärung</a></p>
						<p>
							<a href="https://www.facebook.com/legal/terms/information_about_page_insights_data"
								>Datenschutzerklärung für Facebook-Seiten</a
							>
						</p>
					</div>
				</li>
				<li class="mb-2">
					<p class="font-bold">Instagram</p>
					<div>
						<p>Dienstanbieter: Instagram Inc., 1601 Willow Road, Menlo Park CA 94025, USA</p>
						<p>Mutterunternehmen: Facebook Inc., 1 Hacker Way, Menlo Park, CA 94025, USA</p>
						<p>Sitz in der EU: Facebook Ireland Limited, 4 Grand Canal Square, Dublin 2, Ireland</p>
						<p><a href="https://www.instagram.com/">Internetseite</a></p>
						<p><a href="https://instagram.com/about/legal/privacy">Datenschutzerklärung</a></p>
					</div>
				</li>
				<li class="mb-2">
					<p class="font-bold">Threads</p>
					<div>
						<p>Dienstanbieter: Instagram Inc., 1601 Willow Road, Menlo Park CA 94025, USA</p>
						<p>Mutterunternehmen: Facebook Inc., 1 Hacker Way, Menlo Park, CA 94025, USA</p>
						<p>Sitz in der EU: Facebook Ireland Limited, 4 Grand Canal Square, Dublin 2, Ireland</p>
						<p><a href="https://www.threads.net/">Internetseite</a></p>
						<p><a href="https://instagram.com/about/legal/privacy">Datenschutzerklärung</a></p>
					</div>
				</li>
				<li class="mb-2">
					<p class="font-bold">X (Twitter)</p>
					<div>
						<p>
							Dienstanbieter: Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103,
							USA
						</p>
						<p><a href="https://twitter.com/">Internetseite</a></p>
						<p><a href="https://twitter.com/de/privacy">Datenschutzerklärung</a></p>
					</div>
				</li>
				<li class="mb-2">
					<p class="font-bold">YouTube</p>
					<div>
						<p>Dienstanbieter: YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA</p>
						<p>
							Mutterunternehmen: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043,
							USA
						</p>
						<p>
							Sitz in der EU: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland
						</p>
						<p><a href="https://www.youtube.com/">Internetseite</a></p>
						<p><a href="https://policies.google.com/privacy">Datenschutzerklärung</a></p>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Sicherheits Maßnahmen
		</h2>
		<div class="text-balance font-montserrat mb-4">
			Wir treffen im Übrigen technische und organisatorische Sicherheitsmaßnahmen nach dem Stand der
			Technik, um die Vorschriften der Datenschutzgesetze einzuhalten und Ihre Daten gegen zufällige
			oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen
			den unbefugten Zugriff Dritter zu schützen.
		</div>
	</div>
	<div>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-600 my-2">
			Aktualität und Änderung dieser Datenschutzerklärung
		</h2>
		<div class="text-balance font-montserrat mb-4">
			Diese Datenschutzerklärung ist aktuell gültig und hat den Stand 21. Juli 2025. Aufgrund geänderter
			gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung
			anzupassen.
		</div>
		<div class="text-balance font-montserrat mb-4 font-bold">
			Diese Datenschutzerklärung wurde mit Hilfe des Datenschutz-Generators von SOS Recht erstellt.
			SOS Recht ist ein Angebot der Mueller.legal Rechtsanwälte Partnerschaft mit Sitz in Berlin.
		</div>
	</div>
</div>
