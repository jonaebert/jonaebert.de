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

<div class="flex flex-col container items-center justify-center min-h-[45vh] xl:min-h-[40vh] relative z-10 overflow-hidden p-20">
<!--<div class="flex flex-col container items-center justify-center min-h-[45vh] xl:min-h-[40vh] relative z-10 overflow-hidden p-30 bg-cover bg-[url('https://cms.jonaebert.de/uploads/Ausbau_des_Veloroutennetzes_Cover_3b04caf8aa.svg')]">-->
	<div class="grid grid-cols-2 grid-rows-1 w-full place-items-center">
		<div class="flex flex-col space-y-6 mb-0 md:mb-15 row-start-1 col-start-1 lg:row-start-1 lg:col-start-1">
			<div class="relative grid grid-rows-[auto,auto,auto,auto] place-items-start z-30 pt-0 md:pt-[10vh]">
				<!-- Textblock -->
				<div class="text-pretty row-start-1 mb-20">
					<div class="text-3xl md:text-4xl font-bold text-secondary-900 italic my-2 pb-7 font-poppins">
						<h2>Vordenker:in im Einklang von Technik und Natur</h2>
					</div>
					<div class="text-black text-sm md:text-base font-montserrat gap-4 grid grid-rows-[auto]">
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
				<div class="row-start-2 font-montserrat mt-6 md:mt-0">
					<Slogan />
				</div>
				<div class="row-start-3 text-3xl xl:text-5xl font-bold text-secondary-900 md:mb-6 font-poppins">
					<h1>{name}</h1>
				</div>
				<div class="row-start-4">
					<Social />
				</div>
			</div>
		</div>
		<div class="flex justify-start row-start-2 col-start-1 lg:row-start-1 lg:col-start-2">
			<div class="relative w-md">
				<Image src="/portrait/portrait_clear_cropped.svg" alt="Portrait ${name}" classNames="w-full h-full"/>
			</div>
		</div>
	</div>
</div>

<!--<div
	class="flex flex-col container items-start justify-between pt-10 min-h-[45vh] xl:min-h-[40vh] relative z-10 overflow-hidden bg-primary-700"
>
	<div class="relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
		<div class="flex flex-col space-y-6">
			<div class="text-pretty">
				<div class="text-3xl md:text-4xl font-bold text-white italic my-2 pb-7 font-poppins">
					<h2>Vordenker:in im Einklang von Technik und Natur</h2>
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

		<div class="flex justify-center lg:justify-end">
			<Image
				src="/portrait/portrait_clear.svg"
				classNames="object-contain mt-0 md:mt-15 max-h-[60vh] lg:max-h-[75vh]"
			/>
		</div>
	</div>
</div>-->

<!-- CV -->
<div class="container py-5">
	<div class="max-w-screen-lg">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic">
			{headings.main}
		</h2>
		<div class="grid gap-4">
			{#each headings.sections as section}
				<h3 class="text-2xl md:text-3xl font-semibold text-black italic">
					{section.title}
				</h3>
				{#if section.key !== 'skills'}
					<ol class="relative border-s border-grey-300">
						{#each items[section.key] as item}
							<li class="mb-10 ms-11">
								<span
									class="absolute w-9 h-9 {item.bgcolor} shadow-lg transition-transform hover:scale-150 ease-in-out duration-500 flex items-center justify-center rounded-full -start-4.5 ring-7 ring-white"
								>
									<a href={item.link} target="_blank">
										<Image
											classNames="rounded-full size-7.5"
											src="/about_logos/{item.image}"
											alt="Logo von {item.company}"
										/>
									</a>
									{#if valDate(item?.start, item?.end).active}
										<span
											class="top-0 start-7 absolute w-3.5 h-3.5 bg-himmel-600 border-2 border-white rounded-full animate-bounce"
										></span>
									{/if}
								</span>
								<div
									class="p-4 rounded-lg shadow-lg bg-white border-1 border-solid border-grey-200"
								>
									<div class="items-center justify-between sm:flex">
										<div class="text-sm font-semibold text-black">
											{item.title}
											<div class="font-normal text-grey-600">
												<a
													href={item.link}
													target="_blank"
													class="font-normal hover:underline text-grey-600">{item.company}</a
												>
											</div>
										</div>
										<time
											class="mb-1 text-xs font-normal text-grey-500 flex items-center justify-between"
										>
											{valDate(item?.start, item?.end).date}
										</time>
									</div>
									{#if item.description[0] || item.skills[0]}
										<div
											class="p-3 mt-3 gap-3 grid text-xs italic font-normal rounded-lg bg-grey-100 border-1 border-solid border-grey-300 text-grey-600"
										>
											{#if item.description[0]}
												<ul class="list-disc pl-2.5 md:pl-3.5">
													{#each item.description as desc}
														<li>{desc}</li>
													{/each}
												</ul>
											{/if}
											{#if item.skills[0]}
												<div class="flex flex-row flex-wrap gap-1 text-sm not-italic">
													{#each item.skills as skill}
														<Tags text={skill} />
													{/each}
												</div>
											{/if}
										</div>
									{/if}
								</div>
							</li>
						{/each}
					</ol>
				{:else}
					<!-- Skills -->
					<div class="grid gap-3">
						{#each items[section.key] as item}
							<div class="">
								<h4 class="text-xl md:text-2xl font-semibold text-black italic">
									{item.category}
								</h4>
								<div
									class="p-4 mt-1 rounded-lg shadow-lg bg-white border-1 border-solid border-grey-200"
								>
									{#if item.subcategories}
										<div class="grid gap-6">
											{#each item.subcategories as subcategory}
												<div>
													<h5 class="text-md xl:text-2xl font-bold text-black font-poppins italic">
														{subcategory.title}
													</h5>
													<div class="flex flex-wrap flex-row gap-1 text-sm font-montserrat">
														{#each subcategory.skills as skill}
															<Tags text={skill} />
														{/each}
													</div>
												</div>
											{/each}
										</div>
									{:else}
										<div class="flex flex-wrap flex-row gap-1 text-sm font-montserrat">
											{#each item.skills as skill}
												<Tags text={skill} />
											{/each}
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
