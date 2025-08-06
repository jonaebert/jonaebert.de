import type { RequestHandler } from './$types';
import { name, pronouns, uri, je_api_base_url } from '$lib/store';

async function fetchPosts() {
  // Fetch posts
  let posts = [];

  try {
    const postsRes = await fetch(`${je_api_base_url}?type=blog&itemtype=all&maxitems=5`);

    if (postsRes.ok) {
      const postsData = await postsRes.json();
      posts = postsData;
    } else {
      console.error('Error fetching posts:', postsRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return {
    posts: posts
  };
}

export const GET: RequestHandler = async () => {
  const { posts } = await fetchPosts();

  const itemsXml = posts.data
    .map((post) => {
      const pubDate = new Date(post.createdAt).toUTCString();
      return `    <item>
      <title>${post.title}></title>
      <link>https://jonaebert.de/blog/${post.documentId}</link>
      <guid isPermaLink="false">${post.documentId}</guid>
      <description>${post.description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="https://jonaebert.de/rss.xml" rel="self" type="application/rss+xml" />
    <title>Blog von ${name} (${pronouns})</title>
    <link>https://jonaebert.de/</link>
    <description>Die neuesten Blog-Beiträge von ${name}</description>
    <language>de</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>SvelteKit</generator>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
