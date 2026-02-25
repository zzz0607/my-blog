import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getAllPosts();
  const microposts = await getAllMicroPosts();

  return <HomeClient initialPosts={posts} initialMicroposts={microposts} />;
}
