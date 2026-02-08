import type { paths } from './openapi';

// Extracts the JSON response type from an OpenAPI response object
type JsonResponse<T> = T extends { content: { 'application/json': infer J } } ? J : never;

export type GetJson<
	Path extends keyof paths,
	Method extends keyof paths[Path] & string
> = paths[Path][Method] extends { responses: infer R }
	? R extends Record<number, any>
		? JsonResponse<R[200]> | JsonResponse<R[201]>
		: never
	: never;

export type EventsResponse = GetJson<'/calendar/events/', 'get'>;
export type EventResponse = GetJson<'/calendar/event/{event_id}', 'get'>;
export type PostsResponse = GetJson<'/blog/posts/', 'get'>;
