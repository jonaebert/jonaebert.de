<script lang="ts">
    import RoundedIcon from "$lib/components/button/RoundedIcon.svelte"
    import { faInstagram, faThreads, faYoutube, faTiktok, faLinkedinIn, faGithub, faMastodon, faBluesky, faFacebook } from "@fortawesome/free-brands-svg-icons"; // For new Icons: https://fontawesome.com/search
    // Farben
    let colors = {
        default: {
            icon: "white",
            background: "bg-secondary-800",
            border: "gray-300",
        },
        focus: {
            icon: "black",
            background: "bg-white",
            border: "himmel-600",
        },
        hover: {
            icon: "secondary-900",
            background: "bg-sun-600",
            border: "transparent",
        },
        disabled: {
            icon: "white",
            background: "bg-gray-300",
            border: "transparent",
        },
    };
</script>

<div class="gap-x-3.5 gap-y-3.5 grid grid-cols-4 md:grid-cols-4">
    <div><RoundedIcon href="https://www.instagram.com/jonaebertbs" icon={faInstagram} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://www.threads.net/@jonaebertbs" icon={faThreads} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://www.facebook.com/profile.php?id=61585717786862" icon={faFacebook} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://mastodon.social/@jonaebertbs" icon={faMastodon} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://bsky.app/profile/jonaebertbs.bsky.social" icon={faBluesky} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://www.youtube.com/@jonaebertbs" icon={faYoutube} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://www.tiktok.com/@jonaebertbs" icon={faTiktok} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://www.linkedin.com/in/jonaebert" icon={faLinkedinIn} target="_blank" {colors} /></div>
    <div><RoundedIcon href="https://github.com/jonaebert" icon={faGithub} target="_blank" {colors} /></div>
</div>