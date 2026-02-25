import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface DeleteBody {
  type: 'post' | 'micropost';
  id: string;
}

export async function DELETE(request: NextRequest) {
  try {
    const body: DeleteBody = await request.json();

    if (!body.id?.trim()) {
      return NextResponse.json({ error: 'ID不能为空' }, { status: 400 });
    }

    if (body.type !== 'post' && body.type !== 'micropost') {
      return NextResponse.json({ error: '类型错误' }, { status: 400 });
    }

    console.log('[Delete] 开始删除:', { type: body.type, id: body.id });

    if (!supabase) {
      console.error('[Delete] Supabase 未配置');
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    const tableName = body.type === 'post' ? 'posts' : 'microposts';
    
    console.log('[Delete] 准备删除, table:', tableName, 'id:', body.id);
    
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', body.id)
      .select();

    console.log('[Delete] 删除结果:', { data, error });

    if (error) {
      console.error('[Delete] Supabase 删除失败:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('[Delete] 删除成功:', body.id, '影响的行数:', data?.length || 0);
    return NextResponse.json({ success: true, message: '删除成功', deletedId: body.id });
  } catch (error: any) {
    console.error('[Delete] 异常:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
