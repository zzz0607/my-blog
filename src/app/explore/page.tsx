import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';
import ExploreClient from './ExploreClient';

export default async function Explore() {
  const posts = await getAllPosts();
  const microposts = await getAllMicroPosts();

  return <ExploreClient posts={posts} microposts={microposts} />;
}
