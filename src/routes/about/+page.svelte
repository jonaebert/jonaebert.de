<script lang="ts">
	import Social from '$lib/components/blocks/Social.svelte';
	import Image from '$lib/components/image.svelte';
	import { name, pronouns, uri } from '$lib/store';
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
	<link rel="canonical" href="{$uri.url.href}">
</svelte:head>

<div class="min-h-[45vh] xl:min-h-[40vh] relative z-10 overflow-hidden py-30 container flex flex-col">
	<div class="grow flex flex-col justify-between">
		<div class="absolute inset-0 bg-black opacity-55 z-10"></div>
		<video autoplay muted loop playsinline preload="auto" poster="https://cms.jonaebert.de/uploads/thumbnail_Hero_Video_Teaserimage_704af3dfc7.png" class="absolute z-9 inset-0 w-full h-full object-cover">
			<source src="/home/herovideo.mp4" type="video/mp4"/>
		</video>
		<div class="text-pretty rounded-t-xl z-30">
			<div class="p-6 relative">
				<div class="float-right max-w-95 ml-8 mb-8 relative">
					<Image src="https://cms.jonaebert.de/uploads/small_Portrait_1000x1000_Cutout_7b47e25bf6.png" alt="Portrait {name}" classNames="w-full h-full float-right"/>
				</div>
				<div class="text-3xl md:text-4xl font-bold text-primary-600 italic my-2 pb-7 font-poppins">
					<h2>Vordenker:in im Einklang von Technik und Natur</h2>
				</div>
				<div class="text-white dark:text-grey-300 text-sm md:text-base font-montserrat">
					<div class="">
						In einer Ära, in der digitale Innovationen das Zeitalter prägen, sehe ich mich als
						Verfechter einer Zukunft, in der technologischer Fortschritt und ökologische
						Nachhaltigkeit eine Symbiose eingehen. Mein Engagement für den Klimaschutz ist geprägt
						von der Überzeugung, dass wir alle eine Rolle in der Bewahrung unseres Planeten spielen.
					</div>
					<div class="mt-4">
						Als IT-Experte mit einem breiten Spektrum an Fähigkeiten habe ich mich in verschiedenen
						Sektoren bewährt. Die Möglichkeit, meine Kenntnisse für den Umweltschutz einzusetzen,
						ist ein spannendes Feld, das ich erkunden möchte, um die Schnittstelle zwischen IT und
						Nachhaltigkeit zu stärken.
					</div>
					<div class="mt-4">
						Meine politische Tätigkeit bei BÜNDNIS 90/DIE GRÜNEN in Braunschweig ist Ausdruck meines
						Bestrebens, auf lokaler Ebene positive Veränderungen zu bewirken. Ich trete für eine
						Politik ein, die den Herausforderungen des Klimawandels mit Weitsicht begegnet, für eine
						Wirtschaft, die Ressourcen schont, und für ein Miteinander, das den Schutz unserer
						natürlichen Lebensgrundlagen ernst nimmt.
					</div>
					<div class="mt-4">
						Ich bin fest davon überzeugt, dass jeder Einzelne die Kraft hat, die Welt zu verändern.
						Durch mein Engagement hoffe ich, andere zu inspirieren, sich ebenfalls für den
						Umweltschutz stark zu machen und gemeinsam einen Weg in eine nachhaltige Zukunft zu
						ebnen.
					</div>
				</div>
				<div class="grid grid-cols-2 xl:grid-cols-4 justify-between mt-10">
					<div>
						<div class="row-start-2 font-montserrat mt-6 md:mt-0">
							<Slogan />
						</div>
						<div class="row-start-3 text-3xl xl:text-5xl font-bold text-primary-600 md:mb-6 font-poppins">
							<h1>{name}</h1>
						</div>
						<div class="row-start-4 max-w-[300px]">
							<Social />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Lebenslauf -->
<div class="container py-5">
	<div class="max-w-5xl">
		<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-400 italic">
			{headings.main}
		</h2>
		<div class="grid gap-4">
			{#each headings.sections as section}
				<h3 class="text-2xl md:text-3xl font-semibold text-black dark:text-grey-300 italic">
					{section.title}
				</h3>
				{#if section.key !== 'skills'}
					<ol class="relative border-s border-grey-300 dark:border-grey-400">
						{#each items[section.key] as item}
							<li class="mb-10 ms-11">
								<span
									class="absolute w-9 h-9 {item.bgcolor} shadow-lg transition-transform hover:scale-150 ease-in-out duration-500 flex items-center justify-center rounded-full -start-4.5 ring-7 ring-white dark:ring-grey-950"
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
									class="p-4 rounded-lg shadow-lg bg-white dark:bg-grey-900 border border-solid border-grey-200 dark:border-grey-800"
								>
									<div class="items-center justify-between sm:flex">
										<div class="text-sm font-semibold text-black dark:text-grey-400">
											{item.title}
											<div class="font-normal text-grey-600 dark:text-grey-300">
												<a
													href={item.link}
													target="_blank"
													class="font-normal hover:underline">{item.company}</a
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
											class="p-3 mt-3 gap-3 grid text-xs italic font-normal rounded-lg bg-grey-100 dark:bg-grey-700 border border-solid border-grey-300 dark:border-grey-600 text-grey-600 dark:text-grey-100"
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
								<h4 class="text-xl md:text-2xl font-semibold text-black dark:text-grey-400 italic">
									{item.category}
								</h4>
								<div
									class="p-4 mt-1 rounded-lg shadow-lg bg-white dark:bg-grey-900 border border-solid border-grey-200 dark:border-grey-800"
								>
									{#if item.subcategories}
										<div class="grid gap-6">
											{#each item.subcategories as subcategory}
												<div>
													<h5 class="text-md xl:text-2xl font-bold text-black dark:text-grey-300 font-poppins italic">
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
