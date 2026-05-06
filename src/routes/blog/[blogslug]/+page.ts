import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { getCopyright } from '$lib/util/copyright.js';

function toTs(v: unknown): number {
	const d = typeof v === 'string' ? new Date(v) : v instanceof Date ? v : null;
	const t = d ? d.getTime() : NaN;
	return Number.isFinite(t) ? t : 0;
}

export const load: PageLoad = async ({ fetch, params }) => {
	const client: any = api(fetch);

	// 1) aktuellen Post laden
	const postSource: any = await client.get('/blog/post/{post_id}', {
		params: { post_id: params.blogslug }
	});

	// 1.1) Copyright laden (wenn cover vorhanden)
	const postCopyright: any = postSource?.cover?.documentId
		? await getCopyright(postSource?.cover?.documentId, fetch)
		: null;

	// 1.2) Post mit Copyright anreichern (postCopyright ist null, wenn kein cover oder kein Copyright vorhanden)
	const post: any = {
		...postSource,
		copyright: postCopyright
	};

	// 2) alle Posts
	const posts = await client.get('/blog/posts/');

	// 3) Sortierung: neu -> alt (publishedAt fallback createdAt), dann title
	const sorted = [...posts].sort((a: any, b: any) => {
		const at = toTs(a.createdAt);
		const bt = toTs(b.createdAt);
		if (at !== bt) return bt - at;
		return String(a.title ?? '').localeCompare(String(b.title ?? ''));
	});

	// 4) Index + prev/next (in der Liste neu->alt)
	const currentId = String(post.documentId ?? params.blogslug);
	const idx = sorted.findIndex((p: any) => String(p.documentId) === currentId);

	// "previous" = neuerer Beitrag, "next" = älterer Beitrag (weil Liste neu->alt)
	const previousPostSource = idx > 0 ? sorted[idx - 1] : null;
	const nextPostSource = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

	// 5) prev/next mit Copyright anreichern (wenn cover vorhanden)
	if (previousPostSource?.id !== undefined) {
		const previousPostCopyright: any = previousPostSource?.cover?.documentId
			? await getCopyright(previousPostSource?.cover?.documentId, fetch)
			: null;

		var previousPost: any = {
			...previousPostSource,
			copyright: previousPostCopyright
		};
	} else {
		var previousPost: any = null;
	}

	if (nextPostSource?.id !== undefined) {
		const nextPostCopyright: any = nextPostSource?.cover?.documentId
			? await getCopyright(nextPostSource?.cover?.documentId, fetch)
			: null;

		var nextPost: any = {
			...nextPostSource,
			copyright: nextPostCopyright
		};
	} else {
		var nextPost: any = null;
	}

	return { post, previousPost, nextPost };
};
