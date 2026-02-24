import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';
import HomeClient from './HomeClient';

export default function Home() {
  const posts = getAllPosts();
  const microposts = getAllMicroPosts();

  return <HomeClient initialPosts={posts} initialMicroposts={microposts} />;
}
