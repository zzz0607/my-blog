'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, TrendingUp } from 'lucide-react';
import { TopNav } from '@/components/TopNav';
import { LeftSidebar } from '@/components/LeftSidebar';
import { MobileNav } from '@/components/MobileNav';
import { MobileMenu } from '@/components/MobileMenu';
import { PostCard } from '@/components/PostCard';
import { MicroPostCard } from '@/components/MicroPostCard';

const categories = ['技术', '生活', '思考', '编程', '设计'];

const trendingTopics = [
  { id: 1, name: 'Next.js 14', posts: '2.3K posts' },
  { id: 2, name: 'React 19', posts: '1.8K posts' },
  { id: 3, name: 'Tailwind CSS', posts: '980 posts' },
  { id: 4, name: 'TypeScript', posts: '750 posts' },
  { id: 5, name: 'AI 助手', posts: '520 posts' },
];

export default function ExploreClient({ posts, microposts }: { posts: any[]; microposts: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <TopNav />
      <LeftSidebar />
      <MobileMenu isOpen={false} onClose={() => {}} />
      
      <main className="ml-[275px] max-w-[600px] pt-14 pb-16 md:pb-0">
        <div className="sticky top-14 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
          <div className="p-4 border-b border-x-border">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索"
                className="w-full h-10 pl-10 pr-4 bg-x-hover dark:bg-[#181818] rounded-full text-sm outline-none text-x-black dark:text-white placeholder-x-gray"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-x-gray" />
            </div>
          </div>
          
          <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-x-border">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-1.5 bg-x-hover dark:bg-[#181818] rounded-full text-sm font-medium text-x-black dark:text-white whitespace-nowrap hover:bg-x-light-gray dark:hover:bg-x-border transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="border-b border-x-border">
          <h2 className="px-4 py-3 font-bold text-xl text-x-black dark:text-white">
            热门趋势
          </h2>
          
          {trendingTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/explore?topic=${topic.name}`}
              className="block px-4 py-3 hover:bg-x-hover dark:hover:bg-[#181818] transition-colors"
            >
              <div className="flex items-center gap-1 text-x-gray text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>热门 · 趋势</span>
              </div>
              <div className="font-bold text-x-black dark:text-white mt-0.5">
                {topic.name}
              </div>
              <div className="text-x-gray text-sm">
                {topic.posts}
              </div>
            </Link>
          ))}
        </div>
        
        <div>
          <h2 className="px-4 py-3 font-bold text-xl text-x-black dark:text-white border-b border-x-border">
            文章
          </h2>
          
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="p-8 text-center text-x-gray">
              暂无文章
            </div>
          )}
        </div>
        
        <div>
          <h2 className="px-4 py-3 font-bold text-xl text-x-black dark:text-white border-b border-x-border">
            短动态
          </h2>
          
          {microposts.map((post) => (
            <MicroPostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
