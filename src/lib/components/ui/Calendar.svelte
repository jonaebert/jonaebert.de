<script lang="ts">
	import { je_cms_base_url } from '$lib/store.js';
	import { FormatDate } from '$lib/util/date.js';
	import CalendarListSkeleton from '$lib/components/skeleton/CalendarListSkeleton.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import SocialIcons from './SocialIcons.svelte';

	export let events: any[];
	export let limit: number = 8;

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
	Promise<any[]>;
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
	<CalendarListSkeleton {limit} />
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
			{#each eventsLoaded.slice(0, limit) as event (event.id ?? event.documentId)}
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
									: 'bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 hover:dark:bg-zinc-800 border-zinc-200/70 dark:border-zinc-800/70'
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
								{#if event.copyright !== null}
									<Image
										src={coverUrl(event)!}
										alt={event.cover?.alternativeText ?? event.subject}
										classNames="h-16 w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
										loading="lazy"
										copyright={[
											{
												enabled: true,
												name: event.copyright?.label,
												url: event.copyright?.url || '',
												size: 'xs'
											}
										]}
									/>
								{:else}
									<Image
										src={coverUrl(event)!}
										alt={event.cover?.alternativeText ?? event.subject}
										classNames="h-16 w-16 rounded-2xl object-cover border border-zinc-200/70 dark:border-zinc-800/70"
										loading="lazy"
										copyright={[
											{
												enabled: false,
												name: '',
												url: '',
												size: ''
											}
										]}
									/>
								{/if}
							</div>
						{/if}

						<div class="min-w-0 flex-1">
							<span class={`${eventState.class} float-right ml-3 mt-0.5`} title={eventState.label}>
								{#if eventState.icon === 'meet'}
									<Icon name="meet" classes="h-4 w-4 stroke-2" />
								{:else if eventState.icon === 'recommend'}
									<Icon name="star" classes="h-4 w-4 stroke-2" />
								{:else if eventState.icon === 'cancelled'}
									<Icon name="x" classes="h-4 w-4 stroke-2" />
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
		<div class="flex items-start gap-3">
			<!-- Optional Icon -->
			<div class="mt-0.5 text-zinc-500 dark:text-zinc-400">
				<Icon name="info" />
			</div>

			<div>
				<div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
					Termine sind aktuell nicht verfügbar
				</div>

				<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
					Der Kalender konnte gerade nicht geladen werden. Bitte versuche es in ein paar Minuten
					erneut oder lade die Seite neu.
				</div>

				<!-- Actions -->
				<div class="mt-4 flex flex-wrap gap-2">
					<button
						on:click={() => location.reload()}
						class="inline-flex items-center rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 px-3 py-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 transition duration-200 ease-in-out hover:cursor-pointer"
					>
						Neu laden
					</button>

					<a
						href="/contact"
						class="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition duration-200 ease-in-out"
					>
						Problem melden
					</a>
				</div>

				<!-- Social Hinweis -->
				<div class="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
					Aktuelle Termine findest du ggf. auch über meine Social-Media-Kanäle.
				</div>

				<!-- Deine bestehende Komponente -->
				<div class="mt-2 max-w-fit">
					<SocialIcons />
				</div>

				<!-- Optional Debug -->
				{#if import.meta.env.DEV}
					<div class="mt-4 text-xs text-zinc-500/80 dark:text-zinc-400/80 break-all">
						{String(err)}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/await}
