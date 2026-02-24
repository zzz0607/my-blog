'use client';

import Link from 'next/link';
import { X, Home, Hash, User, Settings } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/', icon: Home, label: '首页' },
  { href: '/explore', icon: Hash, label: '探索' },
  { href: '/profile', icon: User, label: '个人资料' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <aside className="absolute left-0 top-0 bottom-0 w-[275px] bg-white dark:bg-black border-r border-x-border">
        <div className="flex items-center justify-between p-4 border-b border-x-border">
          <span className="font-bold text-xl text-x-black dark:text-white">菜单</span>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-x-hover dark:hover:bg-[#181818]"
          >
            <X className="w-6 h-6 text-x-black dark:text-white" />
          </button>
        </div>
        
        <nav className="flex flex-col p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-full hover:bg-x-hover dark:hover:bg-[#181818] transition-colors"
              >
                <Icon className="w-6 h-6 text-x-black dark:text-white" />
                <span className="text-lg text-x-black dark:text-white">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
