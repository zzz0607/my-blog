'use client';

import { Search, Bell, Mail, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-black border-b border-x-border z-50">
      <div className="flex items-center justify-between h-full px-4 max-w-[600px] mx-auto">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-x-hover dark:hover:bg-[#181818] md:hidden"
          >
            <Menu className="w-6 h-6 text-x-black dark:text-white" />
          </button>
          <Link href="/" className="text-xl font-bold text-x-black dark:text-white">
            X
          </Link>
        </div>
        
        <div className="flex-1 max-w-[300px] mx-4 hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索"
              className="w-full h-10 pl-10 pr-4 bg-x-hover dark:bg-[#181818] rounded-full text-sm outline-none text-x-black dark:text-white placeholder-x-gray"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-x-gray" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/profile" className="p-2 rounded-full hover:bg-x-hover dark:hover:bg-[#181818]">
            <User className="w-6 h-6 text-x-black dark:text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}
