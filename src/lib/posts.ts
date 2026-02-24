import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

function getFileNames(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
  } catch {
    return [];
  }
}

export function getAllPosts(): PostMeta[] {
  const fileNames = getFileNames();
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id: slug,
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      category: data.category || '未分类',
      tags: data.tags || [],
      viewCount: 0,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.createdAt || new Date().toISOString(),
    };
  });

  return allPosts.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    id: slug,
    slug,
    content,
    title: data.title || '',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    category: data.category || '未分类',
    tags: data.tags || [],
    viewCount: 0,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.createdAt || new Date().toISOString(),
  };
}

export function getAllPostSlugs(): string[] {
  const fileNames = getFileNames();
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}
