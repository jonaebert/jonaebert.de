import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { boneyardPlugin } from 'boneyard-js/vite';

const REQUIRED = [
	'VITE_JE_API_BASE_URL',
	'VITE_JE_CMS_BASE_URL',
	'VITE_JE_N8N_CONTACT_URL',
	'VITE_JE_PUBLIC_TURNSTILE_SITE_KEY'
] as const;

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE_');

	const missing = REQUIRED.filter((k) => !env[k] || env[k].trim() === '');
	if (missing.length) {
		throw new Error(
			`Missing required env vars:\n- ${missing.join('\n- ')}\n\n` +
				`Put them into .env.local (or .env) and restart.`
		);
	} else {
		console.info('✅ All required environment variables are available.');
	}

	return {
		plugins: [
			sveltekit({
				// Consult https://kit.svelte.dev/docs/integrations#preprocessors
				// for more information about preprocessors
				preprocess: [vitePreprocess()],
				extensions: ['.svelte'],
				// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
				// If your environment is not supported or you settled on a specific environment, switch out the adapter.
				// See https://kit.svelte.dev/docs/adapters for more information about adapters.
				adapter: adapter(),

				prerender: {
					handleMissingId(id, path) {
						console.warn(`Missing ID: ${id} on path: ${path}`);

						return true;
					},

					handleHttpError(path) {
						console.warn(`HTTP-Error: ${path}`);

						return true;
					}
				}
			}),
			tailwindcss(),
			boneyardPlugin()
		]
	};
});
