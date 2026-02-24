import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

const trendingTopics = [
  { id: 1, name: '技术', posts: '1.2K posts' },
  { id: 2, name: '编程', posts: '980 posts' },
  { id: 3, name: 'Next.js', posts: '540 posts' },
  { id: 4, name: 'React', posts: '320 posts' },
];

const whoToFollow = [
  { id: 1, name: '前端艺术家', handle: 'frontend_art' },
  { id: 2, name: '代码诗人', handle: 'code_poet' },
];

export function RightSidebar() {
  return (
    <aside className="fixed right-0 top-14 bottom-0 w-[350px] px-4 py-2 hidden lg:block">
      <div className="sticky top-2">
        <div className="bg-white dark:bg-black rounded-2xl border border-x-border overflow-hidden">
          <h2 className="px-4 py-3 font-bold text-x-black dark:text-white text-lg">
            热门话题
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
        
        <div className="mt-4 bg-white dark:bg-black rounded-2xl border border-x-border overflow-hidden">
          <h2 className="px-4 py-3 font-bold text-x-black dark:text-white text-lg">
            推荐关注
          </h2>
          
          {whoToFollow.map((user) => (
            <div
              key={user.id}
              className="px-4 py-3 hover:bg-x-hover dark:hover:bg-[#181818] transition-colors cursor-pointer"
            >
              <div className="font-bold text-x-black dark:text-white">
                {user.name}
              </div>
              <div className="text-x-gray text-sm">
                @{user.handle}
              </div>
            </div>
          ))}
          
          <Link
            href="/explore"
            className="block px-4 py-3 text-x-blue hover:bg-x-hover dark:hover:bg-[#181818] transition-colors"
          >
            显示更多
          </Link>
        </div>
        
        <div className="mt-4 px-4 text-xs text-x-gray">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="#" className="hover:underline">使用条款</Link>
            <Link href="#" className="hover:underline">隐私政策</Link>
            <Link href="#" className="hover:underline">Cookie</Link>
            <Link href="#" className="hover:underline">关于</Link>
          </div>
          <div className="mt-2">
            © 2024 X-Style Blog
          </div>
        </div>
      </div>
    </aside>
  );
}
