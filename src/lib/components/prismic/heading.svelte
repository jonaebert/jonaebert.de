<script lang="ts">
    export let slice;
</script>

<div>
    {#if slice.type === 'heading1'}
        <h1 class="text-3xl xl:text-5xl font-bold text-secondary-900 font-poppins italic my-2">{slice.text}</h1>
    {:else if slice.type === 'heading2'}
        <h2 class="text-3xl md:text-4xl font-bold text-secondary-900 font-poppins italic my-2">{slice.text}</h2>
    {:else if slice.type === 'heading3'}
        <h3 class="text-2xl md:text-3xl font-bold text-black font-poppins italic my-2">{slice.text}</h3>
    {:else if slice.type === 'heading4'}
        <h4 class="text-xl md:text-2xl font-bold text-black font-poppins italic my-2">{slice.text}</h4>
    {:else if slice.type === 'heading5'}
        <h5 class="text-lg md:text-xl font-bold text-black font-poppins italic my-2">{slice.text}</h5>
    {:else if slice.type === 'heading6'}
        <h6 class="text-md md:text-lg font-bold text-black font-poppins italic my-2">{slice.text}</h6>
    {:else}
        <pre class="text-red-700">Heading not found!</pre>
    {/if}
</div>