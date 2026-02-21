import type { paths } from './openapi';

type Json<T> = T extends { content: { 'application/json': infer J } } ? J : never;

type SuccessResponse<R> = R extends Record<number, any> ? Json<R[200]> | Json<R[201]> : never;

type GetPaths = {
	[P in keyof paths]: paths[P] extends { get: any } ? P : never;
}[keyof paths];

type Query<P extends keyof paths, M extends keyof paths[P]> = paths[P][M] extends {
	parameters: { query: infer Q };
}
	? Q
	: never;

type PathParams<P extends keyof paths, M extends keyof paths[P]> = paths[P][M] extends {
	parameters: { path: infer PP };
}
	? PP
	: never;

type Response<P extends keyof paths, M extends keyof paths[P]> = paths[P][M] extends {
	responses: infer R;
}
	? SuccessResponse<R>
	: never;

function applyPathParams(path: string, params?: Record<string, any>) {
	if (!params) return path;
	return path.replace(/\{([^}]+)\}/g, (_, key) => {
		const v = params[key];
		if (v === undefined || v === null) {
			throw new Error(`Missing path param: ${key}`);
		}
		return encodeURIComponent(String(v));
	});
}

export function createApiClient(baseUrl: string, fetchFn: typeof fetch) {
	const base = baseUrl.replace(/\/+$/, '');

	async function request<P extends keyof paths, M extends keyof paths[P] & 'get'>(
		path: P,
		method: M,
		options?: {
			query?: Query<P, M>;
			params?: PathParams<P, M>;
			headers?: Record<string, string>;
		}
	): Promise<Response<P, M>> {
		let url = base + applyPathParams(path as string, options?.params as any);

		if (options?.query) {
			const qs = new URLSearchParams(
				Object.entries(options.query)
					.filter(([, v]) => v !== undefined && v !== null)
					.map(([k, v]) => [k, String(v)])
			).toString();

			if (qs) url += `?${qs}`;
		}

		const res = await fetchFn(url, {
			method: method.toUpperCase(),
			headers: {
				Accept: 'application/json',
				...options?.headers
			}
		});

		if (!res.ok) {
			const text = await res.text().catch(() => '');
			throw new Error(
				`API ${method.toUpperCase()} ${String(path)} failed: ${res.status} ${res.statusText}\n${text}`
			);
		}

		return res.json();
	}

	return {
		get: <P extends GetPaths>(
			path: P,
			options?: {
				query?: Query<P, 'get'>;
				params?: PathParams<P, 'get'>;
				headers?: Record<string, string>;
			}
		) => request(path, 'get', options)
	};
}
