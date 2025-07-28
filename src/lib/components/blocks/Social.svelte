<script lang="ts">
    import RoundedIcon from "$lib/components/button/RoundedIcon.svelte"
    import { faInstagram, faThreads, faYoutube, faTiktok, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"; // For new Icons: https://fontawesome.com/search
    // Farben
    let colors = {
        default: {
            icon: "white",
            background: "secondary-900",
            border: "grey-300",
        },
        focus: {
            icon: "black",
            background: "white",
            border: "himmel-600",
        },
        hover: {
            icon: "secondary-900",
            background: "sun-600",
            border: "transparent",
        },
        disabled: {
            icon: "white",
            background: "grey-300",
            border: "transparent",
        },
    };
    let disabled = false;
</script>

<div class="gap-x-3.5 gap-y-3.5 grid grid-cols-3 md:grid-cols-6">
    <div><RoundedIcon href="https://www.instagram.com/jonaebertbs" icon={faInstagram} target="_blank" {colors} {disabled} /></div>
    <div><RoundedIcon href="https://www.threads.net/@jonaebertbs" icon={faThreads} target="_blank" {colors} {disabled} /></div>
    <div><RoundedIcon href="https://www.youtube.com/@jonaebert" icon={faYoutube} target="_blank" {colors} {disabled} /></div>
    <div><RoundedIcon href="https://www.tiktok.com/@jona_ebert" icon={faTiktok} target="_blank" {colors} {disabled} /></div>
    <div><RoundedIcon href="https://www.linkedin.com/in/jonaebert" icon={faLinkedinIn} target="_blank" {colors} {disabled} /></div>
    <div><RoundedIcon href="https://github.com/jonaebert" icon={faGithub} target="_blank" {colors} {disabled} /></div>
</div>