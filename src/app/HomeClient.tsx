'use client';

import { useState } from 'react';
import { TopNav } from '@/components/TopNav';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { MobileNav } from '@/components/MobileNav';
import { MobileMenu } from '@/components/MobileMenu';
import { PostCard } from '@/components/PostCard';
import { MicroPostCard } from '@/components/MicroPostCard';
import { TimelineTabs } from '@/components/TimelineTabs';
import { PublishModal } from '@/components/PublishModal';

export default function HomeClient({ initialPosts, initialMicroposts }: { initialPosts: any[]; initialMicroposts: any[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [microposts, setMicroposts] = useState(initialMicroposts);
  const [publishType, setPublishType] = useState<'post' | 'micropost' | null>(null);

  const handlePublishSuccess = (newItem: any, type: 'post' | 'micropost') => {
    if (type === 'micropost') {
      setMicroposts([newItem, ...microposts]);
    } else {
      setPosts([newItem, ...posts]);
    }
  };

  const content: any[] = [
    ...posts.map((post) => ({ ...post, type: 'post' })),
    ...microposts.map((post) => ({ ...post, type: 'micropost' })),
  ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleOpenPublish = (type: 'post' | 'micropost') => {
    setPublishType(type);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleDeleteMicroPost = (id: string) => {
    setMicroposts(microposts.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <TopNav />
      <LeftSidebar />
      <RightSidebar />
      <MobileMenu isOpen={false} onClose={() => {}} />
      
      <main className="ml-[275px] mr-[280px] max-w-[800px] pt-14 pb-16 md:pb-0">
        <div className="border-b border-x-border sticky top-14 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
          <h1 className="px-4 py-3 font-bold text-xl text-x-black dark:text-white">首页</h1>
          <TimelineTabs onChange={() => {}} />
        </div>
        
        <div className="border-b border-x-border">
          <div className="p-4 border-b border-x-border">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
              <div className="flex-1">
                <textarea
                  placeholder="有什么新鲜事？"
                  readOnly
                  onClick={() => handleOpenPublish('micropost')}
                  className="w-full bg-transparent text-xl outline-none resize-none text-x-black dark:text-white placeholder-x-gray min-h-[50px] cursor-pointer hover:bg-x-hover dark:hover:bg-[#181818] rounded-lg"
                />
                <div className="flex items-center justify-between pt-3 border-t border-x-border">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenPublish('micropost')}
                      className="p-2 rounded-full hover:bg-x-blue/10 text-x-blue"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleOpenPublish('micropost')}
                      className="p-2 rounded-full hover:bg-x-blue/10 text-x-blue"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleOpenPublish('micropost')}
                    className="px-4 py-1.5 bg-x-blue text-white font-bold rounded-full hover:bg-x-blue-hover transition-colors"
                  >
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex border-b border-x-border">
            <button
              onClick={() => handleOpenPublish('micropost')}
              className="flex-1 py-3 text-center font-medium text-x-blue hover:bg-x-hover dark:hover:bg-[#181818] transition-colors border-b-2 border-x-blue"
            >
              短动态
            </button>
            <button
              onClick={() => handleOpenPublish('post')}
              className="flex-1 py-3 text-center font-medium text-x-gray hover:bg-x-hover dark:hover:bg-[#181818] transition-colors"
            >
              文章
            </button>
          </div>
        </div>
        
        <div>
          {content.map((item: any, index: number) => (
            <div key={`${item.type}-${index}`}>
              {item.type === 'post' ? (
                <PostCard post={item} onDelete={handleDeletePost} />
              ) : (
                <MicroPostCard post={item} onDelete={handleDeleteMicroPost} />
              )}
            </div>
          ))}
        </div>
      </main>
      
      <MobileNav />
      
      <PublishModal
        isOpen={publishType !== null}
        onClose={() => setPublishType(null)}
        type={publishType || 'micropost'}
        onSuccess={handlePublishSuccess}
      />
    </div>
  );
}
