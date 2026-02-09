import type { PageLoad } from './$types';
import { api } from '$lib/api';

function toTs(v: unknown): number {
	const d = typeof v === 'string' ? new Date(v) : v instanceof Date ? v : null;
	const t = d ? d.getTime() : NaN;
	return Number.isFinite(t) ? t : 0;
}

export const load: PageLoad = async ({ fetch, params }) => {
	const client = api(fetch);

	// 1) aktueller Post
	const post = await client.get('/blog/post/{post_id}', {
		params: { post_id: params.blogslug }
	});

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
	const previousPost = idx > 0 ? sorted[idx - 1] : null;
	const nextPost = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

	return { post, previousPost, nextPost };
};
