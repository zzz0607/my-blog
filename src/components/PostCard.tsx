'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Heart, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ConfirmModal } from './ConfirmModal';

interface PostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    coverImage?: string;
    category?: string;
    tags?: string[];
    viewCount?: number;
    createdAt: string;
  };
  onDelete?: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'post', id: post.id }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '删除失败');
      }
      
      setShowDeleteConfirm(false);
      onDelete?.(post.id);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
    <div className="block p-4 border-b border-x-border hover:bg-x-hover dark:hover:bg-[#181818] transition-colors cursor-pointer">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-x-black dark:text-white">博主</span>
              <span className="text-x-gray">@blogger</span>
              <span className="text-x-gray">·</span>
              <span className="text-x-gray text-sm">
                {format(new Date(post.createdAt), 'MM月dd日', { locale: zhCN })}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-2 rounded-full text-x-gray hover:text-x-red hover:bg-x-red/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <h3 className="mt-1 text-[15px] text-x-black dark:text-white leading-snug">
            {post.title}
          </h3>
          
          {post.coverImage && (
            <div className="mt-3 rounded-2xl overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="flex items-center gap-12 mt-3 text-x-gray">
            <div className="flex items-center gap-2 group">
              <MessageCircle className="w-[18px] h-[18px]" />
              <span className="text-sm">0</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Heart className="w-[18px] h-[18px]" />
              <span className="text-sm">0</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Eye className="w-[18px] h-[18px]" />
              <span className="text-sm">{post.viewCount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={showDeleteConfirm}
      title="删除文章？"
      message="此操作无法撤销，这篇文章将被永久删除。"
      onConfirm={handleDelete}
      onCancel={() => setShowDeleteConfirm(false)}
    />
    </>
  );
}
