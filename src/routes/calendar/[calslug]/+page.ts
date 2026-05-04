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
	const eventCopyright: any[] = await getCopyright(eventSource?.cover?.documentId ?? '');

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

	const previousEvent = idx > 0 ? sorted[idx - 1] : null;
	const nextEvent = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

	return {
		event,
		previousEvent,
		nextEvent
	};
};
