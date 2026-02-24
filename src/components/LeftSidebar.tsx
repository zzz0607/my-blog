'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Hash, User } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: '首页' },
  { href: '/explore', icon: Hash, label: '探索' },
  { href: '/profile', icon: User, label: '个人资料' },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-[275px] px-4 py-2 border-r border-x-border hidden md:block">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-full transition-colors ${
                isActive
                  ? 'font-bold'
                  : 'hover:bg-x-hover dark:hover:bg-[#181818]'
              }`}
            >
              <Icon className={`w-7 h-7 ${isActive ? 'text-x-blue' : 'text-x-black dark:text-white'}`} />
              <span className={`text-xl ${isActive ? 'text-x-blue' : 'text-x-black dark:text-white'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
