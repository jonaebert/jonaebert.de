import { je_api_base_url } from '$lib/store';

export const prerender = 'auto';

export async function load({ params, fetch }) {
  // Fetch tickers
  let tickers = [];

  try {
    const tickersRes = await fetch(`${je_api_base_url}ticker/items/`);

    if (tickersRes.ok) {
      const tickersData = await tickersRes.json();
      tickers = tickersData;
    } else {
      console.error('Error fetching tickers:', tickersRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching tickers:', error);
  }

  return {
    tickers: tickers
  };
}