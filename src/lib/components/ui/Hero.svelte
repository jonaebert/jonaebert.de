<script lang="ts">
	import { FormatDate } from '$lib/util/date.js';
	import Image from '$lib/components/ui/Image.svelte';
	import { je_cms_base_url, name } from '$lib/store.js';

	export let posts: any[] = [];
	export let events: any[] = [];

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
</script>

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
						if (!e?.start || e.state === 'cancelled' || e.state === 'tentative') return false;
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
		class="group relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 sm:p-6 overflow-hidden"
	>
		<div class="space-y-3">
			<p class="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
				Kommunalwahl • September 2026
			</p>

			<h3 class="text-lg sm:text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
				Für euch in Braunschweig
			</h3>

			<div class="text-zinc-600 dark:text-zinc-400 space-y-3">
				<div
					class="rounded-xl p-4 text-sm sm:text-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					Rat der Stadt Braunschweig<br />Wahlbereich 21 (Braunschweig Südost) •
					<strong>Platz 2</strong>
				</div>
				<div
					class="rounded-xl p-4 text-sm sm:text-md bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					Stadtbezirksrat 322<br />Nördliche Schunter-/Okeraue • <strong>Platz 1</strong>
				</div>
			</div>
		</div>

		<a href="/about" target="_self" class="block mt-5">
			<div class="aspect-square overflow-hidden">
				<Image
					src={`${je_cms_base_url}/uploads/Portrait_1000x1000_Cutout_7b47e25bf6.png`}
					alt="Portrait von {name}"
					classNames="h-full w-full object-cover scale-100 sm:scale-95 hover:scale-100 transition-transform duration-500 ease-in-out"
				/>
			</div>
		</a>
	</div>
</div>
