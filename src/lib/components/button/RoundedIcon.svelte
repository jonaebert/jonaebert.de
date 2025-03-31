<script lang="ts">
    import Fa from "svelte-fa";

    export let href = "";
    export let target = "";
    export let icon;
    export let colors = {
        default: {
            icon:           "",
            background:     "",
            border:         "",
        },
        focus: {
            icon:           "",
            background:     "",
            border:         "",
        },
        hover: {
            icon:           "",
            background:     "",
            border:         "",
        },
        disabled: {
            icon:           "",
            background:     "",
            border:         "",
        },
    };
    export let disabled = false;

    // Funktion zum Anwenden der Farbklassen
    function applyColorClasses(colors) {
        return {
            default: {
                icon: colors.default.icon ? "text-" + colors.default.icon : "text-black",
                background: colors.default.background ? "bg-" + colors.default.background : "bg-white",
                border: colors.default.border ? "border-" + colors.default.border : "border-je-grey-300",
            },
            focus: {
                icon: colors.focus.icon ? "focus:text-" + colors.focus.icon : "focus:text-black",
                background: colors.focus.background ? "focus:bg-" + colors.focus.background : "focus:bg-white",
                border: colors.focus.border ? "focus:border-" + colors.focus.border : "focus:border-je-himmel",
            },
            hover: {
                icon: colors.hover.icon ? "hover:text-" + colors.hover.icon : "hover:text-black",
                background: colors.hover.background ? "hover:bg-" + colors.hover.background : "hover:bg-je-sonne",
                border: colors.hover.border ? "hover:border-" + colors.hover.border : "hover:border-transparent",
            },
            disabled: {
                icon: colors.disabled.icon ? "disabled:text-" + colors.disabled.icon : "disabled:text-white",
                background: colors.disabled.background ? "disabled:bg-" + colors.disabled.background : "disabled:bg-je-grey-300",
                border: colors.disabled.border ? "disabled:border-" + colors.disabled.border : "disabled:border-transparent",
            },
        };
    }
    // Farben anwenden
    const appliedColors = applyColorClasses(colors);
</script>

<button class="inline-flex items-center justify-center p-3 border-[1px] focus:border-[2px] disabled:cursor-not-allowed rounded-full transition-transform duration-400 hover:scale-110 {appliedColors.default.icon} {appliedColors.focus.icon} {appliedColors.hover.icon} {appliedColors.disabled.icon} {appliedColors.default.background} {appliedColors.focus.background} {appliedColors.hover.background} {appliedColors.disabled.background} {appliedColors.default.border} {appliedColors.focus.border} {appliedColors.hover.border} {appliedColors.disabled.border}" title={icon.iconName} on:click={() => window.open(href, target)} {disabled}>
    <div class="w-5 h-5 flex justify-center">
        <Fa {icon} size="lg" />
    </div>
</button>