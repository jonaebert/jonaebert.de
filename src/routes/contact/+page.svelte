<script lang="ts">
    import { address, apiDomain, contact, name } from "$lib/store"
    import Social from "$lib/components/blocks/Social.svelte"

    let response: any
    let submitting: number = 0
    let disabled: boolean = false

    let formError: any = "Keine Fehlermeldung vorhanden!"

    function disable (state: number) {
        switch (state) {
            case 0: // Start
                disabled = false
                break;
            case 1: // Wird versendet
                disabled = true
                break;
            case 2: // Versendet
                disabled = true
                break;
            case 3: // Fehler
                disabled = true
                break;
        
            default:
                disabled = false
                break;
        }
        return disabled
    }

    async function submitForm(data: any) {
        data.preventDefault()

        try {
            submitting = 1
            const formData = new FormData(data.currentTarget)

            const privacy = formData.get('privacy')
            const name = formData.get('name')
            const pronouns = formData.get('pronouns')
            const email = formData.get('email')
            const message = formData.get('message')

            if (privacy == 'true') {
                const contactRes = await fetch(
                    `https://${apiDomain}/api?action=contactForm&privacy=${privacy}&name=${name}&pronouns=${pronouns}&email=${email}&message=${message}`,
                    { method: "POST" }
                )

                if (!contactRes.ok) {
                    throw new Error("Error when sending the message")
                }

                response = await contactRes.json()

                setTimeout(() => {
                    submitting = 2
                }, 2000)
            } else {
                throw new Error("Privacy not accepted")
            }
        } catch (error) {
            console.error('Error when sending the message:', error)
            formError = error
            submitting = 3
            response = { error: error.message }
        }
    }
</script>

<svelte:head>
    <meta name="robots" content="index,follow">
</svelte:head>

<div class="container pb-20">
    <h1 class="text-5xl font-bold text-je-magical-fata_morgana my-2 py-10 font-poppins">So erreichst du mich.</h1>
    <div class="bg-[url('/contact/teaser.svg')] bg-fixed bg-no-repeat bg-center bg-cover rounded-xl pt-10">
        <div class="grid gap-8 md:pt-20 pb-10 place-content-center place-items-center md:place-content-between lg:place-content-around">
            <div class="flex flex-col gap-3 bg-je-mystical-nachtblau-900 p-5 rounded-lg col-start-1 row-start-1 md:row-end-3 place-items-start">
                <h2 class="text-4xl font-semibold text-je-magical-fata_morgana my-2 font-poppins">Kontaktformular</h2>
                <form class="flex flex-col gap-3 font-montserrat" on:submit={submitForm}>
                    <div class="relative">
                        <input type="name" name="name" id="name" class="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border-2 border-je-mystical-schwarzgruen-500 appearance-none focus:border-je-mystical-waldtiefe-500 focus:outline-none focus:ring-0 peer" placeholder=" " required disabled={disable(submitting)} />
                        <label for="name" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-je-mystical-nachtblau-900 px-2 peer-focus:px-2 peer-focus:text-je-magical-korallenriff peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text peer-focus:cursor-default">Name *</label>
                    </div>
                    <div class="relative">
                        <input type="text" name="pronouns" id="pronouns" class="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border-2 border-je-mystical-schwarzgruen-500 appearance-none focus:border-je-mystical-waldtiefe-500 focus:outline-none focus:ring-0 peer" placeholder=" " disabled={disable(submitting)} />
                        <label for="pronouns" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-je-mystical-nachtblau-900 px-2 peer-focus:px-2 peer-focus:text-je-magical-korallenriff peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text peer-focus:cursor-default">Pronomen</label>
                    </div>
                    <div class="relative">
                        <input type="email" name="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border-2 border-je-mystical-schwarzgruen-500 appearance-none focus:border-je-mystical-waldtiefe-500 focus:outline-none focus:ring-0 peer" placeholder=" " required disabled={disable(submitting)} />
                        <label for="email" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-je-mystical-nachtblau-900 px-2 peer-focus:px-2 peer-focus:text-je-magical-korallenriff peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text peer-focus:cursor-default">E-Mail *</label>
                    </div>
                    <div class="relative">
                        <textarea name="message" id="message" class="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-lg border-2 border-je-mystical-schwarzgruen-500 appearance-none focus:border-je-mystical-waldtiefe-500 focus:outline-none focus:ring-0 peer" placeholder=" " rows="4" maxlength="300" required disabled={disable(submitting)}></textarea>
                        <label for="message" class="absolute duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-je-mystical-nachtblau-900 px-2 peer-focus:px-2 peer-focus:text-je-magical-korallenriff peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-[250%] peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text peer-focus:cursor-default">Deine Nachricht *</label>
                        <label for="message" class="text-xs">Maximal 300 Zeichen</label>
                    </div>
                    <div class="inline-flex items-center">
                        <div class="flex items-center cursor-pointer relative">
                            <input type="checkbox" name="privacy" id="privacy" value="true" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border-2 border-je-mystical-schwarzgruen-500 checked:bg-je-mystical-waldtiefe-500 checked:border-je-mystical-waldtiefe-500" required disabled={disable(submitting)} />
                            <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <label for="privacy" class="ms-3">Ich bin mit der <a href="/legal/privacy" target="_blank">Datenschutzerklärung</a> einverstanden.</label>
                    </div>
                    {#if submitting == 0}
                        <button type="submit" class="rounded-lg bg-je-mystical-schwarzgruen-500 hover:bg-je-mystical-schwarzgruen-700 text-white p-2 mt-3 hover:text-je-magical-fata_morgana">Senden</button>
                    {:else if submitting == 1}
                        <button type="submit" class="rounded-lg p-2 mt-3 text-center inline-flex justify-center items-center cursor-not-allowed bg-je-mystical-schwarzgruen-900 text-je-magical-sonnenglanz hover:bg-je-mystical-schwarzgruen-700 focus:ring-4 focus:outline-none focus:ring-je-magical-sonnenglanz" disabled>
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-je-magical-korallenriff animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#FFDD00"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            Nachricht wird gesendet...
                        </button>
                    {:else if submitting == 2}
                        <button type="submit" class="rounded-lg p-2 mt-3 bg-je-mystical-schwarzgruen-900 text-je-magical-sonnenglanz cursor-not-allowed" disabled>Nachricht gesendet</button>
                    {:else}
                        <button type="submit" class="flex items-center justify-center p-2 mt-3 border rounded-lg bg-gray-800 text-red-400 border-red-800" disabled>
                            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                <span class="font-bold">Fehler!</span> Nachricht konnte nicht versendet werden. <br><br> <pre class="text-sm">{formError}</pre>
                                </div>
                        </button>
                    {/if}
                </form>
            </div>
            <div class="bg-je-mystical-nachtblau-900 p-6 rounded-lg col-start-1 md:col-start-2 row-start-2 md:row-start-1 transform md:scale-110 -rotate-3 place-items-start w-fit h-fit">
                <h2 class="text-4xl font-semibold text-je-magical-fata_morgana my-2 font-poppins">Soziale Medien</h2>
                <Social />
            </div>
            <div class="bg-je-mystical-nachtblau-900 p-6 rounded-lg col-start-1 md:col-start-3 row-start-3 md:row-start-1 transform rotate-3 md:rotate-3 translate-x-6 translate-y-4 place-items-start w-fit h-fit">
                <h2 class="text-4xl font-semibold text-je-magical-fata_morgana my-2 font-poppins">E-Mail</h2>
                <a href="mailto:{contact.mail}" class="font-montserrat">{contact.mail}</a>
            </div>
            <div class="bg-je-mystical-nachtblau-900 p-6 rounded-lg col-start-1 md:col-start-2 row-start-4 md:row-start-2 transform -rotate-3 md:rotate-3 translate-y-16 place-items-start w-fit h-fit">
                <h2 class="text-4xl font-semibold text-je-magical-fata_morgana my-2 font-poppins">Post</h2>
                <p class="font-montserrat">{name}<br>{address.street}<br>{address.zipcode} {address.city}<br>{address.country}</p>
            </div>
            <div class="bg-je-mystical-nachtblau-900 p-6 rounded-lg col-start-1 md:col-start-3 row-start-5 md:row-start-2 transform rotate-6 md:-rotate-2 translate-y-8 place-items-start w-fit h-fit">
                <h2 class="text-4xl font-semibold text-je-magical-fata_morgana my-2 font-poppins">Fax</h2>
                <a href="tel:{contact.fax}" class="font-montserrat">{contact.fax}</a>
            </div>
        </div>
    </div>
</div>