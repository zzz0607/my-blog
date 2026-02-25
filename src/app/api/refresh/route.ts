import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { getAllMicroPosts } from '@/lib/microposts';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const microposts = await getAllMicroPosts();
    
    console.log('[Refresh] posts:', posts.length, 'microposts:', microposts.length);
    
    return NextResponse.json({ posts, microposts });
  } catch (error: any) {
    console.error('[Refresh] 异常:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
