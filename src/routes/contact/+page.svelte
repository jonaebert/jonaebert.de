<script lang="ts">
	import { address, apiDomain, contact, name, bb_base_url, bb_api_token } from '$lib/store';
	import Social from '$lib/components/blocks/Social.svelte';
	import InfoMessage from '$lib/components/blocks/InfoMessage.svelte';
	import Image from '$lib/components/image.svelte';

	let response: any;
	let submitting: number = 0;
	let disabled: boolean = false;

	let formError: any = 'Keine Fehlermeldung vorhanden!';

	function disable(state: number) {
		switch (state) {
			case 0: // Start
				disabled = false;
				break;
			case 1: // Wird versendet
				disabled = true;
				break;
			case 2: // Versendet
				disabled = true;
				break;
			case 3: // Fehler
				disabled = true;
				break;

			default:
				disabled = false;
				break;
		}
		return disabled;
	}

	async function submitForm(data: any) {
		data.preventDefault();

		try {
			submitting = 1;
			const formData = new FormData(data.currentTarget);

			const privacy = formData.get('privacy');
			const name = formData.get('name');
			const pronouns = formData.get('pronouns');
			const email = formData.get('email');
			const message = formData.get('message');

			if (privacy == 'true') {
				const payload = {
					privacy,
					name,
					pronouns,
					email,
					message
				};
				const contactRes = await fetch(`${bb_base_url}/tables/ta_a9684e4c10324f70be21f3b3b5676e1a/rows`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-budibase-app-id': 'app_5b9a41e7a11f476cbf9239575f80ae90',
						'x-budibase-api-key': bb_api_token
					},
					body: JSON.stringify(payload)
				});

				if (!contactRes.ok) {
					throw new Error('Error when sending the message');
				}

				response = await contactRes.json();

				setTimeout(() => {
					submitting = 2;
				}, 2000);
			} else {
				throw new Error('Privacy not accepted');
			}
		} catch (error) {
			console.error('Error when sending the message:', error);
			formError = error;
			submitting = 3;
			response = { error: error.message };
		}
	}
</script>

<svelte:head>
	<meta name="robots" content="index,follow" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center container py-5">
	<div
		class="bg-grey-50 rounded-lg md:rounded-xl overflow-hidden max-w-8xl w-full grid grid-cols-1 md:grid-cols-2"
	>
		<!-- Bildbereich -->
		<div class="relative w-full h-64 md:h-auto">
			<Image src="/contact/teaser.svg" alt="Teaser Bild" classNames="w-full h-full object-cover" />
		</div>

		<!-- Textbereich -->
		<div class="flex flex-col justify-center border border-grey-100 py-6 container">
			<div class="py-5">
				<InfoMessage
					message="Aktuell wird diese Seite überarbeitet.<br>Eine Möglichkeit zur Meldung von Barrieren wird zeitnah implementiert."
				/>
			</div>
			<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic font-poppins">
				Kontaktformular
			</h2>
			<h3 class="text-2xl md:text-3xl font-bold text-black italic font-poppins pb-1">
				Schreib mir doch gleich hier!
			</h3>
			<form
				class="flex flex-col gap-3 py-5 mb-5 font-montserrat bg-grey-200 w-full h-fit p-6 rounded-lg md:rounded-xl"
				on:submit={submitForm}
			>
				<div class="relative">
					<input
						type="name"
						name="name"
						id="name"
						class="block px-2.5 pb-2.5 pt-4 w-full bg-white rounded-lg border-2 border-secondary-600 appearance-none focus:border-secondary-500 focus:outline-hidden focus:ring-0 peer text-secondary-900"
						placeholder=" "
						required
						disabled={disable(submitting)}
					/>
					<label
						for="name"
						class="absolute text-neutral-600 bg-himmel-600 peer-focus:bg-himmel-600 peer-placeholder-shown:text-grey-500 peer-placeholder-shown:bg-white peer-focus:text-neutral-600 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-1.5 cursor-text peer-focus:cursor-default"
						>Name*</label
					>
				</div>
				<div class="relative">
					<input
						type="text"
						name="pronouns"
						id="pronouns"
						class="block px-2.5 pb-2.5 pt-4 w-full bg-white rounded-lg border-2 border-secondary-600 appearance-none focus:border-secondary-500 focus:outline-hidden focus:ring-0 peer text-secondary-900"
						placeholder=" "
						disabled={disable(submitting)}
					/>
					<label
						for="pronouns"
						class="absolute text-neutral-600 bg-himmel-600 peer-focus:bg-himmel-600 peer-placeholder-shown:text-grey-500 peer-placeholder-shown:bg-white peer-focus:text-neutral-600 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-1.5 cursor-text peer-focus:cursor-default"
						>Pronomen</label
					>
				</div>
				<div class="relative">
					<input
						type="email"
						name="email"
						id="email"
						class="block px-2.5 pb-2.5 pt-4 w-full bg-white rounded-lg border-2 border-secondary-600 appearance-none focus:border-secondary-500 focus:outline-hidden focus:ring-0 peer text-secondary-900"
						placeholder=" "
						required
						disabled={disable(submitting)}
					/>
					<label
						for="email"
						class="absolute text-neutral-600 bg-himmel-600 peer-focus:bg-himmel-600 peer-placeholder-shown:text-grey-500 peer-placeholder-shown:bg-white peer-focus:text-neutral-600 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-1.5 cursor-text peer-focus:cursor-default"
						>E-Mail*</label
					>
				</div>
				<div class="relative">
					<textarea
						name="message"
						id="message"
						class="block px-2.5 pb-2.5 pt-4 w-full bg-white rounded-lg border-2 border-secondary-600 appearance-none focus:border-secondary-500 focus:outline-hidden focus:ring-0 peer text-secondary-900"
						placeholder=" "
						rows="4"
						maxlength="300"
						required
						disabled={disable(submitting)}
					></textarea>
					<label
						for="message"
						class="absolute text-neutral-600 bg-himmel-600 peer-focus:bg-himmel-600 peer-placeholder-shown:text-grey-500 peer-placeholder-shown:bg-white peer-focus:text-neutral-600 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-5/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:rtl:translate-x-1/4 peer-focus:rtl:left-auto start-1.5 cursor-text peer-focus:cursor-default"
						>Deine Nachricht*</label
					>
					<label for="message" class="text-xs">Maximal 300 Zeichen</label>
				</div>
				<div class="inline-flex items-center">
					<div class="flex items-center cursor-pointer relative">
						<input
							type="checkbox"
							name="privacy"
							id="privacy"
							value="true"
							class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-md shadow-sm hover:shadow-md border-2 border-secondary-600 bg-white checked:bg-sun-600 checked:border-secondary-900"
							required
							disabled={disable(submitting)}
						/>
						<span
							class="absolute text-secondary-900 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5"
								viewBox="0 0 20 20"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="1"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</span>
					</div>
					<label for="privacy" class="ms-3 text-secondary-900"
						>Ich bin mit der <a href="/legal/privacy" target="_blank">Datenschutzerklärung</a> einverstanden.</label
					>
				</div>
				{#if submitting == 0}
					<div class="flex flex-row items-center justify-between flex-nowrap pt-3">
						<div></div>
						<button
							type="submit"
							class="text-base md:text-lg flex flex-row items-center button-m bg-secondary-600 text-white hover:bg-sun-600 hover:text-secondary-900 w-auto"
						>
							<div class="flex flex-row items-center">
								<div class="text-balance">Senden</div>
							</div>
						</button>
						<div></div>
					</div>
				{:else if submitting == 1}
					<div class="flex flex-row items-center justify-between flex-nowrap pt-3">
						<div></div>
						<button
							type="submit"
							class="text-base md:text-lg flex flex-row items-center button-m bg-sun-600 text-secondary-900 w-auto"
							disabled
						>
							<div class="flex flex-row items-center">
								<svg
									aria-hidden="true"
									role="status"
									class="inline w-4 h-4 mr-3 text-secondary-600 animate-spin"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill=""
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"
									/>
								</svg>
								<div class="text-balance">Wird gesendet</div>
							</div>
						</button>
						<div></div>
					</div>
				{:else if submitting == 2}
					<div class="flex flex-row items-center justify-between flex-nowrap pt-3">
						<div></div>
						<button
							type="submit"
							class="text-base md:text-lg flex flex-row items-center button-m bg-sun-600 text-secondary-900 w-auto"
							disabled
						>
							<div class="flex flex-row items-center">
								<div class="mr-3">💚</div>
								<div class="text-balance">Versendet</div>
							</div>
						</button>
						<div></div>
					</div>
				{:else}
					<button
						type="submit"
						class="flex items-center justify-center p-2 mt-3 border rounded-full bg-himmel-600 text-neutral-600 cursor-not-allowed"
						disabled
					>
						<svg
							class="shrink-0 inline w-4 h-4 me-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
							/>
						</svg>
						<span class="sr-only">Info</span>
						<div>
							<span class="font-bold">Fehler!</span> Nachricht konnte nicht versendet werden.
							<br />
							<pre class="text-sm">{formError}</pre>
						</div>
					</button>
				{/if}
			</form>
			<h2 class="text-3xl md:text-4xl font-bold text-secondary-900 italic font-poppins">
				Weitere Kontaktmöglichkeiten
			</h2>
			<h3 class="text-2xl md:text-3xl font-bold text-black italic font-poppins pb-1">
				Ist das Formular nichts für dich?
			</h3>
			<div class="grid grid-cols-[auto] md:grid-cols-2 grid-rows-[auto] gap-5">
				<div
					class="bg-grey-200 p-6 rounded-lg md:rounded-xl col-start-1 md:col-start-1 row-start-1 md:row-start-1 md:col-span-2 w-fit h-fit"
				>
					<h4 class="text-xl md:text-2xl font-bold text-black italic font-poppins">
						Soziale Medien
					</h4>
					<Social />
				</div>
				<div
					class="bg-grey-200 p-6 rounded-lg md:rounded-xl col-start-1 md:col-start-1 row-start-2 md:row-start-2 w-fit h-fit"
				>
					<h4 class="text-xl md:text-2xl font-bold text-black italic font-poppins">E-Mail</h4>
					<a href="mailto:{contact.mail}" class="font-montserrat">{contact.mail}</a>
				</div>
				<div
					class="bg-grey-200 p-6 rounded-lg md:rounded-xl col-start-1 md:col-start-2 row-start-3 md:row-start-2 md:row-span-2 w-fit h-fit"
				>
					<h4 class="text-xl md:text-2xl font-bold text-black italic font-poppins">Post</h4>
					<div class="font-montserrat">
						{name}<br />{address.street}<br />{address.zipcode}
						{address.city}<br />{address.country}
					</div>
				</div>
				<div
					class="bg-grey-200 p-6 rounded-lg md:rounded-xl col-start-1 md:col-start-1 row-start-4 md:row-start-3 w-fit h-fit"
				>
					<h4 class="text-xl md:text-2xl font-bold text-black italic font-poppins">Fax</h4>
					<a href="tel:{contact.fax}" class="font-montserrat">{contact.fax}</a>
				</div>
			</div>
		</div>
	</div>
</div>
