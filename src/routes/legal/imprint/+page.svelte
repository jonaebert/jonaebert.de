<script lang="ts">
	import { name, address, contact, uri } from '$lib/store';

	const social = [
		{ label: 'Facebook', handle: '@jonaebertbs' },
		{ label: 'GitHub', handle: '@jonaebert' },
		{ label: 'Instagram', handle: '@jonaebertbs' },
		{ label: 'LinkedIn', handle: '@jonaebert' },
		{ label: 'Mastodon', handle: '@jonaebertbs' },
		{ label: 'Threads', handle: '@jonaebertbs' },
		{ label: 'TikTok', handle: '@jonaebertbs' },
		{ label: 'YouTube', handle: '@jonaebert' }
	];

	const toc = [
		{ id: 'tmg', label: 'Angaben nach § 5 TMG' },
		{ id: 'contact', label: 'Kontakt' },
		{ id: 'responsible', label: 'Verantwortlich (RStV)' },
		{ id: 'disclaimer', label: 'Haftungsausschluss' },
		{ id: 'links', label: 'Haftung für Links' },
		{ id: 'social', label: 'Social Media' }
	];
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={$uri.url.href} />
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
	<header class="mx-auto max-w-5xl">
		<p class="text-sm tracking-wide text-zinc-600 dark:text-zinc-400">Rechtliches</p>
		<h1 class="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
			Impressum
		</h1>
	</header>

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
					<div>
						<p class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Impressum
						</p>
						<p class="mt-0.5 font-semibold text-zinc-950 dark:text-zinc-50">Inhalt</p>
					</div>
				</summary>

				<nav class="mt-4">
					<ul class="grid gap-1.5">
						{#each toc as item}
							<li>
								<a
									href={`#${item.id}`}
									class="block rounded-2xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100/70 dark:text-zinc-300 dark:hover:bg-zinc-900/40 transition"
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
			<section
				id="tmg"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Angaben gemäß § 5 Telemediengesetz
				</h2>

				<div class="mt-5 grid gap-3 text-zinc-700 dark:text-zinc-300">
					<p class="font-medium text-zinc-950 dark:text-zinc-50">{name}</p>
					<p>{address.street}</p>
					<p>{address.zipcode} {address.city}</p>
					<p>{address.country}</p>
				</div>
			</section>

			<section
				id="contact"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Kontakt</h2>

				<dl class="mt-5 grid gap-4 sm:grid-cols-2">
					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
							Telefax
						</div>
						<div class="mt-1 text-zinc-900 dark:text-zinc-100">{contact.fax}</div>
					</div>

					<div class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Web</div>
						<div class="mt-1">
							<a
								class="text-accent underline underline-offset-4 break-all"
								href={contact.web}
								rel="me noopener noreferrer"
							>
								{$uri.url.protocol}//{$uri.url.host}{contact.web}
							</a>
						</div>
					</div>

					<div
						class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60 sm:col-span-2"
					>
						<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Mail</div>
						<div class="mt-1">
							<a class="text-accent underline underline-offset-4" href={`mailto:${contact.mail}`}>
								{contact.mail}
							</a>
						</div>
					</div>
				</dl>
			</section>

			<section
				id="responsible"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
				</h2>

				<div class="mt-5 grid gap-3 text-zinc-700 dark:text-zinc-300">
					<p class="font-medium text-zinc-950 dark:text-zinc-50">{name}</p>
					<p>{address.street}</p>
					<p>{address.zipcode} {address.city}</p>
					<p>{address.country}</p>
				</div>
			</section>

			<section
				id="disclaimer"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Haftungsausschluss
				</h2>

				<p class="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
					Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
					Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
					Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
					den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
					jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
					überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
					hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
					den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
					erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
					Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
					entfernen.
				</p>
			</section>

			<section
				id="links"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h3 class="text-base sm:text-lg font-semibold text-zinc-950 dark:text-zinc-50">
					Haftung für Links
				</h3>
				<p class="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
					Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
					Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
					Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
					Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
					mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
					Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
					ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
					Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
				</p>
			</section>

			<section
				id="social"
				class="scroll-mt-28 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 sm:p-6 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 min-w-0 overflow-hidden"
			>
				<h2 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
					Social Media
				</h2>

				<ul class="mt-5 grid gap-3 sm:grid-cols-2">
					{#each social as s}
						<li class="rounded-2xl border border-zinc-200/60 p-4 dark:border-zinc-800/60">
							<div class="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
								{s.label}
							</div>
							<div class="mt-1 font-medium text-zinc-950 dark:text-zinc-50">{s.handle}</div>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</div>
