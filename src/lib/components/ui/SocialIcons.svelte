<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faInstagram,
		faThreads,
		faYoutube,
		faTiktok,
		faLinkedinIn,
		faGithub,
		faMastodon,
		faBluesky,
		faFacebookF
	} from '@fortawesome/free-brands-svg-icons';

	type SocialLink = {
		href: string;
		icon: any;
		label: string;
	};

	const socialLinks: SocialLink[] = [
		{ href: 'https://www.instagram.com/jonaebertbs', icon: faInstagram, label: 'Instagram' },
		{ href: 'https://www.threads.net/@jonaebertbs', icon: faThreads, label: 'Threads' },
		{
			href: 'https://www.facebook.com/profile.php?id=61585717786862',
			icon: faFacebookF,
			label: 'Facebook'
		},
		{ href: 'https://mastodon.social/@jonaebertbs', icon: faMastodon, label: 'Mastodon' },
		{ href: 'https://bsky.app/profile/jonaebertbs.bsky.social', icon: faBluesky, label: 'Bluesky' },
		{ href: 'https://www.youtube.com/@jonaebertbs', icon: faYoutube, label: 'YouTube' },
		{ href: 'https://www.tiktok.com/@jonaebertbs', icon: faTiktok, label: 'TikTok' },
		{ href: 'https://www.linkedin.com/in/jonaebert', icon: faLinkedinIn, label: 'LinkedIn' },
		{ href: 'https://github.com/jonaebert', icon: faGithub, label: 'GitHub' }
	];
</script>

<div class="grid grid-cols-4 sm:grid-cols-5 gap-3">
	{#each socialLinks as { href, icon, label }}
		<a
			{href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			title={label}
			class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white dark:text-emerald-950 transition-all duration-300 hover:scale-110 hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
		>
			<Fa {icon} size="lg" />
		</a>
	{/each}
</div>
