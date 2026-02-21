<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	export let siteKey: string;
	export let theme: 'auto' | 'light' | 'dark' = 'auto';

	export let ariaLabel: string = 'turnstile-label';

	// Design
	export let classes: string = '';
	export let compact: boolean = false;

	const dispatch = createEventDispatcher<{ token: string }>();

	let el: HTMLDivElement | null = null;
	let widgetId: string | null = null;

	declare global {
		interface Window {
			turnstile?: {
				render: (container: Element | string, params: any) => string;
				reset: (widgetId?: string) => void;
				remove: (widgetId: string) => void;
			};
		}
	}

	function loadScript(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (window.turnstile) return resolve();
			const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile="1"]');
			if (existing) {
				if (window.turnstile) return resolve();
				existing.addEventListener('load', () => resolve(), { once: true });
				existing.addEventListener('error', () => reject(new Error('Turnstile script failed')), {
					once: true
				});
				return;
			}
			const s = document.createElement('script');
			s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
			s.defer = true;
			s.async = true;
			s.dataset.turnstile = '1';
			s.onload = () => resolve();
			s.onerror = () => reject(new Error('Turnstile script failed'));
			document.head.appendChild(s);
		});
	}

	export function reset() {
		if (window.turnstile) window.turnstile.reset(widgetId ?? undefined);
		dispatch('token', '');
	}

	onMount(async () => {
		if (!el) return;
		try {
			await loadScript();
		} catch (err) {
			console.error('Turnstile failed to load:', err);
			dispatch('token', '');
			return;
		}

		widgetId =
			window.turnstile?.render(el, {
				sitekey: siteKey,
				theme,
				callback: (token: string) => dispatch('token', token),
				'expired-callback': () => dispatch('token', ''),
				'error-callback': () => dispatch('token', '')
			}) ?? null;

		return () => {
			if (widgetId != null && window.turnstile) {
				window.turnstile.remove(widgetId);
			}
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://challenges.cloudflare.com" />
</svelte:head>

<div class={`w-full ${classes}`} role="group" aria-labelledby={ariaLabel}>
	<div class="w-full overflow-x-auto">
		<div class={`flex ${compact ? 'justify-start' : 'justify-center'} min-w-75`}>
			<div bind:this={el}></div>
		</div>
	</div>
</div>
