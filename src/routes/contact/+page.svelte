<script lang="ts">
	import {
		address,
		contact,
		name,
		uri,
		n8n_contact_url,
		je_cms_base_url,
		cf_public_turnstile_site_key
	} from '$lib/store';
	import SocialIcons from '$lib/components/ui/SocialIcons.svelte';
	import { page } from '$app/stores';
	import Turnstile from '$lib/components/security/Turnstile.svelte';
	import { onDestroy } from 'svelte';

	let turnstileToken: string = '';
	let turnstileRef: Turnstile | null = null;

	$: barrierParam = $page.url.searchParams.get('barrier');
	$: barrierChecked = barrierParam === 'true';

	let formEl: HTMLFormElement | null = null;

	let response: any;
	let submitting = 0; // 0 idle, 1 sending, 2 sent, 3 error
	$: disabled = submitting === 1 || submitting === 2;
	$: messageMax = barrierChecked ? 1000 : 600;
	let messageText: string = '';

	let formError: any = 'Keine Fehlermeldung vorhanden!';

	// Send form data
	let successTimer1: ReturnType<typeof setTimeout>;
	let successTimer2: ReturnType<typeof setTimeout>;

	onDestroy(() => {
		clearTimeout(successTimer1);
		clearTimeout(successTimer2);
	});

	async function submitForm(e: SubmitEvent) {
		e.preventDefault();

		try {
			submitting = 1;

			const form = e.currentTarget as HTMLFormElement;
			const formData = new FormData(form);

			const privacy = formData.get('privacy');
			const barrier = formData.get('barrier') ? 'true' : 'false';
			const senderName = formData.get('name');
			const pronouns = formData.get('pronouns');
			const email = formData.get('email');
			const message = formData.get('message');

			if (privacy !== 'true') throw new Error('Privacy not accepted');
			if (!turnstileToken) throw new Error('Bitte Spam-Schutz abschließen.');

			const payload = {
				privacy,
				barrier,
				name: senderName,
				pronouns,
				email,
				message,
				turnstileToken
			};

			const contactRes = await fetch(`${n8n_contact_url}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!contactRes.ok) throw new Error('Error when sending the message');

			response = await contactRes.json();
			formEl?.reset();
			messageText = '';
			barrierChecked = barrierParam === 'true';
			successTimer1 = setTimeout(() => (submitting = 2), 500);
			successTimer2 = setTimeout(() => {
				submitting = 0;
			}, 8000);
			turnstileRef?.reset();
			turnstileToken = '';
		} catch (error: any) {
			console.error('Error when sending the message:', error);
			formError = error;
			submitting = 3;
			response = { error: error?.message ?? String(error) };
			turnstileRef?.reset();
			turnstileToken = '';
		}
	}
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
	<link rel="canonical" href={$uri.url.href} />
</svelte:head>

<section class="container py-10 sm:py-14">
	<div
		class="relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70
		bg-zinc-950/5 dark:bg-zinc-950"
	>
		<div
			class="absolute inset-0 bg-cover bg-center"
			style={`background-image: url(${je_cms_base_url}/uploads/Kontakt_93eb0e428c.png);`}
			aria-hidden="true"
		></div>
		<div class="absolute inset-0 bg-zinc-950/45 dark:bg-zinc-950/55" aria-hidden="true"></div>

		<div
			class="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-accent"
			aria-hidden="true"
		></div>

		<div class="relative p-6 sm:p-10">
			<div
				class="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs
				bg-white/10 border border-white/20 text-white backdrop-blur"
			>
				<span class="h-2 w-2 rounded-full bg-accent"></span>
				<span class="text-white/90">Kontakt</span>

				{#if barrierChecked}
					<span
						class="ml-2 rounded-full px-2 py-0.5 text-[11px] bg-accent/20 text-white border border-white/15"
					>
						Barriere melden
					</span>
				{/if}
			</div>

			<div class="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
				<div class="lg:col-span-8">
					<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
						Schreib mir — kurz oder ausführlich.
					</h1>

					<p class="mt-3 max-w-2xl leading-relaxed text-white/85">
						Ob Termin, Feedback oder ein Hinweis (auch zu Barrieren): Ich lese alles und melde mich
						zurück. Wenn es dringend ist, pack „DRINGEND“ in den Text.
					</p>

					<p class="mt-4 text-sm text-white/75">
						Felder mit <span class="font-semibold">*</span> sind erforderlich. Maximal
						<span
							class:text-amber-600={messageText.length >= messageMax * 0.9 &&
								messageText.length < messageMax}
							class:text-red-600={messageText.length >= messageMax}
							class="transition-colors"
						>
							{messageText.length}/{messageMax} Zeichen
						</span>
						.
					</p>
				</div>

				<div class="lg:col-span-4">
					<div class="flex flex-col gap-3 lg:items-end">
						<div class="w-fit">
							<SocialIcons />
						</div>

						<div
							class="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full
							bg-white/10 text-white border border-white/15 backdrop-blur"
						>
							<span class="h-2 w-2 rounded-full bg-accent"></span>
							{submitting === 2 ? 'Versendet' : submitting === 1 ? 'Wird gesendet' : 'Bereit'}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- CONTENT GRID -->
	<div class="mt-6 grid gap-6 lg:grid-cols-12">
		<!-- FORM -->
		<div class="lg:col-span-8">
			<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6 sm:p-8">
				<h2
					class="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
				>
					Kontaktformular
				</h2>
				<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					Ich antworte in der Regel zeitnah — je klarer dein Anliegen, desto schneller geht’s.
				</p>

				<form class="mt-6 space-y-4" bind:this={formEl} on:submit={submitForm}>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="space-y-2">
							<label class="text-sm font-medium text-zinc-800 dark:text-zinc-200" for="name">
								Name *
							</label>
							<input
								type="text"
								name="name"
								id="name"
								required
								disabled={disabled}
								placeholder="Dein Name"
								class="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-800/70
								bg-white dark:bg-zinc-950 px-4 py-3 text-sm
								text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
								focus:outline-none focus:ring-2 ring-accent/40"
							/>
						</div>

						<div class="space-y-2">
							<label class="text-sm font-medium text-zinc-800 dark:text-zinc-200" for="pronouns">
								Pronomen
							</label>
							<input
								type="text"
								name="pronouns"
								id="pronouns"
								disabled={disabled}
								placeholder="z. B. sie/ihr, they/them …"
								class="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-800/70
								bg-white dark:bg-zinc-950 px-4 py-3 text-sm
								text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
								focus:outline-none focus:ring-2 ring-accent/40"
							/>
						</div>
					</div>

					<div class="space-y-2">
						<label class="text-sm font-medium text-zinc-800 dark:text-zinc-200" for="email">
							E-Mail *
						</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							disabled={disabled}
							placeholder="name@domain.de"
							class="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-800/70
							bg-white dark:bg-zinc-950 px-4 py-3 text-sm
							text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
							focus:outline-none focus:ring-2 ring-accent/40"
						/>
					</div>

					<div class="space-y-2">
						<label class="text-sm font-medium text-zinc-800 dark:text-zinc-200" for="message">
							Deine Nachricht *
						</label>
						<textarea
							name="message"
							id="message"
							required
							rows="6"
							maxlength={messageMax}
							bind:value={messageText}
							disabled={disabled}
							placeholder={barrierChecked
								? 'Beschreibe kurz die Barriere (Ort/Seite, was genau passiert, ggf. Gerät/Browser)…'
								: 'Schreib mir ein paar Zeilen…'}
							class="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-800/70
							bg-white dark:bg-zinc-950 px-4 py-3 text-sm
							text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
							focus:outline-none focus:ring-2 ring-accent/40"
						></textarea>
						<div class="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
							<span
								class:text-amber-600={messageText.length >= messageMax * 0.9 &&
									messageText.length < messageMax}
								class:text-red-600={messageText.length >= messageMax}
								class="transition-colors"
							>
								{messageText.length}/{messageMax} Zeichen
							</span>

							<span class="font-semibold">* Pflichtfeld</span>
						</div>
					</div>

					<div class="space-y-3 pt-1">
						<label class="inline-flex items-center gap-3 select-none">
							<input
								type="checkbox"
								name="barrier"
								id="barrier"
								value="true"
								bind:checked={barrierChecked}
								disabled={disabled}
								class="h-5 w-5 shrink-0 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 accent-accent focus:outline-none focus:ring-2 ring-accent/40"
							/>
							<span class="text-sm text-zinc-800 dark:text-zinc-200"
								>Ich möchte eine Barriere melden.</span
							>
						</label>

						<label class="inline-flex items-center gap-3 select-none">
							<input
								type="checkbox"
								name="privacy"
								id="privacy"
								value="true"
								required
								disabled={disabled}
								class="h-5 w-5 shrink-0 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 accent-accent focus:outline-none focus:ring-2 ring-accent/40"
							/>
							<span class="text-sm text-zinc-800 dark:text-zinc-200">
								Ich bin mit der
								<a
									class="text-accent hover:underline underline-offset-4"
									href="/legal/privacy"
									target="_blank"
								>
									Datenschutzerklärung
								</a>
								einverstanden.
							</span>
						</label>
					</div>

					<div class="pt-4">
						<div class="grid gap-3 sm:gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
							<!-- Row 1: Label + Status (span both columns on desktop) -->
							<div class="flex items-center justify-between sm:col-span-2">
								<div
									id="turnstile-label"
									class="text-sm font-medium text-zinc-800 dark:text-zinc-200"
								>
									Kurze Sicherheitsbestätigung <span class="font-semibold">*</span>
								</div>

								{#if turnstileToken}
									<span
										class="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] bg-accent/10 text-accent border border-accent/20"
									>
										<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
										Bestätigt
									</span>
								{/if}
							</div>

							<!-- Row 2: Widget left, Button right (aligned nicely) -->
							<div class="space-y-2">
								<Turnstile
									bind:this={turnstileRef}
									siteKey={cf_public_turnstile_site_key}
									theme="auto"
									compact
									on:token={(e) => (turnstileToken = e.detail)}
									ariaLabel="turnstile-label"
								/>

								{#if !turnstileToken}
									<p id="turnstile-help" class="text-xs text-zinc-600 dark:text-zinc-400">
										Zum Schutz vor automatisierten Nachrichten. Kein Captcha-Rätsel – nur ein kurzer
										Check.
									</p>
								{/if}
							</div>

							<div class="sm:self-stretch">
								{#if submitting === 0}
									<button
										type="submit"
										disabled={!turnstileToken}
										class="inline-flex w-full sm:w-auto sm:min-w-40 items-center justify-center px-6 py-3 rounded-xl text-sm font-medium bg-accent text-white hover:bg-accent-hover transition disabled:opacity-50 disabled:cursor-not-allowed sm:h-full"
									>
										Senden
									</button>
								{:else if submitting === 1}
									<button
										type="button"
										disabled
										class="inline-flex w-full sm:w-auto sm:min-w-40 items-center justify-center px-6 py-3 rounded-xl text-sm font-medium bg-accent/20 text-accent border border-accent/30 cursor-not-allowed sm:h-full"
									>
										<span
											class="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-3"
										></span>
										Wird gesendet…
									</button>
								{:else if submitting === 2}
									<div
										class="inline-flex w-full sm:w-auto sm:min-w-40 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent sm:h-full"
									>
										💚 Versendet
									</div>
								{:else}
									<!-- Error-State darf ruhig "auto" sein, sonst wird's zu hoch -->
									<div class="w-full sm:w-70">
										<div
											class="rounded-xl border border-red-200/70 dark:border-red-900/60 bg-red-50/70 dark:bg-red-950/30 p-4 text-sm text-red-700 dark:text-red-300"
										>
											<div class="font-semibold">Fehler!</div>
											<div>Nachricht konnte nicht versendet werden.</div>
											<pre class="mt-2 text-xs whitespace-pre-wrap opacity-90">{response?.error ??
													formError}</pre>
										</div>

										<div class="mt-3 flex flex-wrap gap-3">
											<button
												type="button"
												disabled={!turnstileToken}
												class="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 rounded-xl text-sm font-medium bg-accent text-white hover:bg-accent-hover transition"
												on:click={() => formEl?.requestSubmit()}
											>
												Erneut senden
											</button>

											<button
												type="button"
												class="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 rounded-xl text-sm font-medium border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
												on:click={() => (submitting = 0)}
											>
												Zurück
											</button>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- SIDEBAR -->
		<aside class="lg:col-span-4">
			<div class="lg:sticky lg:top-24 space-y-6">
				{#if barrierChecked}
					<div class="rounded-2xl border border-accent/30 bg-accent/10 p-6">
						<h3 class="text-base font-semibold text-accent">Barriere melden</h3>
						<p class="mt-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
							Wenn du magst, nenne kurz Seite/Ort, was genau nicht funktioniert und welches
							Gerät/Browser du nutzt.
						</p>
					</div>
				{/if}
				<div class="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
					<h3 class="text-base font-semibold text-zinc-950 dark:text-zinc-50">Kontaktwege</h3>

					<div class="mt-4 space-y-3">
						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">E-Mail</div>
							<a
								class="mt-1 block break-all text-accent hover:underline underline-offset-4 text-sm"
								href="mailto:{contact.mail}"
							>
								{contact.mail}
							</a>
						</div>

						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Fax</div>
							<span class="mt-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
								{contact.fax}
							</span>
						</div>

						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Soziale Medien</div>
							<div class="mt-2 w-fit">
								<SocialIcons />
							</div>
						</div>

						<div
							class="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70"
						>
							<div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">Post</div>
							<div class="mt-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
								{name}<br />
								{address.street}<br />
								{address.zipcode}
								{address.city}<br />
								{address.country}
							</div>
						</div>

						<div class="rounded-xl border border-accent/30 bg-accent/10 p-4">
							<div class="text-sm font-medium text-accent">Tipp</div>
							<p class="mt-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
								Wenn es dringend ist, schreib „DRINGEND“ in die Nachricht.
							</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	</div>
</section>
