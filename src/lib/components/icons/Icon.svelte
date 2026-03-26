<script lang="ts">
	/**
	 * Reusable inline SVG icon component
	 * - consistent look across platforms (no emoji font differences)
	 * - no network request (inline paths)
	 */

	export type IconName =
		| 'arrow-left'
		| 'arrow-right'
		| 'article'
		| 'calendar'
		| 'check'
		| 'clock'
		| 'comment'
		| 'compass'
		| 'copy'
		| 'info'
		| 'link'
		| 'meet'
		| 'monitor'
		| 'moon'
		| 'pin'
		| 'scale'
		| 'star'
		| 'sun'
		| 'x';

	export let name: IconName;

	/** Tailwind classes, e.g. "h-4 w-4 text-zinc-700" */
	export let classes: string = '';

	/** Accessible label (if not set -> aria-hidden=true) */
	export let label: string | undefined = undefined;

	/** Optional <title> inside SVG for additional accessibility */
	export let title: string | undefined = undefined;

	/** Customize stroke width (default 2 for consistent look) */
	export let strokeWidth: number = 2;

	function path(name: IconName): string {
		switch (name) {
			case 'arrow-left':
				return `
					<path d="M10 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'arrow-right':
				return `
					<path d="M14 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'article':
				return `
						<path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke-linejoin="round"/>
						<path d="M7.5 8h4" stroke-linecap="round"/>
						<path d="M7.5 11.5h4" stroke-linecap="round"/>
						<path d="M7.5 15h4" stroke-linecap="round"/>
						<path d="M13.5 8h3.5" stroke-linecap="round"/>
						<path d="M13.5 11.5h3.5" stroke-linecap="round"/>
					`;
			case 'calendar':
				return `
					<path d="M7 3v3" stroke-linecap="round"/>
					<path d="M17 3v3" stroke-linecap="round"/>
					<path d="M3.5 8h17" stroke-linecap="round"/>
					<path d="M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke-linejoin="round"/>
				`;
			case 'check':
				return `
					<path d="M20 6.5L9.5 17 4 11.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'clock':
				return `
					<path d="M12 22A10 10 0 1012 2a10 10 0 000 20z" stroke-linejoin="round"/>
					<path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'comment':
				return `
					<path d="M8 13.5h8m-8-5h4M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
				`;
			case 'compass':
				return `
					<circle cx="12" cy="12" r="9" />
					<g transform="rotate(30 12 12)"> <path d="M12 7l3 5-3 5-3-5z" stroke-linejoin="round"/></g>
					<circle cx="12" cy="12" r="1.2" />
				`;
			case 'copy':
				return `
					<rect x="9" y="9" width="11" height="11" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'info':
				return `
					<path d="M12 22A10 10 0 1012 2a10 10 0 000 20z" stroke-linejoin="round"/>
					<path d="M12 10v7" stroke-linecap="round"/>
					<path d="M12 7h.01" stroke-linecap="round"/>
				`;
			case 'link':
				return `
					<path d="M10 13a5 5 0 007 0l1-1a5 5 0 000-7 5 5 0 00-7 0l-1 1" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M14 11a5 5 0 00-7 0l-1 1a5 5 0 000 7 5 5 0 007 0l1-1" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'meet':
				return `
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M19 8v6" />
					<path d="M22 11h-6" />
				`;
			case 'monitor':
				return `
					<rect x="3" y="4" width="18" height="14" rx="2" stroke-linejoin="round"/>
					<path d="M8 20h8" stroke-linecap="round"/>
					<path d="M12 18v2" stroke-linecap="round"/>
				`;
			case 'moon':
				return `
					<path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" stroke-linejoin="round"/>
				`;
			case 'pin':
				return `
					<path d="M12 22c-4-4.2-7-7.6-7-11a7 7 0 1114 0c0 3.4-3 6.8-7 11z" stroke-linejoin="round"/>
					<circle cx="12" cy="11" r="2.5" />
				`;
			case 'scale':
				return `
					<path d="m16 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Zm5 5h10M12 3v18M3 7h2c2 0 5-1 7-2c2 1 5 2 7 2h2" />
				`;

			case 'star':
				return `
					<path d="M12 2.7l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.8 6.4 19.9l1.1-6.2L3 9.3l6.2-.9L12 2.7z" stroke-linejoin="round"/>
				`;
			case 'sun':
				return `
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" stroke-linecap="round"/>
					<path d="M12 20v2" stroke-linecap="round"/>
					<path d="M4.93 4.93l1.41 1.41" stroke-linecap="round"/>
					<path d="M17.66 17.66l1.41 1.41" stroke-linecap="round"/>
					<path d="M2 12h2" stroke-linecap="round"/>
					<path d="M20 12h2" stroke-linecap="round"/>
					<path d="M4.93 19.07l1.41-1.41" stroke-linecap="round"/>
					<path d="M17.66 6.34l1.41-1.41" stroke-linecap="round"/>
				`;
			case 'x':
				return `
					<path d="M6 6l12 12" stroke-linecap="round"/>
					<path d="M18 6L6 18" stroke-linecap="round"/>
				`;

			default:
				return '';
		}
	}

	$: d = path(name);
</script>

<svg
	class={classes}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	{strokeWidth}
	aria-hidden={label ? undefined : 'true'}
	aria-label={label}
	role={label ? 'img' : undefined}
	focusable="false"
>
	{#if title}
		<title>{title}</title>
	{/if}

	{@html d}
</svg>
