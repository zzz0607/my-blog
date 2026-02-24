import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';
import ExploreClient from './ExploreClient';

export default function Explore() {
  const posts = getAllPosts();
  const microposts = getAllMicroPosts();

  return <ExploreClient posts={posts} microposts={microposts} />;
}
