import { createApiClient } from './client';
import { je_api_base_url } from '$lib/store';

// Helper function to create an API client with the given fetch function
export function api(fetchFn: typeof fetch) {
	return createApiClient(je_api_base_url, fetchFn);
}
