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

    // Funktion zum Anwenden der Farbklassen
    function applyColorClasses(colors: { default: any; focus: any; hover: any; }) {
        return {
            default: {
                icon: colors.default.icon ? "text-" + colors.default.icon : "text-black",
                background: colors.default.background ? colors.default.background : "bg-white",
                border: colors.default.border ? "border-" + colors.default.border : "border-gray-300",
            },
            focus: {
                icon: colors.focus.icon ? "focus:text-" + colors.focus.icon : "focus:text-black",
                background: colors.focus.background ? "focus:" + colors.focus.background : "focus:bg-white",
                border: colors.focus.border ? "focus:border-" + colors.focus.border : "focus:border-himmel-600",
            },
            hover: {
                icon: colors.hover.icon ? "hover:text-" + colors.hover.icon : "hover:text-black",
                background: colors.hover.background ? "hover:" + colors.hover.background : "hover:bg-sun-600",
                border: colors.hover.border ? "hover:border-" + colors.hover.border : "hover:border-transparent",
            }
        };
    }
    // Farben anwenden
    const appliedColors = applyColorClasses(colors);
</script>

<button class="inline-flex items-center justify-center p-3 border focus:border-2 rounded-full transition-transform duration-400 hover:scale-110 cursor-pointer {appliedColors.default.icon} {appliedColors.focus.icon} {appliedColors.hover.icon} {appliedColors.default.background} {appliedColors.focus.background} {appliedColors.hover.background} {appliedColors.default.border} {appliedColors.focus.border} {appliedColors.hover.border}" title={icon.iconName} on:click={() => window.open(href, target)}>
    <div class="w-5 h-5 flex justify-center">
        <Fa {icon} size="lg" />
    </div>
</button>