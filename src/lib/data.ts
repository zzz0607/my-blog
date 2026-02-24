import { Post, MicroPost, User, Comment } from '@/types';

export const defaultUser: User = {
  id: '1',
  name: '博主',
  username: 'blogger',
  avatar: '/avatar.png',
  bio: '热爱技术和思考的人',
  backgroundImage: '/bg.png',
  joinedAt: '2024-01-01',
};

export const samplePosts: Post[] = [
  {
    id: '1',
    title: '我的第一篇博客文章',
    slug: 'my-first-post',
    content: '# 这是我的第一篇博客文章\n\n这是一个使用 Next.js 和 Tailwind CSS 构建的博客。\n\n## 关于项目\n\n这个博客模仿了 X (Twitter) 的 UI 设计风格。\n\n```typescript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```',
    excerpt: '这是我的第一篇博客文章，记录了使用 Next.js 和 Tailwind CSS 构建博客的过程。',
    category: '技术',
    tags: ['Next.js', 'Tailwind', '博客'],
    viewCount: 100,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: '为什么我喜欢思考',
    slug: 'why-i-love-thinking',
    content: '# 为什么我喜欢思考\n\n思考是人类最宝贵的能力之一。\n\n## 思考的价值\n\n1. 解决问题\n2. 创新创造\n3. 理解世界',
    excerpt: '分享我对思考的理解和思考习惯的养成。',
    category: '思考',
    tags: ['思考', '习惯', '成长'],
    viewCount: 50,
    createdAt: '2024-01-20T15:30:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
  },
];

export const sampleMicroPosts: MicroPost[] = [
  {
    id: '1',
    content: '今天天气真好，适合写代码！☀️',
    createdAt: '2024-01-25T09:00:00Z',
    likes: 5,
    commentCount: 2,
  },
  {
    id: '2',
    content: '刚学会了 Tailwind CSS 的新技巧，太棒了！',
    createdAt: '2024-01-24T14:20:00Z',
    likes: 8,
    commentCount: 1,
  },
  {
    id: '3',
    content: '代码就像写作，需要不断练习和改进。',
    createdAt: '2024-01-23T18:45:00Z',
    likes: 12,
    commentCount: 3,
  },
];

export const sampleComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    author: '访客A',
    content: '写得真好！期待更多文章。',
    createdAt: '2024-01-15T12:00:00Z',
  },
  {
    id: '2',
    microPostId: '1',
    author: '访客B',
    content: '同意！',
    createdAt: '2024-01-25T10:00:00Z',
  },
];
