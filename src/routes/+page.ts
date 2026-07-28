import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { getCopyright } from '$lib/util/copyright.js';

export const load: PageLoad = async ({ fetch }) => {
	const client: any = api(fetch);

	// 1) Alle Events laden
	const eventsSource: any[] = await client.get('/calendar/events/', {
		query: { limit: 8 }
	});

	// 1.1) Copyright für alle Events laden (wenn cover vorhanden)
	const copyrightEventsPromises = eventsSource.map(async (event: any) => {
		if (event?.cover?.documentId) {
			try {
				return await getCopyright(event?.cover?.documentId, fetch);
			} catch (error) {}
		}
		return null;
	});

	const eventsCopyright = await Promise.all(copyrightEventsPromises);

	// 1.2) Events mit Copyright anreichern (eventsCopyright ist null, wenn kein cover oder kein Copyright vorhanden)
	const events = eventsSource.map((event, index) => ({
		...event,
		copyright: eventsCopyright[index]
	}));

	// 3) Alle Posts laden
	const postsSource: any[] = await client.get('/blog/posts/', {
		query: { limit: 8, category: 'allgemein' }
	});

	// 4) Copyright für alle Posts laden (wenn cover vorhanden)
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
		posts,
		events
	};
};
