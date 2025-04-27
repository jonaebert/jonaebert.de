<script lang="ts">
    export let text: string = '';
    export let link: string = '';
    export let clickable: boolean = false;
    export let resize: number = 105;
    export let target: string = '_blank';
</script>

{#if (clickable && link)}
    <a class="text-sm rounded-full bg-secondary-600 text-neutral-600 py-1 px-3 mr-2 hover:text-neutral-600 hover:no-underline transition-transform duration-500 hover:scale-{resize}" href={link} target={target}>
        <div>{text}</div>
    </a>
{:else}
    <div class="text-sm rounded-full bg-secondary-600 text-neutral-600 py-1 px-3 mr-2">{text}</div>
{/if}