import type { PageLoad } from './$types';
import { api } from '$lib/api';

export const load: PageLoad = ({ params, fetch }) => {
	const client = api(fetch);

	return {
		post: client.get('/blog/post/{post_id}', {
			params: { post_id: params.blogslug }
		})
	};
};
