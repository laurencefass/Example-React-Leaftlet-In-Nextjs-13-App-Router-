import { number } from 'prop-types';
import { Suspense } from 'react';

const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

async function BlogPosts({wait}: {wait: number}) {
  await delay(wait);
  let data = await fetch('https://api.vercel.app/blog');
  let posts = await data.json();

  return <>
    <ul>
      <p>{wait}</p>
      {posts.map((post: any, idx: number) => (
        idx < 3 && <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </>
}

export default function Page() {
  return (
    <section>
      <h1>Blog Posts</h1>
      <Suspense fallback={<p>Loading blog posts...</p>}>
        {/* @ts-expect-error Server Component */}
        <BlogPosts wait={2000}/>
      </Suspense>
      <Suspense fallback={<p>Loading blog posts...</p>}>
        {/* @ts-expect-error Server Component */}
        <BlogPosts wait={5000}/>
      </Suspense>
    </section>
  );
}