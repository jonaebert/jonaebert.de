import { je_api_base_url } from '$lib/store';

export async function load({ params, fetch }) {
  // Fetch posts
  let posts = [];

  try {
    const postsRes = await fetch(`${je_api_base_url}blog/posts/?limit=8`);

    if (postsRes.ok) {
      const postsData = await postsRes.json();
      posts = postsData;
    } else {
      console.error('Error fetching posts:', postsRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  // Fetch events
  let events = [];

  try {
    const eventsRes = await fetch(`${je_api_base_url}calendar/events/?limit=8`);

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
    posts: posts,
    events: events
  };
}