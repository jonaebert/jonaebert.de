import { api } from '$lib/api';

export async function getCopyright(image_id: string) {
	const client: any = api(fetch);

	const response: any = await client.get('/copyright/{image_id}', {
		params: { image_id: image_id }
	});

	const copyright: any[] = Array.isArray(response) ? response[0] : null;

	return (await copyright) || null;
}
