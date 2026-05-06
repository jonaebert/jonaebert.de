// store.js
import { page } from '$app/stores'; // Values: https://developer.mozilla.org/en-US/docs/Web/API/URL

// Personal
export const name = 'Jona Ebert';
export const pronouns = 'they/them';
export const job = 'Systemadministrator:in';
export const slogan = 'Grün. Gemeinsam. Sozial.';
export const address = {
	street: 'Postfach 5835',
	zipcode: '38049',
	city: 'Braunschweig',
	country: 'Deutschland'
};
export const contact = {
	fax: '+49 5307 9402832',
	mail: 'kontakt@jonaebert.de',
	web: '/contact'
};

// URI
export const uri = page;

// API
export const je_api_base_url = import.meta.env.VITE_JE_API_BASE_URL ?? '';

// CMS
export const je_cms_base_url = import.meta.env.VITE_JE_CMS_BASE_URL ?? '';
export const je_cms_api_token = import.meta.env.VITE_JE_CMS_API_TOKEN ?? '';

// N8N
export const n8n_contact_url = import.meta.env.VITE_JE_N8N_CONTACT_URL ?? '';

// Cloudflare Turnstile
export const cf_public_turnstile_site_key = import.meta.env.VITE_JE_PUBLIC_TURNSTILE_SITE_KEY ?? '';

// Pictures
// Logo
export const logo = `${je_cms_base_url}/uploads/Logo_310x100_3704933223.avif`;
export const logo_clear = `${je_cms_base_url}/uploads/Logo_310x100_Clear_715090bcde.avif`;
export const logo_small = `${je_cms_base_url}/uploads/Logo_500x500_b6c6c14fe4.avif`;
export const logo_small_clear = `${je_cms_base_url}/uploads/Logo_500x500_Clear_e094324445.avif`;
// Alte Waage
export const img_alte_waage = `${je_cms_base_url}/uploads/Braunschweig_Alte_Waage_da98b0abaa.avif`;

// Block image copy and context menu
export function contextMenuAction(node) {
	node.oncontextmenu = (event) => {
		event.preventDefault();
	};
	node.draggable = false;

	return {
		destroy() {
			node.oncontextmenu = null;
		}
	};
}
