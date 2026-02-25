import { supabase } from './supabase';
import { MicroPost } from '@/types';

export interface MicroPostRow {
  id: string;
  content: string;
  likes: number;
  comment_count: number;
  created_at: string;
}

function mapRowToMicroPost(row: MicroPostRow): MicroPost {
  return {
    id: row.id,
    content: row.content,
    likes: row.likes,
    commentCount: row.comment_count,
    createdAt: row.created_at,
  };
}

export async function getAllMicroPosts(): Promise<MicroPost[]> {
  if (!supabase) {
    console.log('[Microposts] Supabase 未配置，使用空数据');
    return [];
  }
  
  const { data, error } = await supabase
    .from('microposts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Microposts] 获取失败:', error);
    return [];
  }

  if (!data) {
    console.log('[Microposts] 无数据');
    return [];
  }

  console.log('[Microposts] 获取成功:', data.length, '条');
  return data.map(mapRowToMicroPost);
}

export async function getMicroPostById(id: string): Promise<MicroPost | null> {
  if (!supabase) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('microposts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching micropost:', error);
    return null;
  }

  return mapRowToMicroPost(data);
}
