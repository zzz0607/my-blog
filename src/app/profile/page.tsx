import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

export default async function Profile() {
  const posts = await getAllPosts();
  const microposts = await getAllMicroPosts();

  return <ProfileClient posts={posts} microposts={microposts} />;
}
