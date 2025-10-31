<script lang="ts">
	export let eventStartDate: Date;
	export let eventEndDate: Date;
	export let eventName: string = 'BITTE EVENT TEXT EINTRAGEN';
	export let preWord: string;
	export let nowWord: string;
	
	const timeUntilStart: number = calculateDays(eventStartDate);
	const timeUntilEnd: number = calculateDays(eventEndDate);
	
	let content: string;
	let show: boolean = false;

	// Funktion zur Berechnung der verbleibenden Tage
	function calculateDays(date: Date): number {
		const today = new Date();
		const timeDiff = date.getTime() - today.getTime();

		return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Umrechnung in Tage
	}

	if (timeUntilStart > 0) {
		show = true;
		if (timeUntilStart > 1) {
			content = `Noch ${timeUntilStart} Tage bis ${preWord} ${eventName}`;
		} else {
			content = `Noch ${timeUntilStart} Tag bis ${preWord} ${eventName}`;
		}
	} else if (timeUntilStart <= 0) {
		show = true;
		content = `Heute ist ${nowWord} ${eventName}`;
	} else {
		show = false;
	}
</script>

{#if show}
	<div class="overflow-hidden whitespace-nowrap bg-yellow-300 bg-sun-600 text-black py-2 font-bold uppercase font-montserrat">
		<div class="inline-block animate-marquee">
			<div class="flex">
				<div class="flex">
					{#each Array(10) as _, i}
						<span>{content}</span>
						<span class="mx-4">•</span>
					{/each}
				</div>
				<!-- Duplizierter Inhalt für nahtlosen Übergang -->
				<div class="flex">
					{#each Array(10) as _, i}
						<span>{content}</span>
						<span class="mx-4">•</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<style>
		@keyframes marquee {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(-50%);
			} /* Verschiebt nur die Hälfte, um die Wiederholung zu erzeugen */
		}

		.animate-marquee {
			display: inline-block;
			animation: marquee 60s linear infinite;
			white-space: nowrap;
		}
	</style>
{/if}
