import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const micropostsDirectory = path.join(process.cwd(), 'content/microposts');

export interface MicroPost {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  commentCount: number;
}

function getFileNames(): string[] {
  try {
    if (!fs.existsSync(micropostsDirectory)) {
      return [];
    }
    return fs.readdirSync(micropostsDirectory).filter((file) => file.endsWith('.md'));
  } catch {
    return [];
  }
}

export function getAllMicroPosts(): MicroPost[] {
  const fileNames = getFileNames();
  const allPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(micropostsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id,
      content: data.content || '',
      createdAt: data.createdAt || new Date().toISOString(),
      likes: data.likes || 0,
      commentCount: data.commentCount || 0,
    };
  });

  return allPosts.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getMicroPostById(id: string): MicroPost | null {
  const fullPath = path.join(micropostsDirectory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    id,
    content: data.content || '',
    createdAt: data.createdAt || new Date().toISOString(),
    likes: data.likes || 0,
    commentCount: data.commentCount || 0,
  };
}
