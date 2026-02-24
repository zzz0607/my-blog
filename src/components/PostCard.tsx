import Link from 'next/link';
import { MessageCircle, Heart, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

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
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="block p-4 border-b border-x-border hover:bg-x-hover dark:hover:bg-[#181818] transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-x-light-gray flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-x-black dark:text-white">博主</span>
            <span className="text-x-gray">@blogger</span>
            <span className="text-x-gray">·</span>
            <span className="text-x-gray text-sm">
              {format(new Date(post.createdAt), 'MM月dd日', { locale: zhCN })}
            </span>
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
    </Link>
  );
}
