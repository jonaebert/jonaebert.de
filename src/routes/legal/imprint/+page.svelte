<script lang="ts">
	import { name, address, contact, uri } from '$lib/store';
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href="{$uri.url.href}">
</svelte:head>

<div class="container py-12 grid gap-5">
	<div class="font-montserrat">
		<h1 class="text-4xl md:text-5xl font-bold text-secondary-900 italic my-2">Impressum</h1>
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2">
			Angaben gemäß §5 Telemediengesetz
		</h2>
		<p>{name}</p>
		<p>{address.street}</p>
		<p>{address.zipcode} {address.city}</p>
		<p>{address.country}</p>
	</div>
	<div class="font-montserrat">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2">Kontakt</h2>
		<table>
			<tbody>
				<tr>
					<td>Telefax</td>
					<td>{contact.fax}</td>
				</tr>
				<tr>
					<td>Web</td>
					<td><a href={contact.web}> {$uri.url.protocol}//{$uri.url.host}{contact.web} </a></td>
				</tr>
				<tr>
					<td>Mail</td>
					<td><a href="mailto:{contact.mail}"> {contact.mail} </a></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="font-montserrat">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2">
			Verantwortlich für den Inhalt nach §55 Abs. 2 RStV
		</h2>
		<p>{name}</p>
		<p>{address.street}</p>
		<p>{address.zipcode} {address.city}</p>
		<p>{address.country}</p>
	</div>
	<div class="text-justify font-montserrat">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2">
			Haftungsausschluss
		</h2>
		<h3 class="text-2xl md:text-3xl font-bold text-black italic my-2">Haftung für Inhalte</h3>
		<p class="text-balance">
			Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
			Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
			Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
			allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
			nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
			nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen
			zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
			bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
			Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
			Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
		</p>
	</div>
	<div class="text-justify font-montserrat">
		<h3 class="text-2xl md:text-3xl font-bold text-black italic my-2">Haftung für Links</h3>
		<p class="text-balance">
			Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
			Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für
			die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
			verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
			Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
			erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
			konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
			Rechtsverletzungen werden wir derartige Links umgehend entfernen.
		</p>
	</div>
	<div class="font-montserrat">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2">Social Media</h2>
		<p>Dieses Impressum gilt ebenfalls für folgende Social Media Präsenzen:</p>
		<table>
			<tbody>
				<tr>
					<td>Facebook</td>
					<td>@jonaebertbs</td>
				</tr>
				<tr>
					<td>GitHub</td>
					<td>@jonaebert</td>
				</tr>
				<tr>
					<td>Instagram</td>
					<td>@jonaebertbs</td>
				</tr>
				<tr>
					<td>LinkedIn</td>
					<td>@jonaebert</td>
				</tr>
				<tr>
					<td>TikTok</td>
					<td>@jona_ebert</td>
				</tr>
				<tr>
					<td>Threads</td>
					<td>@jonaebertbs</td>
				</tr>
				<tr>
					<td>YouTube</td>
					<td>@jonaebert</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style class="postcss">
	/* Ihr CSS-Stil für die Tabelle */
	table {
		width: 100%;
		border-collapse: collapse;
		table-layout: auto;
	}
	td {
		overflow: hidden;
		white-space: nowrap;
		padding: 4px;
		text-align: left;
	}
</style>
