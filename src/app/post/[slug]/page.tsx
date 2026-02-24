import { getPostBySlug } from '@/lib/posts';
import PostDetailClient from './PostDetailClient';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return <PostDetailClient post={post} />;
}

export function generateStaticParams() {
  return [
    { slug: 'my-first-post' },
    { slug: 'why-i-love-thinking' },
  ];
}
