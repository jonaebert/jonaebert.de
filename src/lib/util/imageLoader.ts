import { je_image_optimizer_base_url } from '$lib/store'

'use client'

export default function imageLoader({ uri, src, width, quality }) {
    const isLocal = !src.startsWith('http');
    const query = new URLSearchParams();

    // Your NextJS application URL
    const baseUrl = '<your-nextjs-app-domain>';

    const fullSrc = `${uri.url.protocol}/${uri.url.host}${src}`;

    if (width) query.set('width', width);
    if (quality) query.set('quality', quality);

    if (isLocal && process.env.NODE_ENV === 'development') {
        return src;
    }
    if (isLocal) {
        return `${je_image_optimizer_base_url}/image/${fullSrc}?${query.toString()}`;
    }
    return `${je_image_optimizer_base_url}/image/${src}?${query.toString()}`;
}