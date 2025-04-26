<script lang="ts">
	import Social from '$lib/components/blocks/Social.svelte';
	import Image from '$lib/components/image.svelte';
	import { name, pronouns } from '$lib/store';
	import { FormatDate } from '$lib/util/date';
	import Tags from '$lib/components/blocks/Tags.svelte';
	import Slogan from '$lib/components/blocks/Slogan.svelte';
	export let data;
	const { headings, items } = data.props;

	// Get current month + year
	const now = new Date();
	const nowFormatted = now.getFullYear() + '-' + (now.getMonth() + 1).toString().padStart(2, '0');

	// Validate date
	//
	// @param {string} start
	// @param {string} end
	//
	function valDate(start: string, end: string) {
		let date = 'date not found';
		let active = false;

		if (start && end) {
			date =
				FormatDate(start, 'month') +
				' ' +
				FormatDate(start, 'year') +
				' - ' +
				FormatDate(end, 'month') +
				' ' +
				FormatDate(end, 'year');
		} else if (start && !end) {
			if (start <= nowFormatted) {
				date = 'seit ';
				active = true;
			} else if (start > nowFormatted) {
				date = 'ab ';
			}
			date = date + FormatDate(start, 'month') + ' ' + FormatDate(start, 'year');
		}

		return { date, active };
	}
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
</svelte:head>

<div
	class="flex flex-col container items-start justify-between pt-10 min-h-[45vh] xl:min-h-[40vh] relative z-10 overflow-hidden bg-primary-700"
>
	<div class="relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
		<!-- Linke Spalte: Text, Name, Slogan, Social -->
		<div class="flex flex-col space-y-6">
			<!-- Textblock -->
			<div class="text-pretty">
				<div class="text-3xl md:text-4xl font-bold text-white italic my-2 pb-7 font-poppins">
					<h2>Vordenker*in im Einklang von Technik und Natur</h2>
				</div>
				<div class="text-white text-sm md:text-base font-montserrat gap-4 grid grid-rows-[auto]">
					<div class="">
						In einer Ära, in der digitale Innovationen das Zeitalter prägen, sehe ich mich als
						Verfechter einer Zukunft, in der technologischer Fortschritt und ökologische
						Nachhaltigkeit eine Symbiose eingehen. Mein Engagement für den Klimaschutz ist geprägt
						von der Überzeugung, dass wir alle eine Rolle in der Bewahrung unseres Planeten spielen.
					</div>
					<div class="">
						Als IT-Experte mit einem breiten Spektrum an Fähigkeiten habe ich mich in verschiedenen
						Sektoren bewährt. Die Möglichkeit, meine Kenntnisse für den Umweltschutz einzusetzen,
						ist ein spannendes Feld, das ich erkunden möchte, um die Schnittstelle zwischen IT und
						Nachhaltigkeit zu stärken.
					</div>
					<div class="">
						Meine politische Tätigkeit bei BÜNDNIS 90/DIE GRÜNEN in Braunschweig ist Ausdruck meines
						Bestrebens, auf lokaler Ebene positive Veränderungen zu bewirken. Ich trete für eine
						Politik ein, die den Herausforderungen des Klimawandels mit Weitsicht begegnet, für eine
						Wirtschaft, die Ressourcen schont, und für ein Miteinander, das den Schutz unserer
						natürlichen Lebensgrundlagen ernst nimmt.
					</div>
					<div class="">
						Ich bin fest davon überzeugt, dass jeder Einzelne die Kraft hat, die Welt zu verändern.
						Durch mein Engagement hoffe ich, andere zu inspirieren, sich ebenfalls für den
						Umweltschutz stark zu machen und gemeinsam einen Weg in eine nachhaltige Zukunft zu
						ebnen.
					</div>
				</div>
			</div>

			<!-- Name, Slogan, Socials -->
			<div
				class="relative grid grid-rows-[auto,auto,auto] place-items-start z-30 pt-0 md:pt-[10vh]"
			>
				<div class="row-start-1 font-montserrat mt-6 md:mt-0">
					<Slogan />
				</div>
				<div class="row-start-2 text-3xl xl:text-5xl font-bold text-white md:mb-6 font-poppins">
					<h1>{name} ({pronouns})</h1>
				</div>
				<div class="row-start-3">
					<Social />
				</div>
			</div>
		</div>

		<!-- Rechte Spalte: Portrait -->
		<div class="flex justify-center lg:justify-end">
			<Image
				src="/portrait/portrait_clear.svg"
				classNames="object-contain mt-0 md:mt-15 max-h-[60vh] lg:max-h-[75vh]"
			/>
		</div>
	</div>
</div>

<!-- Curriculum vitae -->
<div class="container py-12">
	<h2 class="text-2xl xl:text-4xl font-bold text-secondary-900 font-poppins italic">
		{headings.main}
	</h2>
	{#each headings.sections as section}
		<h3 class="text-xl xl:text-3xl font-bold text-black md:mb-6 font-poppins italic">
			{section.title}
		</h3>
		{#if section.key == 'skills'}
			<!-- Skills -->
			{#each items[section.key] as item}
				<div class="pt-3">
					<h4 class="text-lg xl:text-2xl font-bold text-black md:mb-6 font-poppins italic">
						{item.category}
					</h4>
					{#if item.subcategories}
						{#each item.subcategories as subcategory}
							<div>
								<h5 class="text-md xl:text-2xl font-bold text-black md:mt-6 font-poppins italic">
									{subcategory.title}
								</h5>
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
			<ol class="relative border-s border-grey-700 mt-10 pl-5 font-montserrat">
				{#each items[section.key] as item}
					<li class="mb-10 ms-7">
						<!-- Image -->
						<a href={item.link} target="_blank">
							<span
								class="absolute flex border border-grey-100 hover:border-none items-center justify-center size-9 rounded-full -start-4 ring-8 ring-white hover:ring-sun-600 {item.bgcolor} transition-transform duration-500 hover:scale-150 overflow-hidden"
							>
								<Image
									src="/about_logos/{item.image}"
									alt="Logo von {item.company}"
									classNames="size-6"
								/>
							</span>
						</a>
						<!-- Title -->
						<h3 class="flex items-center mb-1 text-xl font-semibold text-black font-poppins">
							{item.title}
							{#if valDate(item?.start, item?.end).active}
								<span
									class="text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm bg-blue-900 text-blue-300 ms-3 font-montserrat"
									>Aktuell</span
								>
							{/if}
						</h3>
						<!-- Place -->
						<p class="text-base font-normal text-grey-400">{item.company}</p>
						<!-- Time -->
						<time class="block mb-2 text-sm font-normal leading-none text-grey-500"
							>{valDate(item?.start, item?.end).date}</time
						>
						<!-- Description -->
						{#if item.description[0]}
							<div class="pl-4 mb-4 text-base font-normal text-grey-400">
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
