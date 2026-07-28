import { api } from '$lib/api';

export async function getCopyright(image_id: string, fetchFn: typeof fetch = fetch) {
	const client: any = api(fetchFn);

	const response: any = await client.get('/copyright/{image_id}', {
		params: { image_id: image_id }
	});

	const copyright: any[] = response ? response : null;

	return (await copyright) || null;
}
