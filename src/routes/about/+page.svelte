<script lang="ts">
	import { name, pronouns } from '$lib/store';
	import SocialIcons from '$lib/components/blocks/SocialIcons.svelte';
	import Image from '$lib/components/Image.svelte';
	import Tags from '$lib/components/blocks/Tags.svelte';

	export let data;

	const props = data?.props;
	const headings = props?.headings;
	const items = props?.items;

	// yyyy-mm for comparisons
	const now = new Date();
	const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

	function fmtMonthYear(ym?: string | null) {
		if (!ym) return '';
		const [y, m] = ym.split('-').map(Number);
		const d = new Date(y, (m ?? 1) - 1, 1);
		return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
	}

	function valDate(start?: string | null, end?: string | null) {
		// normalize empty strings
		const s = start?.trim() ? start : null;
		const e = end?.trim() ? end : null;

		let label = '—';
		let active = false;

		if (s && e) {
			label = `${fmtMonthYear(s)} – ${fmtMonthYear(e)}`;
		} else if (s && !e) {
			active = s <= nowYM;
			label = `${active ? 'seit' : 'ab'} ${fmtMonthYear(s)}`;
		}

		return { label, active };
	}
</script>

<!-- PAGE -->
<section class="grid gap-5 lg:grid-cols-12">
	<!-- HERO -->
	<div
		class="lg:col-span-7 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 p-6 sm:p-8"
	>
		<div class="flex flex-col gap-6">
			<div class="flex items-start justify-between gap-6">
				<div class="max-w-2xl">
					<div
						class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
						bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70"
					>
						<span class="h-2 w-2 rounded-full bg-accent"></span>
						<span class="text-zinc-700 dark:text-zinc-300">Über mich</span>
					</div>

					<h1
						class="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
					>
						<span class="text-accent font-bold">{name}</span>
						<span class="text-zinc-700 dark:text-zinc-300">({pronouns})</span>
					</h1>

					<h2
						class="mt-4 text-zinc-900 dark:text-zinc-200 text-xl sm:text-2xl font-medium tracking-tight"
					>
						Politik für Klima, Umwelt und Mobilität
					</h2>

					<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 max-w-2xl leading-relaxed">
						Ich setze mich für eine Stadt ein, die dem Klimawandel entschlossen begegnet und
						Lebensqualität für alle sichert. Klimaschutz, der Schutz unserer Umwelt und eine
						nachhaltige Mobilität gehören für mich untrennbar zusammen.
					</p>

					<p class="mt-3 text-zinc-900/80 dark:text-zinc-400 max-w-2xl leading-relaxed">
						In Braunschweig heißt das: weniger Emissionen, mehr Raum für Menschen und eine
						Verkehrspolitik, die fair, sicher und zukunftsfähig ist.
					</p>

					<div class="mt-5 flex flex-wrap gap-3">
						<a
							href="/contact"
							class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium ring-1 ring-inset ring-accent/40 text-accent hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
						>
							Kontakt
						</a>

						<a
							href="/blog"
							class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
						>
							Blog
						</a>
					</div>

					<div class="mt-6 w-fit">
						<SocialIcons />
					</div>
				</div>

				<!-- Portrait -->
				<div class="hidden sm:block shrink-0">
					<div
						class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-3 bg-white/60 dark:bg-zinc-950/30"
					>
						<div
							class="h-28 w-28 rounded-2xl bg-accent/10 border border-accent/30 grid place-items-center"
						>
							<div class="h-24 w-24 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900">
								<Image
									src="https://cms.jonaebert.de/uploads/Portrait_1000x1000_Cropped_ab728114f8.png"
									alt="Portrait"
									classNames="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Quick tags -->
			<div class="grid gap-3 sm:grid-cols-3">
				<div
					class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 bg-white/60 dark:bg-zinc-950/30"
				>
					<div class="text-xs text-zinc-500 dark:text-zinc-400">Rolle</div>
					<div class="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
						IT-Systemadministrator:in
					</div>
				</div>
				<div
					class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 bg-white/60 dark:bg-zinc-950/30"
				>
					<div class="text-xs text-zinc-500 dark:text-zinc-400">Fokus</div>
					<div class="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
						Kommune · Klima · Soziales
					</div>
				</div>
				<div
					class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-4 bg-white/60 dark:bg-zinc-950/30"
				>
					<div class="text-xs text-zinc-500 dark:text-zinc-400">Arbeitsweise</div>
					<div class="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
						pragmatisch · transparent
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- RIGHT COLUMN -->
	<div class="lg:col-span-5 grid gap-5">
		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
			<div class="flex items-start justify-between gap-3">
				<div>
					<div class="text-sm font-medium">Kurzprofil</div>
					<div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">In 3 Punkten</div>
				</div>
				<span
					class="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30"
				>
					<span class="h-2 w-2 rounded-full bg-accent"></span>
					CI/CD
				</span>
			</div>

			<ul class="mt-5 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
				<li
					class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					<strong class="text-zinc-950 dark:text-zinc-100">Sozial & ökologisch</strong>
					<div class="mt-1 text-zinc-600 dark:text-zinc-400">
						Klimaschutz und soziale Gerechtigkeit zusammen denken.
					</div>
				</li>
				<li
					class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					<strong class="text-zinc-950 dark:text-zinc-100">Digital handlungsfähig</strong>
					<div class="mt-1 text-zinc-600 dark:text-zinc-400">
						Sichere, nutzer:innenfreundliche Services und Prozesse.
					</div>
				</li>
				<li
					class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
				>
					<strong class="text-zinc-950 dark:text-zinc-100">Nahbar & transparent</strong>
					<div class="mt-1 text-zinc-600 dark:text-zinc-400">
						Entscheidungen erklären, Beteiligung ermöglichen.
					</div>
				</li>
			</ul>
		</div>

		<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
			<div class="text-sm font-medium">Schwerpunkte</div>
			<div class="mt-4 flex flex-wrap gap-1.5">
				<Tags text="Kommunalpolitik" />
				<Tags text="Klima & Soziales" />
				<Tags text="Digitale Infrastruktur" />
				<Tags text="Open Source" />
			</div>
		</div>
	</div>
</section>

{#if headings && items}
	<!-- CV -->
	<section
		class="mt-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-950 p-6 sm:p-8"
	>
		<header class="max-w-3xl">
			<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
				{headings.main}
			</h2>
			<p class="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
				Stationen & Kompetenzen — scannbar, ruhig, CI/CD-konform.
			</p>
		</header>

		<div class="mt-8 grid gap-12">
			{#each headings.sections as section}
				<div>
					<h3 class="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
						{section.title}
					</h3>

					{#if section.key !== 'skills'}
						{@const list = items[section.key] ?? []}

						<ul class="relative mt-6 space-y-6" style="--timeline-gap: 1.5rem;">
							{#each list as item, i}
								{@const vd = valDate(item?.start, item?.end)}
								{@const isLast = i === list.length - 1}

								<li class="relative">
									<!-- connector (from marker center to next marker center) -->
									{#if !isLast}
										<div
											class="absolute left-5 w-px bg-zinc-200 dark:bg-zinc-800"
											style="top: calc(1.25rem + 20px); height: calc(100% + var(--timeline-gap));"
										></div>
									{/if}

									<!-- marker with cutout bg (prevents line through logo) -->
									<div
										class="absolute left-5 top-5 -translate-x-1/2 rounded-full bg-white dark:bg-zinc-950 ring-6 ring-white dark:ring-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm"
									>
										<div
											class="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 grid place-items-center overflow-hidden"
										>
											<a
												href={item.link}
												target="_blank"
												rel="noreferrer"
												class="grid place-items-center h-full w-full"
											>
												<Image
													classNames="h-8 w-8 rounded-full"
													src={`/about_logos/${item.image}`}
													alt={`Logo von ${item.company}`}
												/>
											</a>
										</div>
									</div>

									<!-- card -->
									<div
										class="ms-12 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/35 backdrop-blur-sm p-4 sm:p-5"
									>
										<div class="flex flex-wrap items-start justify-between gap-3">
											<div class="min-w-0">
												<div class="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
													{item.title}
												</div>
												<div class="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
													<a
														href={item.link}
														target="_blank"
														rel="noreferrer"
														class="hover:underline"
													>
														{item.company}
													</a>
												</div>
											</div>

											<div class="flex flex-wrap items-center gap-2">
												{#if vd.active}
													<span
														class="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/30"
													>
														<span class="h-2 w-2 rounded-full bg-accent"></span>
														Aktuell
													</span>
												{/if}

												<span
													class="inline-flex items-center text-xs px-2.5 py-1 rounded-full border border-zinc-200/70 dark:border-zinc-800/70 text-zinc-600 dark:text-zinc-400 bg-white/60 dark:bg-zinc-950/20"
												>
													{vd.label}
												</span>
											</div>
										</div>

										{#if item.description?.length || item.skills?.length}
											<div
												class="mt-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-950/35 p-4"
											>
												{#if item.description?.length}
													<ul
														class="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1"
													>
														{#each item.description as desc}
															<li>{desc}</li>
														{/each}
													</ul>
												{/if}

												{#if item.skills?.length}
													<div class="mt-3 flex flex-wrap gap-1.5">
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
						</ul>
					{:else}
						<!-- Skills -->
						<div class="mt-6 grid gap-4 lg:grid-cols-2">
							{#each items[section.key] as item}
								<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5">
									<div class="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
										{item.category}
									</div>

									{#if item.subcategories}
										<div class="mt-4 grid gap-5">
											{#each item.subcategories as subcategory}
												<div>
													<div class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
														{subcategory.title}
													</div>
													<div class="mt-2 flex flex-wrap gap-1.5">
														{#each subcategory.skills as skill}
															<Tags text={skill} />
														{/each}
													</div>
												</div>
											{/each}
										</div>
									{:else}
										<div class="mt-4 flex flex-wrap gap-1.5">
											{#each item.skills as skill}
												<Tags text={skill} />
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>
{/if}
