import type { PageLoad } from './$types';
import { api } from '$lib/api';

export const load: PageLoad = async ({ fetch, params }) => {
	const client = api(fetch);

	return {
		posts: client.get('/blog/posts/', { query: { limit: 8 } }),
		events: client.get('/calendar/events/', { query: { limit: 8 } })
	};
};
