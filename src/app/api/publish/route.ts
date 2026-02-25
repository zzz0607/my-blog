import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface PublishBody {
  type: 'post' | 'micropost';
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .slice(0, 40);
  const timestamp = Date.now().toString(36);
  return `${base}-${timestamp}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: PublishBody = await request.json();

    if (!body.content?.trim()) {
      return NextResponse.json({ error: '内容不能为空' }, { status: 400 });
    }

    if (body.type !== 'post' && body.type !== 'micropost') {
      return NextResponse.json({ error: '类型错误' }, { status: 400 });
    }

    if (body.type === 'post' && !body.title?.trim()) {
      return NextResponse.json({ error: '文章标题不能为空' }, { status: 400 });
    }


    console.log('[Publish] 开始发布:', { type: body.type, title: body.title || body.content.slice(0, 30) });

    if (!supabase) {
      console.error('[Publish] Supabase 未配置');
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    if (body.type === 'micropost') {
      const { data, error } = await supabase.from('microposts').insert({
        content: body.content,
        likes: 0,
        comment_count: 0,
        created_at: new Date().toISOString(),
      }).select();

      if (error) {
        console.error('[Publish] Supabase 写入失败:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('[Publish] 短动态发布成功:', data);
      return NextResponse.json({ success: true, message: '发布成功', data });
    } else {
      const slug = generateSlug(body.title || body.content.slice(0, 30));
      const { data, error } = await supabase.from('posts').insert({
        slug,
        title: body.title,
        content: body.content,
        excerpt: body.content.slice(0, 100) || '',
        cover_image: null,
        category: body.category || '未分类',
        tags: body.tags || [],
        view_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).select();

      if (error) {
        console.error('[Publish] Supabase 写入失败:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('[Publish] 文章发布成功:', data);
      return NextResponse.json({ success: true, message: '发布成功', data });
    }
  } catch (error: any) {
    console.error('[Publish] 异常:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
