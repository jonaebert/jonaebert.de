<script lang="ts">
	let daysUntil: number;
	const eventDate: Date = new Date('2025-08-09');
	let content: string;
	const eventName: string = 'CSD Braunschweig 🏳️‍🌈';
	const preWord: string = 'zum';
	const nowWord: string = 'der';
	let show: boolean = false;

	// Funktion zur Berechnung der verbleibenden Tage
	function calculateDaysUntil() {
		const today = new Date();
		const timeDiff = eventDate.getTime() - today.getTime();
		return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Umrechnung in Tage
	}

	// Prüfen, ob Code im Browser ausgeführt wird
	if (typeof window !== 'undefined') {
		daysUntil = calculateDaysUntil();

		// Optional: Countdown täglich aktualisieren
		const interval = setInterval(
			() => {
				daysUntil = calculateDaysUntil();
			},
			24 * 60 * 60 * 1000
		); // Täglich aktualisieren

		// Aufräumen bei Seitenwechsel (falls benötigt)
		if (import.meta.hot) {
			import.meta.hot.dispose(() => clearInterval(interval));
		}
	} else {
		// Für SSR-Rendering kann ein Standardwert verwendet werden
		daysUntil = calculateDaysUntil();
	}

	if (daysUntil > 0) {
		show = true;
		if (daysUntil > 1) {
			content = `Noch ${daysUntil} Tage bis ${preWord} ${eventName}`;
		} else {
			content = `Noch ${daysUntil} Tag bis ${preWord} ${eventName}`;
		}
	} else if (daysUntil == 0) {
		show = true;
		content = `Heute ist ${nowWord} ${eventName}`;
	} else {
		show = false;
		content = 'Aktuell keine Wahl!';
	}
</script>

{#if daysUntil >= 0}
	<div
		class="overflow-hidden whitespace-nowrap bg-yellow-300 bg-sun-600 text-black py-2 font-bold uppercase font-montserrat"
	>
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
