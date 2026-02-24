import { supabase } from './supabase';
import { Post, PostMeta } from '@/types';

export interface PostRow {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

function mapRowToPost(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content || '',
    excerpt: row.excerpt || '',
    coverImage: row.cover_image || undefined,
    category: row.category || '未分类',
    tags: row.tags || [],
    viewCount: row.view_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRowToPostMeta(row: PostRow): PostMeta {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    coverImage: row.cover_image || undefined,
    category: row.category || '未分类',
    tags: row.tags || [],
    viewCount: row.view_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data.map(mapRowToPostMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return null;
  }

  return mapRowToPost(data);
}

export async function getAllPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug');

  if (error || !data) {
    return [];
  }

  return data.map(row => row.slug);
}
