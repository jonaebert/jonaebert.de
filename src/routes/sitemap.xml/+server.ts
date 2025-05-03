// Imports
import { je_api_base_url } from '$lib/store.js';

const site = 'https://jonaebert.de';

// Non dynamic pages
const pages_10 = [
    ''
]
const pages_08 = [
    'about',
    'contact',
    'legal/imprint',
    'legal/privacy'
];

// Fetch posts
let posts: string[] = [];
let posts_categories: string[] = [];

try {
    const postsRes = await fetch(`${je_api_base_url}?type=blog&itemtype=all`);

    if (postsRes.ok) {
        const postsData = await postsRes.json();
        posts = postsData.data;

        // Get all categories
        posts.forEach((post) => {
            post.tags?.forEach((tag) => {
                posts_categories.push(tag);
            });
        });
        posts_categories = [...new Set(posts_categories)];
    } else {
        console.error('Error fetching posts:', postsRes.statusText);
    }
} catch (error) {
    console.error('Error fetching posts:', error);
}

function blog_publish_date(blog_item: any) {
    if (blog_item.data.overwrite_publish_date) {
        return blog_item.data.overwrite_publish_date + 'T01:00:00+0000';
    } else {
        return blog_item.first_publication_date;
    }
}

// Building sitemap
export async function GET({ url }) {
    const body = sitemap(pages_10, pages_08, posts);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');
    return response;
}

const sitemap = (pages_10: string[], pages_08: string[], posts: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    ${pages_10
        .map(
            (page) => `
                <url>
                    <loc>${site}/${page}</loc>
                    <changefreq>daily</changefreq>
                    <priority>1.00</priority>
                </url>
            `
        )
        .join('')
    }
    ${pages_08
        .map(
            (page) => `
                <url>
                    <loc>${site}/${page}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.80</priority>
                </url>
            `
        )
        .join('')
    }
    ${posts
        .map(
            (post) => `
                <url>
                    <loc>${site}${post.url}</loc>
                    <changefreq>weekly</changefreq>
                    <lastmod>${blog_publish_date(post)}</lastmod>
                    <priority>0.50</priority>
                </url>
            `
        )
        .join('')
    }
</urlset>`
