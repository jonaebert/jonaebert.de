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
			if (post?.cover?.documentId) {
				const postCopyright: any[] = await getCopyright(post?.cover?.documentId ?? '', fetch);

				return {
					...post,
					copyright: postCopyright || null
				};
			}
		})
	);

	return {
		posts
	};
};
