'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { TopNav } from '@/components/TopNav';
import { LeftSidebar } from '@/components/LeftSidebar';
import { MobileNav } from '@/components/MobileNav';
import { MobileMenu } from '@/components/MobileMenu';
import { PostCard } from '@/components/PostCard';
import { MicroPostCard } from '@/components/MicroPostCard';
import { defaultUser } from '@/lib/data';

type TabType = 'posts' | 'microposts' | 'about';

export default function ProfileClient({ posts, microposts }: { posts: any[]; microposts: any[] }) {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const user = defaultUser;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <TopNav />
      <LeftSidebar />
      <MobileMenu isOpen={false} onClose={() => {}} />
      
      <main className="ml-[275px] max-w-[600px] pt-14 pb-16 md:pb-0">
        <div className="border-b border-x-border">
          <div className="relative">
            <div className="h-32 bg-x-light-gray" />
            <Link
              href="/"
              className="absolute top-2 left-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
          </div>
          
          <div className="px-4 pb-4">
            <div className="relative -mt-12 mb-3">
              <div className="w-24 h-24 rounded-full bg-x-light-gray border-4 border-white dark:border-black" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-bold text-xl text-x-black dark:text-white">{user.name}</h1>
                <div className="text-x-gray">@{user.username}</div>
              </div>
              <button className="px-4 py-1.5 border border-x-border rounded-full font-bold text-x-black dark:text-white hover:bg-x-hover dark:hover:bg-[#181818] transition-colors">
                编辑资料
              </button>
            </div>
            
            <p className="mt-3 text-[15px] text-x-black dark:text-white">{user.bio}</p>
            
            <div className="flex items-center gap-4 mt-3 text-x-gray text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(user.joinedAt), 'yyyy年MM月加入', { locale: zhCN })}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-x-black dark:text-white">
                <span className="font-bold">123</span>
                <span className="text-x-gray ml-1">关注</span>
              </span>
              <span className="text-x-black dark:text-white">
                <span className="font-bold">456</span>
                <span className="text-x-gray ml-1">粉丝</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex border-b border-x-border">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
              activeTab === 'posts'
                ? 'text-x-black dark:text-white'
                : 'text-x-gray hover:bg-x-hover dark:hover:bg-[#181818]'
            }`}
          >
            <span>文章</span>
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('microposts')}
            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
              activeTab === 'microposts'
                ? 'text-x-black dark:text-white'
                : 'text-x-gray hover:bg-x-hover dark:hover:bg-[#181818]'
            }`}
          >
            <span>短动态</span>
            {activeTab === 'microposts' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
              activeTab === 'about'
                ? 'text-x-black dark:text-white'
                : 'text-x-gray hover:bg-x-hover dark:hover:bg-[#181818]'
            }`}
          >
            <span>关于</span>
            {activeTab === 'about' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
            )}
          </button>
        </div>
        
        <div>
          {activeTab === 'posts' && (
            <>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              {posts.length === 0 && (
                <div className="p-8 text-center text-x-gray">暂无文章</div>
              )}
            </>
          )}
          
          {activeTab === 'microposts' && (
            <>
              {microposts.map((post) => (
                <MicroPostCard key={post.id} post={post} />
              ))}
              {microposts.length === 0 && (
                <div className="p-8 text-center text-x-gray">暂无短动态</div>
              )}
            </>
          )}
          
          {activeTab === 'about' && (
            <div className="p-4">
              <h2 className="font-bold text-lg text-x-black dark:text-white mb-4">关于我</h2>
              <p className="text-[15px] text-x-black dark:text-white leading-relaxed">
                热爱技术和思考的人，喜欢探索新技术，分享学习心得。
                主要关注前端开发、TypeScript、React、Next.js 等技术领域。
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-x-hover dark:bg-[#181818] rounded-full text-sm text-x-gray">#前端开发</span>
                <span className="px-3 py-1 bg-x-hover dark:bg-[#181818] rounded-full text-sm text-x-gray">#TypeScript</span>
                <span className="px-3 py-1 bg-x-hover dark:bg-[#181818] rounded-full text-sm text-x-gray">#React</span>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
