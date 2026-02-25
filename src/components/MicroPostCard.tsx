'use client';

import { useState } from 'react';
import { MessageCircle, Heart, Repeat, Share, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { MicroPost } from '@/types';
import { ConfirmModal } from './ConfirmModal';

interface MicroPostCardProps {
  post: MicroPost;
  onDelete?: (id: string) => void;
}

export function MicroPostCard({ post, onDelete }: MicroPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'micropost', id: post.id }),
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
    <div className="p-4 border-b border-x-border hover:bg-x-hover dark:hover:bg-[#181818] transition-colors cursor-pointer">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-x-black dark:text-white">博主</span>
              <span className="text-x-gray">@blogger</span>
              <span className="text-x-gray">·</span>
              <span className="text-x-gray text-sm">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: zhCN })}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-2 rounded-full text-x-gray hover:text-x-red hover:bg-x-red/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <p className="mt-1 text-[15px] text-x-black dark:text-white leading-normal whitespace-pre-wrap">
            {post.content}
          </p>
          
          <div className="flex items-center justify-between mt-3 max-w-[425px] text-x-gray">
            <button className="flex items-center gap-2 group hover:text-x-blue transition-colors">
              <div className="p-2 rounded-full group-hover:bg-x-blue/10">
                <MessageCircle className="w-[18px] h-[18px]" />
              </div>
              <span className="text-sm">{post.commentCount}</span>
            </button>
            
            <button className="flex items-center gap-2 group hover:text-x-green transition-colors">
              <div className="p-2 rounded-full group-hover:bg-x-green/10">
                <Repeat className="w-[18px] h-[18px]" />
              </div>
              <span className="text-sm">0</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className={`flex items-center gap-2 group transition-colors ${
                liked ? 'text-x-red' : 'hover:text-x-red'
              }`}
            >
              <div className={`p-2 rounded-full ${liked ? 'bg-x-red/10' : 'group-hover:bg-x-red/10'}`}>
                <Heart className={`w-[18px] h-[18px] ${liked ? 'fill-x-red' : ''}`} />
              </div>
              <span className="text-sm">{likes}</span>
            </button>
            
            <button className="flex items-center gap-2 group hover:text-x-blue transition-colors">
              <div className="p-2 rounded-full group-hover:bg-x-blue/10">
                <Share className="w-[18px] h-[18px]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={showDeleteConfirm}
      title="删除短动态？"
      message="此操作无法撤销，这条短动态将被永久删除。"
      onConfirm={handleDelete}
      onCancel={() => setShowDeleteConfirm(false)}
    />
    </>
  );
}
