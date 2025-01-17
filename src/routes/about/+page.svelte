<script lang="ts">
	import Social from "$lib/components/blocks/Social.svelte"
	import Image from "$lib/components/image.svelte"
	import { name, pronouns } from "$lib/store"
	import { FormatDate } from "$lib/util/date"
	import Tags from "$lib/components/blocks/Tags.svelte"
	export let data
	const { headings, items } = data.props


	// Get current month + year
	const now = new Date()
    const nowFormatted = now.getFullYear() + "-" + (now.getMonth()+1).toString().padStart(2, '0')

	// Validate date
	//
	// @param {string} start
	// @param {string} end
	//
	function valDate(start: string, end: string) {
		let date	=	'date not found'
		let active	=	false

		if (start && end) {
			date = FormatDate(start,'month') + ' ' + FormatDate(start,'year') + ' - ' + FormatDate(end,'month') + ' ' + FormatDate(end,'year')
		} else if (start && !end) {
			if (start <= nowFormatted) {
				date = 'seit '
				active = true
			} else if (start > nowFormatted) {
				date = 'ab '
			}
			date = date + FormatDate(start,'month') + ' ' + FormatDate(start,'year')
		}

		return {date, active}
	}
</script>

<div class="flex flex-col items-center justify-center p-5 min-h-[95vh]">
	<div class="container mx-auto">
		<div class="bg-je-mystical-nachtblau-900 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-lg relative">
			<div class="p-8 font-poppins flex-1 justify-center flex flex-col text-left lg:text-center relative z-10">
				<h1 class="text-5xl font-bold text-je-magical-fata_morgana mt-2 mb-2">{ name } ({ pronouns })</h1>
				<div class="italic font-montserrat">Geboren 374 ppm</div>
				<div class="mb-4 md:mr-4 flex-1 flex flex-col justify-evenly text-balance">
					<h2 class="text-3xl font-semibold mb-4">Vordenker im Einklang von Technik und Natur</h2>
					<div class="mb-4 font-montserrat">
						In einer Ära, in der digitale Innovationen das Zeitalter prägen, sehe ich mich als Verfechter einer Zukunft, in der technologischer Fortschritt und ökologische Nachhaltigkeit eine Symbiose eingehen. Mein Engagement für den Klimaschutz ist geprägt von der Überzeugung, dass wir alle eine Rolle in der Bewahrung unseres Planeten spielen.
					</div>
					<div class="mb-4 font-montserrat">
						Als IT-Experte mit einem breiten Spektrum an Fähigkeiten habe ich mich in verschiedenen Sektoren bewährt. Die Möglichkeit, meine Kenntnisse für den Umweltschutz einzusetzen, ist ein spannendes Feld, das ich erkunden möchte, um die Schnittstelle zwischen IT und Nachhaltigkeit zu stärken.
					</div>
					<div class="mb-4 font-montserrat">
						Meine politische Tätigkeit bei BÜNDNIS 90/DIE GRÜNEN in Braunschweig ist Ausdruck meines Bestrebens, auf lokaler Ebene positive Veränderungen zu bewirken. Ich trete für eine Politik ein, die den Herausforderungen des Klimawandels mit Weitsicht begegnet, für eine Wirtschaft, die Ressourcen schont, und für ein Miteinander, das den Schutz unserer natürlichen Lebensgrundlagen ernst nimmt.
					</div>
					<div class="mb-4 font-montserrat">
						Ich bin fest davon überzeugt, dass jeder Einzelne die Kraft hat, die Welt zu verändern. Durch mein Engagement hoffe ich, andere zu inspirieren, sich ebenfalls für den Umweltschutz stark zu machen und gemeinsam einen Weg in eine nachhaltige Zukunft zu ebnen.
					</div>
				</div>
				<div class="pb-8">
					<Social />
				</div>
			</div>
			<div class="flex-1 relative flex items-end justify-center">
				<div class="absolute inset-0 bg-je-mystical-waldtiefe-700 transform -skew-y-12 rounded-3xl"></div>
				<Image src="/portrait/portrait_6_clean.webp" alt="Portrait von {name}" classNames="relative w-[70vh] rounded-lg"/>
			</div>
		</div>
	</div>
</div>

<!-- Curriculum vitae -->
<div class="container pb-12">
	<h2 class="text-4xl font-bold text-je-magical-fata_morgana font-poppins">{headings.main}</h2>
	{#each headings.sections as section}
		<h3 class="text-3xl font-bold text-je-magical-fata_morgana font-poppins">{section.title}</h3>
		{#if section.key == 'skills'}
		<!-- Skills -->
			{#each items[section.key] as item}
				<div class="pt-3">
					<h4 class="text-2xl font-bold text-je-magical-fata_morgana font-poppins">{item.category}</h4>
					{#if item.subcategories}
						{#each item.subcategories as subcategory}
							<div>
								<h5 class="text-2xl font-bold font-poppins">{subcategory.title}</h5>
								<div class="flex flex-wrap flex-row gap-1 text-sm font-montserrat">
									{#each subcategory.skills as skill}
										<Tags text={skill} />
									{/each}
								</div>
							</div>
						{/each}
					{:else}
						<div class="flex flex-wrap flex-row gap-1 text-sm font-montserrat">
							{#each item.skills as skill}
								<Tags text={skill} />
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		{:else}
		<!-- Experience -->
			<ol class="relative border-s border-gray-700 mt-10 font-montserrat">
			{#each items[section.key] as item}
				<li class="mb-10 ms-7">
					<!-- Image -->
					<a href={item.link} target="_blank">
						<span class="absolute flex items-center justify-center size-8 rounded-full -start-4 ring-8 ring-je-mystical-nachtblau-500 {item.bgcolor} transition-transform duration-500 hover:scale-150 overflow-hidden">
							<Image src="/about_logos/{item.image}" alt="Logo von {item.company}" classNames="size-5" />
						</span>
					</a>
					<!-- Title -->
					<h3 class="flex items-center mb-1 text-xl font-semibold text-white font-poppins">{item.title}
						{#if valDate(item?.start, item?.end).active}
							<span class="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 ms-3 font-montserrat">Aktuell</span>
						{/if}
					</h3>
					<!-- Place -->
					<p class="text-base font-normal text-gray-400">{item.company}</p>
					<!-- Time -->
					<time class="block mb-2 text-sm font-normal leading-none text-gray-500">{valDate(item?.start, item?.end).date}</time>
					<!-- Description -->
					{#if item.description[0]}
						<div class="pl-4 mb-4 text-base font-normal text-gray-400">
							<ul class="list-disc text-md">
								{#each item.description as desc}
									<li>{desc}</li>
								{/each}
							</ul>
						</div>
					{/if}
					<!-- Skills -->
					{#if item.skills[0]}
						<div class="flex flex-row flex-wrap gap-1 text-sm">
							{#each item.skills as skill}
								<Tags text={skill} />
							{/each}
						</div>
					{/if}
				</li>
			{/each}
			</ol>
		{/if}
	{/each}
</div>