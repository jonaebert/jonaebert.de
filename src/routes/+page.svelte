<script lang="ts">
	import { je_cms_base_url, name, pronouns } from '$lib/store.js';
	import { FormatDate } from '$lib/util/date.js';
	import Calendar from '$lib/components/ui/Calendar.svelte';
	import Blog from '$lib/components/ui/Blog.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import Slogan from '$lib/components/ui/Slogan.svelte';
	import SocialIcons from '$lib/components/ui/SocialIcons.svelte';

	export let data;
	const { posts, events } = data;

	// Hero expanded
	let heroExpanded = false;

	// Helper to check if two ISO date strings are on the same day
	function sameDay(aIso?: string | null, bIso?: string | null): boolean {
		if (!aIso || !bIso) return false;
		const a = new Date(aIso);
		const b = new Date(bIso);
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	// Helper to check if two Date objects are on the same day (local time)
	function isSameDayLocal(a: Date, b: Date): boolean {
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	// Helper to check if an event is today
	function isTodayEvent(startIso?: string | null, endIso?: string | null): boolean {
		if (!startIso) return false;
		const now = new Date();
		const start = new Date(startIso);
		const end = endIso ? new Date(endIso) : null;
		return isSameDayLocal(start, now) || (end ? isSameDayLocal(end, now) : false);
	}

	// Helper to check if an event is live now
	function isLiveNow(startIso?: string | null, endIso?: string | null): boolean {
		if (!startIso) return false;
		const now = new Date();
		const start = new Date(startIso);
		const end = endIso ? new Date(endIso) : new Date(start.getTime() + 90 * 60 * 1000);
		return now >= start && now <= end;
	}

	// Tooltip component
	import { browser } from '$app/environment';
	import { portal } from '$lib/actions/portal';
	import { tick, onDestroy } from 'svelte';
	import { ClassificationType } from 'typescript';

	let open = false;
	let hoverOpen = false;
	let pinned = false;
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	let rootEl: HTMLSpanElement | null = null;
	let triggerEl: HTMLButtonElement | null = null;
	let tooltipEl: HTMLDivElement | null = null;

	let pos = { top: 0, left: 0, placement: 'top' as 'top' | 'bottom', arrowLeft: 0 };

	// eindeutige ID
	const uid =
		typeof crypto !== 'undefined' && 'randomUUID' in crypto
			? crypto.randomUUID()
			: `tt-${Math.random().toString(36).slice(2)}`;

	const tooltipId = `bz322-tooltip-${uid}`;
	const titleId = `bz322-title-${uid}`;

	function clearCloseTimer() {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
	}

	function openFromHover() {
		if (!browser) return;
		clearCloseTimer();
		if (pinned) return;
		hoverOpen = true;
		open = true;
	}

	function scheduleCloseFromHover() {
		if (!browser) return;
		if (pinned) return;
		clearCloseTimer();
		closeTimer = setTimeout(() => {
			hoverOpen = false;
			open = false;
		}, 250);
	}

	function openPinned() {
		if (!browser) return;
		clearCloseTimer();
		pinned = true;
		open = true;
		tick().then(updatePosition);
	}

	function closeAll({ restoreFocus = true } = {}) {
		clearCloseTimer();
		open = false;
		hoverOpen = false;
		pinned = false;
		if (restoreFocus) triggerEl?.focus();
	}

	function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		if (!open || !pinned) openPinned();
		else closeAll();
	}

	function close() {
		closeAll();
	}

	async function updatePosition() {
		if (!browser || !triggerEl || !tooltipEl) return;

		const r = triggerEl.getBoundingClientRect();

		const tw = tooltipEl.offsetWidth;
		const th = tooltipEl.offsetHeight;

		const gap = 8;
		const pad = 8;

		const triggerCenterX = r.left + r.width / 2;

		// horizontal zentriert
		let left = triggerCenterX - tw / 2;

		// default oben
		let top = r.top - th - gap;
		let placement: 'top' | 'bottom' = 'top';

		// flip nach unten
		if (top < pad) {
			placement = 'bottom';
			top = r.bottom + gap;
		}

		// clamp viewport
		const minLeft = pad;
		const maxLeft = window.innerWidth - tw - pad;
		const clampedLeft = Math.max(minLeft, Math.min(left, maxLeft));

		// arrow position relativ zur Tooltip-Box
		let arrowLeft = triggerCenterX - clampedLeft;
		const arrowPad = 12;
		arrowLeft = Math.max(arrowPad, Math.min(arrowLeft, tw - arrowPad));

		// vertical clamp fallback
		top = Math.max(pad, Math.min(top, window.innerHeight - th - pad));

		pos = { top, left: clampedLeft, placement, arrowLeft };
	}

	function onDocPointerDown(e: PointerEvent) {
		if (!open) return;
		const t = e.target as Node | null;
		if (rootEl && t && rootEl.contains(t)) return;
		if (tooltipEl && t && tooltipEl.contains(t)) return;
		close();
	}

	function onDocKeyDown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') close();
	}

	function onReflow() {
		if (!open) return;
		updatePosition();
	}

	$: if (browser) {
		if (open) {
			tick().then(updatePosition);

			document.addEventListener('pointerdown', onDocPointerDown, true);
			document.addEventListener('keydown', onDocKeyDown, true);

			window.addEventListener('scroll', onReflow, true);
			window.addEventListener('resize', onReflow);
		} else {
			document.removeEventListener('pointerdown', onDocPointerDown, true);
			document.removeEventListener('keydown', onDocKeyDown, true);
			window.removeEventListener('scroll', onReflow, true);
			window.removeEventListener('resize', onReflow);
		}
	}

	onDestroy(() => {
		clearCloseTimer();
		if (!browser) return;
		document.removeEventListener('pointerdown', onDocPointerDown, true);
		document.removeEventListener('keydown', onDocKeyDown, true);
		window.removeEventListener('scroll', onReflow, true);
		window.removeEventListener('resize', onReflow);
	});
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
			poster={`${je_cms_base_url}/uploads/thumbnail_Hero_Video_Teaserimage_704af3dfc7.png`}
			class="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
		>
			<source src="/home/herovideo.mp4" type="video/mp4" />
		</video>
		<div
			class="absolute inset-0 z-1 bg-black/15 dark:bg-linear-to-b dark:from-zinc-950/80 dark:via-zinc-950/55 dark:to-zinc-950/85"
		></div>

		<div class="relative z-10">
			<!-- Glass Box -->
			<div
				class="w-full max-w-none rounded-2xl p-4 sm:p-5 lg:p-6
				bg-white/55 backdrop-blur-md border border-white/40 shadow-sm
				dark:bg-transparent dark:backdrop-blur-0 dark:border-transparent dark:shadow-none"
			>
				<div
					class="inline-flex scale-105 items-center gap-2 rounded-full px-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					<span class="h-2 w-2 rounded-full bg-accent"></span>
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
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white hover:scale-105 transition-transform duration-300"
						>
							Über mich
						</a>

						<a
							href="/contact"
							class="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:scale-105 transition-transform duration-300"
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
	<div class="order-2 lg:order-0 lg:col-span-5 grid gap-5">
		<!-- Status -->
		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 sm:p-6">
			<div class="flex items-center justify-between">
				<div>
					<div class="text-sm font-medium">Aktuell</div>
					<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Was gerade passiert</div>
				</div>
				<span
					class="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30"
				>
					<span class="h-2 w-2 rounded-full bg-accent"></span>
					live
				</span>
			</div>

			<div class="mt-5 space-y-3">
				<!-- Neuester Beitrag -->
				{#await posts}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Neuester Beitrag</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Lädt…</div>
					</div>
				{:then ps}
					{@const latestPost = [...ps].sort(
						(a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
					)[0]}
					{#if latestPost}
						<a
							href={`/blog/${latestPost.documentId}`}
							class="block rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
						>
							<div class="flex items-start justify-between gap-3">
								<div class="text-sm font-medium">Neuester Beitrag</div>
								<span
									class="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-zinc-200/70 dark:border-zinc-800/70 text-zinc-600 dark:text-zinc-400"
								>
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M5 12h12" />
										<path d="M13 6l6 6-6 6" />
									</svg>
									Öffnen
								</span>
							</div>

							<div class="mt-1 text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2">
								{latestPost.title}
							</div>

							<div class="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
								{FormatDate(latestPost.createdAt, 'date')}
							</div>
						</a>
					{:else}
						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium">Neuester Beitrag</div>
							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Noch keine Beiträge.</div>
						</div>
					{/if}
				{:catch err}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Neuester Beitrag</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
							Beitrag konnte nicht geladen werden.
						</div>
					</div>
				{/await}

				<!-- Nächster / aktueller Termin -->
				{#await events}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Nächster Termin</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Lädt…</div>
					</div>
				{:then es}
					{@const now = new Date()}
					{@const upcoming = [...es]
						.filter((e) => {
							if (!e?.start) return false;
							const end = e.end
								? new Date(e.end)
								: new Date(new Date(e.start).getTime() + 90 * 60 * 1000);
							return end >= now;
						})
						.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0]}
					{@const latestByStart = [...es].sort(
						(a, b) => new Date(b.start ?? 0).getTime() - new Date(a.start ?? 0).getTime()
					)[0]}
					{@const pick = upcoming ?? latestByStart}

					{#if pick}
						{@const live = isLiveNow(pick.start, pick.end)}
						{@const today = isTodayEvent(pick.start, pick.end)}

						<a
							href={`/calendar/${pick.documentId}`}
							class="block rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition"
						>
							<div class="flex items-start justify-between gap-3">
								<div class="text-sm font-medium">{live ? 'Läuft gerade' : 'Nächster Termin'}</div>

								{#if live}
									<span
										class="shrink-0 inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/35 dark:text-rose-200 dark:border-rose-900/60"
									>
										<span class="h-2 w-2 rounded-full bg-rose-500"></span>
										jetzt
									</span>
								{:else if today}
									<span
										class="shrink-0 inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/35 dark:text-amber-200 dark:border-amber-900/60"
									>
										<span class="h-2 w-2 rounded-full bg-amber-500"></span>
										heute
									</span>
								{/if}
							</div>

							<div class="mt-1 text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2">
								{pick.subject}
							</div>

							<div class="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
								{FormatDate(pick.start, 'date')} · {FormatDate(pick.start, 'time')}
								{#if pick.end}
									{#if sameDay(pick.start, pick.end)}
										– {FormatDate(pick.end, 'time')}
									{:else}
										– {FormatDate(pick.end, 'date')} {FormatDate(pick.end, 'time')}
									{/if}
								{/if}
							</div>
						</a>
					{:else}
						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium">Nächster Termin</div>
							<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Keine Termine.</div>
						</div>
					{/if}
				{:catch err}
					<div
						class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<div class="text-sm font-medium">Nächster Termin</div>
						<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
							Termin konnte nicht geladen werden.
						</div>
					</div>
				{/await}
			</div>
		</div>

		<!-- Portrait -->
		<div
			class="group relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-5 sm:p-6"
		>
			<div class="space-y-3">
				<p class="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
					Kommunalwahl Braunschweig
				</p>

				<h3 class="text-lg sm:text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
					Für euch in Braunschweig
				</h3>

				<div class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
					Listenplatz <span class="font-semibold">14</span> für den Rat<br />
					Listenplatz <span class="font-semibold">1</span> für den{' '}
					<span class="relative inline-flex" bind:this={rootEl}>
						<button
							bind:this={triggerEl}
							type="button"
							class="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-900/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/40 leading-none"
							aria-haspopup="dialog"
							aria-expanded={open}
							aria-controls={tooltipId}
							aria-describedby={open ? tooltipId : undefined}
							on:pointerdown|stopPropagation|preventDefault
							on:click={toggle}
							on:pointerenter|stopPropagation={() => openFromHover()}
							on:pointerleave|stopPropagation={() => scheduleCloseFromHover()}
							on:focus={() => openFromHover()}
							on:blur={() => scheduleCloseFromHover()}
						>
							Stadtbezirk <span class="font-semibold text-primary-600">322</span>
						</button>

						{#if open}
							<div
								bind:this={tooltipEl}
								use:portal
								class="fixed z-9999"
								style={`top:${pos.top}px; left:${pos.left}px;`}
								id={tooltipId}
								tabindex="-1"
								role="dialog"
								aria-labelledby={titleId}
								on:pointerdown|stopPropagation
								on:pointerenter|stopPropagation={() => openFromHover()}
								on:pointerleave|stopPropagation={() => scheduleCloseFromHover()}
							>
								<div
									class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 shadow-lg px-3 py-2 text-xs leading-snug w-fit max-w-[min(22rem,calc(100vw-2rem))]"
								>
									<div class="font-medium" id={titleId}>Stadtbezirk 322</div>
									<div class="mt-1 wrap-break-word">
										Wenden · Thune · Veltenhof · Rhüme · Harxbüttel
									</div>
									<div class="mt-2">
										<a
											href="https://www.braunschweig.de/politik_verwaltung/politik/ratderstadt/stadtbezirksraete/karten/_2021_Stadtbezirk_322.pdf"
											target="_blank"
											rel="noopener noreferrer"
											class="text-accent underline-offset-2 hover:underline cursor-pointer"
											on:click|stopPropagation
										>
											Karte Stadtbezirk 322
											<!-- Link icon -->
											<svg
												viewBox="0 0 24 24"
												class="ml-1 inline-block h-3.5 w-3.5 align-text-bottom"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												aria-hidden="true"
											>
												<path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
												<path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
											</svg>
										</a>
									</div>

									<div class="mt-2 flex justify-end">
										<button
											type="button"
											class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
											on:click|stopPropagation={() => close()}
										>
											Schließen
										</button>
									</div>
								</div>

								{#if pos.placement === 'top'}
									<div
										class="absolute top-full w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white dark:border-t-zinc-950"
										style={`left:${pos.arrowLeft}px; transform:translateX(-50%);`}
									></div>
									<div
										class="absolute top-full -mt-px w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-zinc-200/70 dark:border-t-zinc-800/70"
										style={`left:${pos.arrowLeft}px; transform:translateX(-50%);`}
									></div>
								{:else}
									<div
										class="absolute bottom-full w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-white dark:border-b-zinc-950"
										style={`left:${pos.arrowLeft}px; transform:translateX(-50%);`}
									></div>
									<div
										class="absolute bottom-full -mb-px w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-zinc-200/70 dark:border-b-zinc-800/70"
										style={`left:${pos.arrowLeft}px; transform:translateX(-50%);`}
									></div>
								{/if}
							</div>
						{/if}
					</span>
				</div>
			</div>

			<a href="/about" target="_self" class="block mt-5">
				<div
					class="aspect-square overflow-hidden"
				>
					<Image
						src={`${je_cms_base_url}/uploads/Portrait_1000x1000_Cutout_7b47e25bf6.png`}
						alt="Portrait von {name}"
						classNames="h-full w-full object-cover scale-100 sm:scale-95 hover:scale-100 transition-transform duration-500 ease-in-out"
					/>
				</div>
			</a>
		</div>
	</div>

	<!-- Calendar Preview -->
	<div class="order-4 lg:order-0 lg:col-span-6">
		<Calendar {events} limit={7} />
	</div>

	<!-- Blog Preview -->
	<div class="order-5 lg:order-0 lg:col-span-6">
		<Blog {posts} limit={6} />
	</div>
</section>
