import { je_api_base_url } from '$lib/store';

export async function load({ params, fetch }) {
  // Fetch posts
  let post = [];
  let title = '';
  let cover = [];

  try {
    const postRes = await fetch(`${je_api_base_url}?type=blog&itemtype=post&postid=${params.blogslug}`);

    if (postRes.ok) {
      const postData = await postRes.json();
      post = postData;
      title = postData.data.title;
      cover = postData.data.cover;
    } else {
      console.error('Error fetching posts:', postRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return {
    post: post,
    title: title,
    cover: cover
  };
}