'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Heart, Share, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { TopNav } from '@/components/TopNav';
import { LeftSidebar } from '@/components/LeftSidebar';
import { MobileNav } from '@/components/MobileNav';
import { MobileMenu } from '@/components/MobileMenu';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { sampleComments } from '@/lib/data';

export default function PostDetailClient({ post }: { post: any }) {
  const comments = sampleComments.filter((c) => c.postId === post?.id);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <TopNav />
        <LeftSidebar />
        <MobileMenu isOpen={false} onClose={() => {}} />
        <main className="ml-[275px] max-w-[600px] pt-14 pb-16 md:pb-0">
          <div className="p-4">
            <Link href="/" className="flex items-center gap-2 text-x-blue">
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </Link>
            <h1 className="mt-4 text-xl font-bold">文章未找到</h1>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <TopNav />
      <LeftSidebar />
      <MobileMenu isOpen={false} onClose={() => {}} />
      
      <main className="ml-[275px] max-w-[600px] pt-14 pb-16 md:pb-0">
        <div className="border-b border-x-border">
          <div className="flex items-center gap-4 p-4">
            <Link href="/" className="p-2 rounded-full hover:bg-x-hover dark:hover:bg-[#181818]">
              <ArrowLeft className="w-5 h-5 text-x-black dark:text-white" />
            </Link>
            <h1 className="font-bold text-xl text-x-black dark:text-white">帖子</h1>
          </div>
        </div>
        
        <article className="border-b border-x-border">
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-x-black dark:text-white">博主</span>
                  <span className="text-x-gray">@blogger</span>
                  <span className="text-x-gray">·</span>
                  <span className="text-x-gray text-sm">
                    {format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}
                  </span>
                </div>
                
                <h2 className="mt-3 text-xl font-bold text-x-black dark:text-white">
                  {post.title}
                </h2>
                
                <div className="mt-3">
                  <MarkdownRenderer content={post.content} />
                </div>
                
                {post.coverImage && (
                  <div className="mt-4 rounded-2xl overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-x-border text-x-gray">
                  <button className="flex items-center gap-2 group hover:text-x-blue transition-colors">
                    <MessageCircle className="w-[18px] h-[18px]" />
                    <span className="text-sm">{comments.length}</span>
                  </button>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 group transition-colors ${
                      liked ? 'text-x-red' : 'hover:text-x-red'
                    }`}
                  >
                    <Heart className={`w-[18px] h-[18px] ${liked ? 'fill-x-red' : ''}`} />
                    <span className="text-sm">{likes}</span>
                  </button>
                  <button className="flex items-center gap-2 group hover:text-x-blue transition-colors">
                    <Share className="w-[18px] h-[18px]" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Eye className="w-[18px] h-[18px]" />
                    <span className="text-sm">{post.viewCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <div className="border-b border-x-border p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的评论..."
                className="w-full bg-transparent text-[15px] outline-none resize-none text-x-black dark:text-white placeholder-x-gray min-h-[50px]"
              />
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-x-blue/10 text-x-blue">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <button 
                  disabled={!newComment.trim()}
                  className="px-4 py-1.5 bg-x-blue text-white font-bold rounded-full hover:bg-x-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  评论
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-x-border">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-x-black dark:text-white">{comment.author}</span>
                    <span className="text-x-gray">·</span>
                    <span className="text-x-gray text-sm">
                      {format(new Date(comment.createdAt), 'MM月dd日 HH:mm', { locale: zhCN })}
                    </span>
                  </div>
                  <p className="mt-1 text-[15px] text-x-black dark:text-white">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
