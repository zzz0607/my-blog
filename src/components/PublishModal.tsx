'use client';

import { useState, useEffect } from 'react';
import { X, Image, Smile } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'post' | 'micropost';
  onSuccess?: () => void;
}

export function PublishModal({ isOpen, onClose, type, onSuccess }: PublishModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('技术');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setContent('');
    setTitle('');
    setTags('');
    setCategory('技术');
    setError('');
  }, [type, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('请输入内容');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title: type === 'post' ? title : '',
          content,
          category: type === 'post' ? category : undefined,
          tags: type === 'post' ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '发布失败');
      }

      setContent('');
      setTitle('');
      setTags('');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        onSuccess?.();
      }, 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-black rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-x-border">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-x-hover dark:hover:bg-[#181818]"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-bold text-x-black dark:text-white">
            {type === 'post' ? '发布文章' : '发布短动态'}
          </span>
          <button
            onClick={handleSubmit}
            disabled={loading || !content.trim()}
            className="px-4 py-1.5 bg-x-blue text-white font-bold rounded-full hover:bg-x-blue-hover transition-colors disabled:opacity-50"
          >
            {loading ? '发布中...' : '发布'}
          </button>
        </div>

        <div className="p-4">
          {type === 'post' && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="标题"
              className="w-full text-xl font-bold outline-none text-x-black dark:text-white placeholder-x-gray bg-transparent mb-4"
            />
          )}
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === 'post' ? '写文章...' : '有什么新鲜事？'}
            className="w-full min-h-[150px] text-[15px] outline-none resize-none text-x-black dark:text-white placeholder-x-gray bg-transparent"
            autoFocus
          />

          {type === 'post' && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="分类"
                className="w-full px-3 py-2 bg-x-hover dark:bg-[#181818] rounded-lg text-sm outline-none text-x-black dark:text-white"
              />
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="标签 (逗号分隔)"
                className="w-full px-3 py-2 bg-x-hover dark:bg-[#181818] rounded-lg text-sm outline-none text-x-black dark:text-white"
              />
            </div>
          )}

          {error && (
            <p className="mt-3 text-sm text-x-red">{error}</p>
          )}
          {showSuccess && (
            <p className="mt-3 text-sm text-x-green-500">发布成功!</p>
          )}
        </div>

        <div className="flex items-center gap-4 p-4 border-t border-x-border">
          <button className="p-2 rounded-full hover:bg-x-blue/10 text-x-blue">
            <Image className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-x-blue/10 text-x-blue">
            <Smile className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
