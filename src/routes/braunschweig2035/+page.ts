import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { getCopyright } from '$lib/util/copyright.js';

export const load: PageLoad = async ({ fetch }) => {
	const client: any = api(fetch);

	// Alle Posts laden
	const postsSource: any[] = await client.get('/blog/posts/', {
		query: { limit: 8, category: 'braunschweig-2035' }
	});

	// Copyright für alle Posts laden (wenn cover vorhanden)
	const posts = await Promise.all(
		postsSource.map(async (post: any) => {
			const copyright = post?.cover?.documentId
				? await getCopyright(post.cover.documentId, fetch).catch(() => null)
				: null;

			return { ...post, copyright };
		})
	);

	return {
		posts
	};
};
