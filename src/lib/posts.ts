import { supabase } from './supabase';
import { Post, PostMeta } from '@/types';
import fs from 'fs';
import path from 'path';

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

function getContentDir(): string {
  return path.join(process.cwd(), 'src', 'content');
}

function getPostsFromContent(): PostMeta[] {
  const contentDir = getContentDir();
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  return files.map(file => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const slug = file.replace(/\.mdx?$/, '');
    
    const titleMatch = fileContent.match(/^title:\s*(.+)$/m);
    const excerptMatch = fileContent.match(/^excerpt:\s*(.+)$/m);
    const dateMatch = fileContent.match(/^date:\s*(.+)$/m);
    const categoryMatch = fileContent.match(/^category:\s*(.+)$/m);
    const tagsMatch = fileContent.match(/^tags:\s*(.+)$/m);
    
    return {
      id: slug,
      slug,
      title: titleMatch ? titleMatch[1].trim() : slug,
      excerpt: excerptMatch ? excerptMatch[1].trim() : '',
      coverImage: undefined,
      category: categoryMatch ? categoryMatch[1].trim() : '未分类',
      tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [],
      viewCount: 0,
      createdAt: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
      updatedAt: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
    };
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function getPostFromContent(slug: string): Post | null {
  const contentDir = getContentDir();
  const filePath = path.join(contentDir, `${slug}.md`);
  const filePathMd = path.join(contentDir, `${slug}.mdx`);
  
  let fileContent = '';
  if (fs.existsSync(filePath)) {
    fileContent = fs.readFileSync(filePath, 'utf-8');
  } else if (fs.existsSync(filePathMd)) {
    fileContent = fs.readFileSync(filePathMd, 'utf-8');
  } else {
    return null;
  }
  
  const titleMatch = fileContent.match(/^title:\s*(.+)$/m);
  const excerptMatch = fileContent.match(/^excerpt:\s*(.+)$/m);
  const dateMatch = fileContent.match(/^date:\s*(.+)$/m);
  const categoryMatch = fileContent.match(/^category:\s*(.+)$/m);
  const tagsMatch = fileContent.match(/^tags:\s*(.+)$/m);
  const coverImageMatch = fileContent.match(/^cover_image:\s*(.+)$/m);
  
  const contentMatch = fileContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const content = contentMatch ? contentMatch[1].trim() : fileContent;
  
  return {
    id: slug,
    slug,
    title: titleMatch ? titleMatch[1].trim() : slug,
    content,
    excerpt: excerptMatch ? excerptMatch[1].trim() : '',
    coverImage: coverImageMatch ? coverImageMatch[1].trim() : undefined,
    category: categoryMatch ? categoryMatch[1].trim() : '未分类',
    tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : [],
    viewCount: 0,
    createdAt: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
    updatedAt: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
  };
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
  if (!supabase) {
    return getPostsFromContent();
  }
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching posts:', error);
    return getPostsFromContent();
  }

  return data.map(mapRowToPostMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) {
    return getPostFromContent(slug);
  }
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return getPostFromContent(slug);
  }

  return mapRowToPost(data);
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!supabase) {
    const posts = getPostsFromContent();
    return posts.map(p => p.slug);
  }
  
  const { data, error } = await supabase
    .from('posts')
    .select('slug');

  if (error || !data) {
    return [];
  }

  return data.map(row => row.slug);
}
