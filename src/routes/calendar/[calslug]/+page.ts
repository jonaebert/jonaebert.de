import { je_api_base_url } from '$lib/store';

export async function load({ params, fetch }) {
  // Fetch events
  let events = [];

  try {
    const eventsRes = await fetch(`${je_api_base_url}calendar/event/${params.calslug}`);

    if (eventsRes.ok) {
      const eventsData = await eventsRes.json();
      events = eventsData;
    } else {
      console.error('Error fetching events:', eventsRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return {
    event: events
  };
}