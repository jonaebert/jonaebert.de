import { je_api_base_url, je_cms_api_base_url } from '$lib/store';

export async function load({ params, fetch }) {
  // Fetch posts
  let post = [];
  let heading = '';
  let image = [];

  try {
    const postRes = await fetch(`${je_cms_api_base_url}/api/articles/${params.blogslug}?populate=*`);

    if (postRes.ok) {
      const postData = await postRes.json();
      post = postData;
      heading = postData.data.title;
      image = postData.data.cover;
    } else {
      console.error('Error fetching posts:', postRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return {
    post: post,
    heading: heading,
    image: image
  };
}