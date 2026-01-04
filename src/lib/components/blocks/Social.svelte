<script lang="ts">
	import RoundedIcon from '$lib/components/button/RoundedIcon.svelte';
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
	} from '@fortawesome/free-brands-svg-icons'; // For new Icons: https://fontawesome.com/search

	// Social links
	const socialLinks = [
		{ href: 'https://www.instagram.com/jonaebertbs', icon: faInstagram },
		{ href: 'https://www.threads.net/@jonaebertbs', icon: faThreads },
		{ href: 'https://www.facebook.com/profile.php?id=61585717786862', icon: faFacebookF },
		{ href: 'https://mastodon.social/@jonaebertbs', icon: faMastodon },
		{ href: 'https://bsky.app/profile/jonaebertbs.bsky.social', icon: faBluesky },
		{ href: 'https://www.youtube.com/@jonaebertbs', icon: faYoutube },
		{ href: 'https://www.tiktok.com/@jonaebertbs', icon: faTiktok },
		{ href: 'https://www.linkedin.com/in/jonaebert', icon: faLinkedinIn },
		{ href: 'https://github.com/jonaebert', icon: faGithub }
	];

	// Farben
	let colors = {
		default: {
			icon: 'text-white',
			background: 'bg-secondary-800',
			border: 'border-gray-300'
		},
		focus: {
			icon: 'text-black',
			background: 'bg-white',
			border: 'border-himmel-600'
		},
		hover: {
			icon: 'text-secondary-900',
			background: 'bg-sun-600',
			border: 'border-transparent'
		}
	};
</script>

<div class="gap-x-3.5 gap-y-3.5 grid grid-cols-3 md:grid-cols-5">
	{#each socialLinks as { href, icon }}
		<RoundedIcon {href} {icon} target="_blank" {colors} />
	{/each}
</div>
