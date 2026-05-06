import type { PageLoad } from './$types';
import { api } from '$lib/api';
import { getCopyright } from '$lib/util/copyright.js';

function toTs(v: unknown): number {
	const d: Date | null = typeof v === 'string' ? new Date(v) : v instanceof Date ? v : null;
	const t: number = d ? d.getTime() : NaN;
	return Number.isFinite(t) ? t : 0;
}

export const load: PageLoad = async ({ fetch, params }) => {
	const client: any = api(fetch);

	// 1) aktuelles Event laden
	const eventSource: any = await client.get('/calendar/event/{event_id}', {
		params: { event_id: params.calslug }
	});

	// 1.1) Copyright laden (wenn cover vorhanden)
	const eventCopyright: any = eventSource?.cover?.documentId
		? await getCopyright(eventSource?.cover?.documentId, fetch)
		: null;

	// 1.2) Event mit Copyright anreichern (eventCopyright ist null, wenn kein cover oder kein Copyright vorhanden)
	const event: any = {
		...eventSource,
		copyright: eventCopyright
	};

	// 2) alle Events laden
	const events: any[] = await client.get('/calendar/events/');

	// 3) Chronologisch sortieren (start -> end -> subject)
	const sorted: any[] = [...events].sort((a: any, b: any) => {
		const as = toTs(a.start);
		const bs = toTs(b.start);
		if (as !== bs) return as - bs;

		const ae = toTs(a.end);
		const be = toTs(b.end);
		if (ae !== be) return ae - be;

		return String(a.subject ?? '').localeCompare(String(b.subject ?? ''));
	});

	// 4) Index finden: calslug == event_id (documentId)
	const currentId = String(event.documentId ?? params.calslug);
	const idx = sorted.findIndex((e: any) => String(e.documentId) === currentId);

	const previousEventSource = idx > 0 ? sorted[idx - 1] : null;
	const nextEventSource = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

	// 5) prev/next mit Copyright anreichern (wenn cover vorhanden)
	if (previousEventSource?.id !== undefined) {
		const previousEventCopyright: any = previousEventSource?.cover?.documentId
			? await getCopyright(previousEventSource?.cover?.documentId, fetch)
			: null;

		var previousEvent: any = {
			...previousEventSource,
			copyright: previousEventCopyright
		};
	} else {
		var previousEvent: any = null;
	}

	if (nextEventSource?.id !== undefined) {
		const nextEventCopyright: any = nextEventSource?.cover?.documentId
			? await getCopyright(nextEventSource?.cover?.documentId, fetch)
			: null;

		var nextEvent: any = {
			...nextEventSource,
			copyright: nextEventCopyright
		};
	} else {
		var nextEvent: any = null;
	}

	return {
		event,
		previousEvent,
		nextEvent
	};
};
