import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';

export async function GET() {
  try {
    const posts = getAllPosts();
    const microposts = getAllMicroPosts();
    
    return NextResponse.json({ posts, microposts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
