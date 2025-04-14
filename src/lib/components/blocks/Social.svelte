<script lang="ts">
    import RoundedIcon from "$lib/components/button/RoundedIcon.svelte"
    import { faInstagram, faThreads, faYoutube, faTiktok, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"; // For new Icons: https://fontawesome.com/search
    // Farben
    let colors = {
        default: {
            icon: "black",
            background: "white",
            border: "je-grey-300",
        },
        focus: {
            icon: "black",
            background: "white",
            border: "je-himmel",
        },
        hover: {
            icon: "black",
            background: "je-sonne",
            border: "transparent",
        },
        disabled: {
            icon: "white",
            background: "je-grey-300",
            border: "transparent",
        },
    };
    let disabled = false;
</script>

<ul class="gap-x-3.5 gap-y-3 grid grid-cols-3 md:grid-cols-6">
    <li><RoundedIcon href="https://www.instagram.com/jonaebertbs" icon={faInstagram} target="_blank" {colors} {disabled} /></li>
    <li><RoundedIcon href="https://www.threads.net/@jonaebertbs" icon={faThreads} target="_blank" {colors} {disabled} /></li>
    <li><RoundedIcon href="https://www.youtube.com/@jonaebert" icon={faYoutube} target="_blank" {colors} {disabled} /></li>
    <li><RoundedIcon href="https://www.tiktok.com/@jona_ebert" icon={faTiktok} target="_blank" {colors} {disabled} /></li>
    <li><RoundedIcon href="https://www.linkedin.com/in/jonaebert" icon={faLinkedinIn} target="_blank" {colors} {disabled} /></li>
    <li><RoundedIcon href="https://github.com/jonaebert" icon={faGithub} target="_blank" {colors} {disabled} /></li>
</ul>