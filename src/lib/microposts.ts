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
    return [];
  }
  
  const { data, error } = await supabase
    .from('microposts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching microposts:', error);
    return [];
  }

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
