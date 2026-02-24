'use client';

import { useState } from 'react';

interface TimelineTabsProps {
  onChange: (tab: 'forYou' | 'following') => void;
}

export function TimelineTabs({ onChange }: TimelineTabsProps) {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');

  const handleTabChange = (tab: 'forYou' | 'following') => {
    setActiveTab(tab);
    onChange(tab);
  };

  return (
    <div className="flex border-b border-x-border">
      <button
        onClick={() => handleTabChange('forYou')}
        className={`flex-1 py-4 text-center font-medium transition-colors relative ${
          activeTab === 'forYou'
            ? 'text-x-black dark:text-white'
            : 'text-x-gray hover:bg-x-hover dark:hover:bg-[#181818]'
        }`}
      >
        <span>为你推荐</span>
        {activeTab === 'forYou' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
        )}
      </button>
      <button
        onClick={() => handleTabChange('following')}
        className={`flex-1 py-4 text-center font-medium transition-colors relative ${
          activeTab === 'following'
            ? 'text-x-black dark:text-white'
            : 'text-x-gray hover:bg-x-hover dark:hover:bg-[#181818]'
        }`}
      >
        <span>关注</span>
        {activeTab === 'following' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-x-blue rounded-full" />
        )}
      </button>
    </div>
  );
}
