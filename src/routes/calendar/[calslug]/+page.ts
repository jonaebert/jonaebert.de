import { je_api_base_url } from '$lib/store';

export async function load({ params, fetch }) {
  // Fetch events
  let event = [];

  try {
    const eventRes = await fetch(`${je_api_base_url}calendar/event/${params.calslug}`);

    if (eventRes.ok) {
      const eventData = await eventRes.json();
      event = eventData;
    } else {
      console.error('Error fetching events:', eventRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return {
    event: event
  };
}