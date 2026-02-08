import type { PageLoad } from './$types';
import { api } from '$lib/api';

export const load: PageLoad = async ({ fetch, params }) => {
	const client = api(fetch);

	return {
		event: await client.get('/calendar/event/{event_id}', {
			params: { event_id: params.calslug }
		})
	};
};
