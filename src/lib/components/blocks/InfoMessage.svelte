<script lang="ts">
    export let message = '';
</script>

<div class="flex justify-center items-center">
    <div class="flex border-2 p-4 rounded-full border-himmel-700 bg-himmel-600 bg-opacity-20 text-white font-semibold shadow-lg flex-col items-center">
        <p class="w-full text-center">
            {@html message}
        </p>
    </div>
</div>