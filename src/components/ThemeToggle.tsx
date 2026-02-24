'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-x-hover dark:hover:bg-[#181818] transition-colors"
      aria-label="切换主题"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-x-black" />
      ) : (
        <Sun className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
