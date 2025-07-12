import { je_api_base_url, je_cms_api_base_url } from '$lib/store';

export async function load({ params, fetch }) {
  // Fetch posts
  let posts = [];
  let heading = '';
  let image = [];

  try {
    const postsRes = await fetch(`${je_cms_api_base_url}/api/articles/${params.blogslug}?populate=*`);

    if (postsRes.ok) {
      const postsData = await postsRes.json();
      posts = postsData;
      heading = postsData.data.title;
      image = postsData.data.cover;
    } else {
      console.error('Error fetching posts:', postsRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return {
    post: posts,
    heading: heading,
    image: image
  };
}