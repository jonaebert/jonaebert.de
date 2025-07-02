<script lang="ts">
	import { page } from '$app/stores';
	import Image from '$lib/components/image.svelte';
</script>

<div class="flex min-h-screen items-center justify-center container py-5">
	<div
		class="bg-grey-50 rounded-lg md:rounded-xl overflow-hidden max-w-8xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg"
	>
		<!-- Bildbereich -->
		<div class="relative w-full h-64 md:h-auto">
			<Image src="/contact/teaser.svg" alt="Teaser Bild" classNames="w-full h-full object-cover" />
		</div>

		<!-- Textbereich -->
		<div class="flex flex-col justify-center border border-grey-100 py-6 container">
			<h1 class="text-3xl md:text-4xl font-bold text-secondary-900 italic font-poppins">
				{$page.status}
			</h1>
			<h2 class="text-2xl md:text-3xl font-bold text-black italic font-poppins">
				{#if $page.status == '404'}
					Deine Seite gibt es nicht.<br />Was willst du hier?
				{:else}
					{$page.error.message}
				{/if}
			</h2>
		</div>
	</div>
</div>
