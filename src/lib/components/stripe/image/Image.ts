import { je_cms_api_base_url, je_cms_api_token } from '$lib/store';

// src/lib/server/image.ts
export async function getMediaURL(id: bigint, type: 'url' | 'raw') {

    if (!je_cms_api_base_url || !je_cms_api_token) {
        throw new Error('JE_CMS_API_BASE_URL oder JE_CMS_API_TOKEN ist nicht gesetzt');
    }

    const res = await fetch(`${je_cms_api_base_url}/api/upload/files/${id}?populate=*`, {
        headers: {
            Authorization: `Bearer ${je_cms_api_token}`
        }
    });

    if (!res.ok) {
        console.error('Fehler beim Abrufen der Datei:', res.statusText);
        throw new Error('Fehler beim Abrufen der Mediendatei');
    }

    const media = await res.json();


    // type === 'url'
    switch (type) {
        case 'url':
            if (media.ext === '.svg') {
                return je_cms_api_base_url + media.url;
            } else if (media.formats?.large?.url) {
                console.log(je_cms_api_base_url + media.formats.large.url)
                return je_cms_api_base_url + media.formats.large.url;
            }
            break;

        default:
            return media;
            break;
    }
}
