<script lang="ts">
	import { contextMenuAction } from '$lib/store';
	import { browser } from '$app/environment';
	import { portal } from '$lib/actions/portal';
	import { tick, onDestroy } from 'svelte';

	export let src: string;
	export let alt: string = '';
	export let classNames: string = '';
	export let copyright:
		| {
				enabled: boolean;
				name: string;
				url: string;
				compact: boolean;
				size: 'xs' | 'sm' | 'md';
		  }[]
		| null
		| undefined = [];

	export let loading: 'eager' | 'lazy' | null | undefined = undefined;
	export let decoding: 'sync' | 'async' | 'auto' | null | undefined = undefined;
	export let fetchpriority: 'high' | 'auto' | null | undefined = undefined;

	let open = false;
	let hoverOpen = false;
	let pinned = false;
	let closeTimer: ReturnType<typeof setTimeout> | null = null;
	let rootEl: HTMLDivElement | null = null;
	let triggerEl: HTMLButtonElement | null = null;
	let tooltipEl: HTMLDivElement | null = null;

	let pos = { top: 0, left: 0, placement: 'top' as 'top' | 'bottom', arrowLeft: 0 };

	function replacePaddingMarginWithZero(classes: string): string {
		return classes
			.split(' ')
			.map((cls) => {
				const normalMatch = /^(p|m)(t|b|l|r|x|y)?-\d+$/.test(cls);
				const arbitraryMatch = /^(p|m)(t|b|l|r|x|y)?-\[.+\]$/.test(cls);

				if (normalMatch) return cls.replace(/-\d+$/, '-0');
				if (arbitraryMatch) return cls.replace(/-\[.+\]$/, '-0');
				return cls;
			})
			.join(' ');
	}
	if (classNames !== '') classNames = replacePaddingMarginWithZero(classNames);

	$: copyrightItem = copyright?.[0];
	$: show = Boolean(copyrightItem?.enabled);
	$: hasUrl = Boolean(
		copyrightItem?.url &&
		(copyrightItem.url.startsWith('https://') || copyrightItem.url.startsWith('http://'))
	);

	$: effectiveSize = copyrightItem?.compact ? 'xs' : (copyrightItem?.size ?? 'md');
	$: sizeCls =
		effectiveSize === 'xs'
			? 'h-4 w-4 text-[9px]'
			: effectiveSize === 'sm'
				? 'h-5 w-5 text-[10px]'
				: 'h-6 w-6 text-xs';

	// eindeutige ID pro Komponenten-Instanz
	const uid =
		typeof crypto !== 'undefined' && 'randomUUID' in crypto
			? crypto.randomUUID()
			: `tt-${Math.random().toString(36).slice(2)}`;

	const tooltipId = `copyright-tooltip-${uid}`;
	const titleId = `copyright-title-${uid}`;

	let lastFocused: Element | null = null;

	async function focusTooltip() {
		if (!browser || !tooltipEl) return;

		await tick();

		// bevorzugt: Link (wenn vorhanden)
		const first = tooltipEl.querySelector<HTMLElement>(
			'a, button, [tabindex]:not([tabindex="-1"])'
		);

		if (first) first.focus();
		else tooltipEl.focus(); // tooltip container (tabindex=-1)
	}

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
		lastFocused = document.activeElement;
		focusTooltip();
	}

	function closeAll({ restoreFocus = true } = {}) {
		clearCloseTimer();
		open = false;
		hoverOpen = false;
		pinned = false;

		if (restoreFocus) {
			(triggerEl as HTMLElement | null)?.focus();
		}
	}

	function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		if (!open || !pinned) {
			openPinned();
		} else {
			closeAll();
		}
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

		// Tooltip horizontal zentriert auf Trigger
		let left = triggerCenterX - tw / 2;

		// Standard: oben
		let top = r.top - th - gap;
		let placement: 'top' | 'bottom' = 'top';

		// flip nach unten
		if (top < pad) {
			placement = 'bottom';
			top = r.bottom + gap;
		}

		// clamp im viewport
		const minLeft = pad;
		const maxLeft = window.innerWidth - tw - pad;

		const clampedLeft = Math.max(minLeft, Math.min(left, maxLeft));

		// arrow position relativ zur Tooltip-Box:
		// TriggerCenter - TooltipLeft (clamped), dann clamp innerhalb Tooltip
		let arrowLeft = triggerCenterX - clampedLeft;

		// Arrow nicht direkt am Rand kleben lassen
		const arrowPad = 12; // px Abstand links/rechts im Tooltip
		arrowLeft = Math.max(arrowPad, Math.min(arrowLeft, tw - arrowPad));

		// vertical clamp (Fallback)
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

<div class="relative inline-block align-middle" bind:this={rootEl}>
	<div class="overflow-hidden">
		<img
			{src}
			{alt}
			class={`block max-w-full ${classNames}`}
			{loading}
			{decoding}
			{fetchpriority}
			use:contextMenuAction
		/>
	</div>

	{#if show}
		<div class="absolute right-1.5 bottom-1.5 z-20">
			<button
				bind:this={triggerEl}
				type="button"
				class={`grid place-items-center ${sizeCls} rounded-full bg-white/95 text-black shadow
				        border border-zinc-200/70 cursor-pointer hover:bg-white
				        focus:outline-none focus:ring-2 focus:ring-accent/40 leading-none`}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={tooltipId}
				aria-describedby={open ? tooltipId : undefined}
				aria-label={`Copyright anzeigen: ${copyrightItem?.name}`}
				on:pointerdown|stopPropagation|preventDefault
				on:click={toggle}
				on:pointerenter|stopPropagation={() => openFromHover()}
				on:pointerleave|stopPropagation={() => scheduleCloseFromHover()}
				on:focus={() => openFromHover()}
				on:blur={() => scheduleCloseFromHover()}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" class="block" width="1em" height="1em">
					<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
					<path
						d="M14.8 9.3a4 4 0 1 0 0 5.4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>

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
					role="dialog"
					class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70
					       bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100
					       shadow-lg px-3 py-2 text-xs leading-snug
					       w-fit max-w-[min(22rem,calc(100vw-2rem))]"
				>
					<div class="font-medium">Copyright</div>
					<div class="mt-1 wrap-break-word">
						{#if hasUrl}
							<a
								href={copyrightItem?.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-accent underline-offset-2 hover:underline cursor-pointer"
								on:click|stopPropagation
							>
								&copy; {copyrightItem?.name}
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
						{:else}
							<span>&copy; {copyrightItem?.name}</span>
						{/if}
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
	{/if}
</div>
