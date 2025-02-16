<script lang="ts">
    let daysUntilElection: number
    const electionDate: Date = new Date('2025-02-23')
    let content: string
    const electionType: string = "Bundestagswahl"
    let show: boolean = false

    // Funktion zur Berechnung der verbleibenden Tage
    function calculateDaysUntilElection() {
        const today = new Date()
        const timeDiff = electionDate.getTime() - today.getTime()
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) // Umrechnung in Tage
    }

    // Prüfen, ob Code im Browser ausgeführt wird
    if (typeof window !== 'undefined') {
        daysUntilElection = calculateDaysUntilElection()

        // Optional: Countdown täglich aktualisieren
        const interval = setInterval(() => {
            daysUntilElection = calculateDaysUntilElection()
        }, 24 * 60 * 60 * 1000) // Täglich aktualisieren

        // Aufräumen bei Seitenwechsel (falls benötigt)
        if (import.meta.hot) {
            import.meta.hot.dispose(() => clearInterval(interval))
        }
    } else {
        // Für SSR-Rendering kann ein Standardwert verwendet werden
        daysUntilElection = calculateDaysUntilElection()
    }

    if (daysUntilElection > 0) {
        show = true
        if (daysUntilElection > 1) {
            content = `Noch ${daysUntilElection} Tage bis zur ${electionType}!`
        } else {
            content = `Noch ${daysUntilElection} Tag bis zur ${electionType}!`
        }
    } else if (daysUntilElection == 0) {
        show = true
        content = `Heute ist die ${electionType}!`
    } else {
        show = false
        content = "Aktuell keine Wahl!"
    }
</script>

{#if daysUntilElection >= 0}
    <div class="overflow-hidden whitespace-nowrap bg-yellow-300 text-black py-2 font-bold uppercase font-montserrat">
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
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* Verschiebt nur die Hälfte, um die Wiederholung zu erzeugen */
        }

        .animate-marquee {
            display: inline-block;
            animation: marquee 60s linear infinite;
            white-space: nowrap;
        }
    </style>
{/if}