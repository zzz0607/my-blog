import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';
import ProfileClient from './ProfileClient';

export default function Profile() {
  const posts = getAllPosts();
  const microposts = getAllMicroPosts();

  return <ProfileClient posts={posts} microposts={microposts} />;
}
