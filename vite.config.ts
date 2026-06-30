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
		plugins: [sveltekit(), tailwindcss(), boneyardPlugin()]
	};
});
