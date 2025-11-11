<script lang="ts">
	export let isDarkMode: boolean;
	export let toggleDarkMode: () => void;

	/* Berechne Sterne */
	let stars: any[] | null | undefined = [];

	function createStar() {
		return {
			left: Math.random() * 60, // links vom Mond
			top: Math.random() * 100, // volle Höhe
			size: Math.random() * 2 + 1.5,
			opacity: 0.4 + Math.random() * 0.6,
			delay: Math.random() * 2,
			duration: 2 + Math.random() * 3
		};
	}

	// Reaktive Erzeugung bei jedem Toggle
	$: if (isDarkMode) {
		stars = Array.from({ length: 35 }, () => createStar());
	}
</script>

<label
	class="group relative block text-xs md:text-[16px] select-none cursor-pointer transition-all duration-300 ease-in-out"
	aria-label="Toggle Theme"
>
	<input type="checkbox" class="hidden" bind:checked={isDarkMode} on:change={toggleDarkMode} />

	<!-- Container -->
	<div
		class="relative w-[5.625em] h-[2.5em] rounded-[6.25em] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)] {isDarkMode
			? 'bg-[#1D1F2CBF]'
			: 'bg-[#3D7EAEBF]'}"
	>
		<!-- Wolken -->
		<div
			class="absolute left-[0.312em] w-[1.25em] h-[1.25em] bg-[#F3FDFF] rounded-[6.25em]
			shadow-[0.937em_0.312em_#F3FDFF,-0.312em_-0.312em_#AACADF,1.437em_0.375em_#F3FDFF,0.5em_-0.125em_#AACADF,2.187em_0_#F3FDFF,1.25em_-0.062em_#AACADF,2.937em_0.312em_#F3FDFF,2em_-0.312em_#AACADF,3.625em_-0.062em_#F3FDFF,2.625em_0em_#AACADF,4.5em_-0.312em_#F3FDFF,3.375em_-0.437em_#AACADF,4.625em_-1.75em_0_0.437em_#F3FDFF,4em_-0.625em_#AACADF,4.125em_-2.125em_0_0.437em_#AACADF] transition-all duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)] {isDarkMode
				? 'bottom-[-4.062em]'
				: 'bottom-[-0.625em]'}"
		></div>

		<!-- Sterne -->
		{#if isDarkMode}
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				{#each stars as star}
					<div
						class="absolute rounded-full bg-white star"
						style="
							width: {star.size}px;
							height: {star.size}px;
							top: {star.top}%;
							left: {star.left}%;
							opacity: {star.opacity};
							animation-delay: {star.delay}s;
							animation-duration: {star.duration}s;
						"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Kreis -->
		<div
			class="absolute flex w-[3.375em] h-[3.375em] top-[-0.4275em] md:top-[-0.408em] rounded-[6.25em] bg-white/10 shadow-[inset_0_0_0_3.375em_rgba(255,255,255,0.1),0_0_0_0.625em_rgba(255,255,255,0.1)] transition-all duration-300 ease-[cubic-bezier(0,-0.02,0.35,1.17)] {isDarkMode
				? 'left-[calc(100%-0.3575em-2.575em)]'
				: 'left-[-0.3375em]'}"
		>
			<div
				class="relative m-auto w-[2.125em] h-[2.125em] rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0,-0.02,0.4,1.25)] {isDarkMode
					? 'bg-[#C4C9D1]'
					: 'bg-[#ECCA2F]'}"
			>
				<!-- Mondflecken -->
				{#if isDarkMode}
					<div
						class="absolute top-[0.75em] left-[0.312em] w-[0.75em] h-[0.75em] rounded-full bg-[#959DB1]"
					></div>
					<div
						class="absolute top-[0.937em] left-[1.375em] w-[0.375em] h-[0.375em] rounded-full bg-[#959DB1]"
					></div>
					<div
						class="absolute top-[0.312em] left-[0.812em] w-[0.25em] h-[0.25em] rounded-full bg-[#959DB1]"
					></div>
				{/if}
			</div>
		</div>
	</div>
</label>
