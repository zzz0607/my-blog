export interface Post {
  id: string;
  title: string;
  slug: string;
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

export interface MicroPost {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId?: string;
  microPostId?: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  backgroundImage?: string;
  joinedAt: string;
}
