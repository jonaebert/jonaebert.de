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
		| 'donation'
		| 'earth'
		| 'info'
		| 'lightning'
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
					<path d="M20 6.5L9.5 17 4 11.5" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'clock':
				return `
					<path d="M12 22A10 10 0 1012 2a10 10 0 000 20z" stroke-linejoin="round"/>
					<path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'comment':
				return `
					<path d="M8 13.5h8m-8-5h4M6.099 19q-1.949-.192-2.927-1.172C2 16.657 2 14.771 2 11v-.5c0-3.771 0-5.657 1.172-6.828S6.229 2.5 10 2.5h4c3.771 0 5.657 0 6.828 1.172S22 6.729 22 10.5v.5c0 3.771 0 5.657-1.172 6.828S17.771 19 14 19c-.56.012-1.007.055-1.445.155c-1.199.276-2.309.89-3.405 1.424c-1.563.762-2.344 1.143-2.834.786c-.938-.698-.021-2.863.184-3.865" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
				`;
			case 'compass':
				return `
					<circle cx="12" cy="12" r="9" />
					<g transform="rotate(30 12 12)"> <path d="M12 7l3 5-3 5-3-5z" stroke-linejoin="round"/></g>
					<circle cx="12" cy="12" r="1.2" />
				`;
			case 'copy':
				return `
					<rect x="9" y="9" width="11" height="11" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-linecap="round" stroke-linejoin="round"/>
				`;
			case 'donation':
				return `
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					/>`;
			case 'earth':
				return `
					<svg fill="currentColor" viewBox="0 0 512 512" id="icon" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" style="--darkreader-inline-fill: var(--darkreader-background-000000, #000000);"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M479,205.09a4.24,4.24,0,0,0-.1-.46,228.14,228.14,0,0,0-48.29-96.17,5.63,5.63,0,0,0-1.22-1.44A228.24,228.24,0,0,0,256,27.33l-1.71,0h-.92l-.22,0A228.32,228.32,0,0,0,193.49,36a5.59,5.59,0,0,0,3,10.75,217.52,217.52,0,0,1,53.12-8.12l5.6,14.18a.77.77,0,0,0,.07.16,105.67,105.67,0,0,0,97.13,63.91,5.59,5.59,0,1,0,0-11.17,94.52,94.52,0,0,1-86.84-57.08l-4-10a217,217,0,0,1,151.4,67.12H389.11a5.59,5.59,0,1,0,0,11.17H423a217.2,217.2,0,0,1,43.25,83.57H420.08A40.89,40.89,0,0,0,382,226.12a29.75,29.75,0,0,1-27.71,18.7h-10.1a64,64,0,0,0-62.58,77.75,64.44,64.44,0,0,0,62.58,50.35h38.2a5.59,5.59,0,1,0,0-11.17h-38.2a53.19,53.19,0,0,1-51.66-41.57A52.88,52.88,0,0,1,344.19,256h10.1a40.87,40.87,0,0,0,38.07-25.69,29.77,29.77,0,0,1,27.72-18.7h48.86A217.46,217.46,0,0,1,446,361.75H416a5.59,5.59,0,1,0,0,11.17h23.38A217.53,217.53,0,0,1,256,473.5c-80.14,0-150.28-43.57-188-108.26h47.26a114.91,114.91,0,0,1,79.57,31.83l3.52,3.35a57.89,57.89,0,0,0,40.09,16h19.72a47.13,47.13,0,0,1,40.51,23.2A5.59,5.59,0,0,0,308.3,434a58.34,58.34,0,0,0-50.15-28.73H238.43A46.79,46.79,0,0,1,206,392.33L202.53,389a126,126,0,0,0-87.28-34.91H61.9A217.88,217.88,0,0,1,84.47,122h29.59a29.77,29.77,0,0,1,27.72,18.7,40.9,40.9,0,0,0,38.07,25.69H190a52.88,52.88,0,0,1,45.5,79.83,5.59,5.59,0,0,0,9.62,5.69A64.07,64.07,0,0,0,190,155.19H179.85a29.76,29.76,0,0,1-27.71-18.69,40.88,40.88,0,0,0-38.08-25.69H93.86a220.24,220.24,0,0,1,49.71-41,5.59,5.59,0,0,0-5.78-9.56A228.53,228.53,0,0,0,27.33,256,227.21,227.21,0,0,0,53.19,361.54a5.35,5.35,0,0,0,.74,1.4C92.37,435.29,168.52,484.67,256,484.67c84.26,0,158-45.81,197.68-113.84a5.29,5.29,0,0,0,.88-1.51A228.63,228.63,0,0,0,479,205.09Z"></path><path d="M58.42,272.13a5.59,5.59,0,0,0,0,11.17H190a5.59,5.59,0,0,0,0-11.17Z"></path></g>`;
			case 'info':
				return `
					<path d="M12 22A10 10 0 1012 2a10 10 0 000 20z" stroke-linejoin="round"/>
					<path d="M12 10v7" stroke-linecap="round"/>
					<path d="M12 7h.01" stroke-linecap="round"/>
				`;
			case 'lightning':
				return `
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
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
	stroke-width={strokeWidth}
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
