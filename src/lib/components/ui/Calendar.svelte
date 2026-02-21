<script lang="ts">
	import CalendarListSkeleton from '$lib/components/skeleton/CalendarListSkeleton.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import { FormatDate } from '$lib/util/date.js';
	import { je_cms_base_url } from '$lib/store.js';

	export let events: Promise<any[]>;
	export let items: number = 8;

	function coverUrl(item: any): string | null {
		const cover = item?.cover;
		if (!cover) return null;

		const rel = cover.formats?.small?.url ?? cover.formats?.thumbnail?.url ?? cover.url ?? null;
		if (!rel) return null;
		if (rel.startsWith('http://') || rel.startsWith('https://')) return rel;

		return `${je_cms_base_url}${rel.startsWith('/') ? '' : '/'}${rel}`;
	}

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

	function isSameDayLocal(a: Date, b: Date): boolean {
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function isTodayEvent(startIso?: string | null, endIso?: string | null): boolean {
		if (!startIso) return false;
		const now = new Date();
		const start = new Date(startIso);
		const end = endIso ? new Date(endIso) : null;
		return isSameDayLocal(start, now) || (end ? isSameDayLocal(end, now) : false);
	}

	function isLiveNow(startIso?: string | null, endIso?: string | null): boolean {
		if (!startIso) return false;
		const now = new Date();
		const start = new Date(startIso);
		const end = endIso ? new Date(endIso) : new Date(start.getTime() + 90 * 60 * 1000);
		return now >= start && now <= end;
	}

	function stateLabel(state?: string | null): {
		label: string;
		class: string;
		icon: 'meet' | 'recommend' | 'cancelled' | 'info';
	} {
		const base = 'inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border';
		switch (state) {
			case 'confirmed':
				return {
					label: 'Hier kannst du mich treffen',
					icon: 'meet',
					class: `${base} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900/60`
				};
			case 'tentative':
				return {
					label: 'Terminempfehlung',
					icon: 'recommend',
					class: `${base} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/35 dark:text-amber-200 dark:border-amber-900/60`
				};
			case 'cancelled':
				return {
					label: 'Abgesagt',
					icon: 'cancelled',
					class: `${base} bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/35 dark:text-rose-200 dark:border-rose-900/60`
				};
			default:
				return {
					label: state ?? 'Status offen',
					icon: 'info',
					class: `${base} bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900/40 dark:text-zinc-300 dark:border-zinc-800`
				};
		}
	}
</script>

{#await events}
	<CalendarListSkeleton {items} />
{:then eventsLoaded}
	<section class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
		<div class="flex items-center justify-between">
			<div>
				<div class="text-sm font-medium">Nächste Termine</div>
				<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
					Begegnungen, Veranstaltungen und Impulse für eine nachhaltige Zukunft.
				</div>
			</div>
		</div>

		<div class="mt-5 space-y-3">
			{#each eventsLoaded as event (event.id)}
				{@const eventState = stateLabel(event.state)}
				{@const today = isTodayEvent(event.start, event.end)}
				{@const live = isLiveNow(event.start, event.end)}
				<a
					href={'/calendar/' + event.documentId}
					class={`block rounded-xl border transition overflow-hidden
						${
							live
								? 'border-accent/50 ring-2 ring-accent/30 bg-accent/5 dark:bg-accent/10'
								: today
									? 'border-accent/30 bg-accent/0 dark:bg-accent/5'
									: 'border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
						}`}
				>
					<div class="flex items-center gap-4 p-4">
						<div
							class="hidden sm:grid rounded-2xl w-16 h-16 border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900/30 place-items-center px-2"
						>
							<div class="text-center leading-none">
								<div class="text-lg font-semibold">{FormatDate(event.start, 'day')}</div>
								<div class="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400">
									{FormatDate(event.start, 'monthshort')}
								</div>
							</div>
						</div>

						{#if coverUrl(event)}
							<div>
								<Image
									src={coverUrl(event)!}
									alt={event.cover?.alternativeText ?? event.subject}
									classNames="h-16 w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
									loading="lazy"
									copyright={event.copyright?.enabled
										? [
												{
													enabled: event.copyright?.enabled,
													name: event.copyright?.name,
													url: event.copyright?.url || '',
													compact: true
												}
											]
										: []}
								/>
							</div>
						{/if}

						<div class="min-w-0 flex-1">
							<span class={`${eventState.class} float-right ml-3 mt-0.5`} title={eventState.label}>
								{#if eventState.icon === 'meet'}
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
										<circle cx="9" cy="7" r="4" />
										<path d="M19 8v6" />
										<path d="M22 11h-6" />
									</svg>
								{:else if eventState.icon === 'recommend'}
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path
											d="M12 17.3l-6.2 3.3 1.2-6.9L1.8 9l7-1L12 1.7 15.2 8l7 1-5.2 4.7 1.2 6.9z"
										/>
									</svg>
								{:else if eventState.icon === 'cancelled'}
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M18 6L6 18" />
										<path d="M6 6l12 12" />
									</svg>
								{:else}
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<circle cx="12" cy="12" r="10" />
										<path d="M12 16v-4" />
										<path d="M12 8h.01" />
									</svg>
								{/if}

								<span class="max-w-20.5 text-balance hyphens-auto wrap-break-word"
									>{eventState.label}</span
								>

								{#if live}
									<span
										class="mr-1 inline-flex items-center gap-1 text-[11px] font-semibold text-accent"
									>
										<span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
										LIVE
									</span>
								{/if}
							</span>

							{#if live}
								<span
									class="float-right ml-2 mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs bg-accent/10 text-accent border border-accent/30"
								>
									<span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
									Jetzt
								</span>
							{/if}

							<div class="font-medium text-balance hyphens-auto wrap-break-word">
								{event.subject}
							</div>
							<div class="clear-both"></div>

							<div
								class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 flex flex-wrap gap-x-3 gap-y-1"
							>
								<span>
									{FormatDate(event.start, 'date')}
									<span class="text-zinc-500 dark:text-zinc-400">
										· {FormatDate(event.start, 'time')}
										{#if event.end}
											{#if sameDay(event.start, event.end)}
												– {FormatDate(event.end, 'time')}
											{:else}
												– {FormatDate(event.end, 'date')} {FormatDate(event.end, 'time')}
											{/if}
										{/if}
									</span>
								</span>

								{#if event.location}
									<span class="text-zinc-500 dark:text-zinc-400 truncate">· {event.location}</span>
								{/if}
							</div>

							{#if event.description}
								<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
									{event.description}
								</p>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>
{:catch err}
	<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
		<div class="text-sm font-medium">Kalender konnte nicht geladen werden</div>
		<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{String(err)}</div>
	</div>
{/await}
