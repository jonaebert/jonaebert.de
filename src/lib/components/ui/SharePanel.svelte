<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faThreads,
		faLinkedinIn,
		faMastodon,
		faBluesky,
		faFacebookF
	} from '@fortawesome/free-brands-svg-icons';
	import Icon from '../icons/Icon.svelte';

	export let url: string;
	export let title: string = '';
	export let text: string = '';

	type ShareItem = {
		label: string;
		icon: any;
		href: string;
		mode: 'share' | 'profile';
	};

	function enc(v: string) {
		return encodeURIComponent(v);
	}

	function shareText() {
		const parts = [title?.trim(), text?.trim(), url].filter(Boolean);
		return parts.join('\n');
	}

	function items(): ShareItem[] {
		const t = shareText();

		return [
			// ✅ share intents
			{
				label: 'Threads',
				icon: faThreads,
				href: `https://www.threads.net/intent/post?text=${enc(t)}&url=${enc(url)}`,
				mode: 'share'
			},
			{
				label: 'Facebook',
				icon: faFacebookF,
				href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(title)}`,
				mode: 'share'
			},
			{
				label: 'Mastodon',
				icon: faMastodon,
				// Instance chooser helper → sehr verbreitet
				href: `https://toot.kytta.dev/?text=${enc(t)}`,
				mode: 'share'
			},
			{
				label: 'Bluesky',
				icon: faBluesky,
				href: `https://bsky.app/intent/compose?text=${enc(t)}`,
				mode: 'share'
			},
			{
				label: 'LinkedIn',
				icon: faLinkedinIn,
				href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
				mode: 'share'
			}
		];
	}

	let copied = false;
	let copyBusy = false;

	async function copyToClipboard() {
		if (copyBusy) return;
		copyBusy = true;

		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 1400);
		} catch {
			try {
				const el = document.createElement('textarea');
				el.value = url;
				el.style.position = 'fixed';
				el.style.left = '-9999px';
				document.body.appendChild(el);
				el.select();
				document.execCommand('copy');
				document.body.removeChild(el);

				copied = true;
				setTimeout(() => (copied = false), 1400);
			} catch {
				// noop
			}
		} finally {
			copyBusy = false;
		}
	}
</script>

<!-- Share Panel (Sidebar Card) -->
<div
	class="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900/40 p-4"
>
	<div class="flex items-center justify-between gap-3">
		<h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Teilen</h2>

		<!-- Clipboard -->
		<button
			type="button"
			on:click={copyToClipboard}
			disabled={copyBusy}
			class="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium
			       bg-accent text-white hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer hover:scale-105 transition-transform ease-in-out duration-300"
			title="Link in die Zwischenablage"
		>
			{#if copied}
				<Icon name="check" classes="h-4 w-4" />
				Kopiert
			{:else}
				<Icon name="copy" classes="h-4 w-4" strokeWidth={2} />
				Kopieren
			{/if}
		</button>
	</div>

	<!-- Social Share -->
	<div
		class="mt-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-3"
	>
		<div class="text-[11px] text-zinc-500 dark:text-zinc-400">Soziale Netzwerke</div>

		<div class="mt-2 grid grid-cols-4 gap-2">
			{#each items() as it}
				<a
					href={it.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={it.mode === 'share' ? `Teilen auf ${it.label}` : `${it.label} Profil öffnen`}
					title={it.mode === 'share' ? `Teilen auf ${it.label}` : `${it.label} (öffnet Profil)`}
					class="inline-flex h-11 w-11 items-center justify-center rounded-full
					       bg-accent text-white dark:text-emerald-950 transition-all duration-300
					       hover:scale-110 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
				>
					<Fa icon={it.icon} size="lg" />
				</a>
			{/each}
		</div>

		<div class="mt-3 text-xs text-zinc-700 dark:text-zinc-300 select-all wrap-anywhere">
			{url}
		</div>
	</div>
</div>
