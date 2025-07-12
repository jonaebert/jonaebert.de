import { je_cms_api_base_url } from '$lib/store';

export async function load() {
    const res = await fetch(`${je_cms_api_base_url}/articles?populate=*`);
    if (!res.ok) throw new Error('Fehler beim Laden der Daten');
    const data = await res.json();

    return data;
}
