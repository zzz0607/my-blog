'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Hash, User } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: '首页' },
  { href: '/explore', icon: Hash, label: '探索' },
  { href: '/profile', icon: User, label: '我的' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-black border-t border-x-border md:hidden z-50">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-x-blue' : 'text-x-gray'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
