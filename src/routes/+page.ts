import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { getCopyright } from '$lib/util/copyright.js';

export const load: PageLoad = async ({ fetch }) => {
	const client: any = api(fetch);

	// 1) Alle Events laden
	const eventsSource: any[] = await client.get('/calendar/events/', { query: { limit: 8 } });

	// 2) Copyright für alle Events laden (wenn cover vorhanden)
	const events = await Promise.all(
		eventsSource.map(async (event: any) => {
			if (event?.cover?.documentId) {
				const eventCopyright: any[] = await getCopyright(event?.cover?.documentId ?? '');

				return {
					...event,
					copyright: eventCopyright
				};
			}
		})
	);

	// 3) Alle Posts laden
	const postsSource: any[] = await client.get('/blog/posts/', { query: { limit: 8 } });

	// 4) Copyright für alle Posts laden (wenn cover vorhanden)
	const posts = await Promise.all(
		postsSource.map(async (post: any) => {
			if (post?.cover?.documentId) {
				const postCopyright: any[] = await getCopyright(post?.cover?.documentId ?? '');

				return {
					...post,
					copyright: postCopyright
				};
			}
		})
	);

	return {
		posts,
		events
	};
};
