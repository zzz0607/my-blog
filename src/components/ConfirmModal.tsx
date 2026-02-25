'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = '删除',
  cancelText = '取消',
  onConfirm,
  onCancel,
  danger = true,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-x-red/10">
            <Trash2 className="w-6 h-6 text-x-red" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-center text-x-black dark:text-white">
            {title}
          </h3>
          
          <p className="text-center text-x-gray text-[15px]">
            {message}
          </p>
        </div>

        <div className="flex gap-3 p-4 border-t border-x-border">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 font-bold text-x-black dark:text-white bg-x-light-gray dark:bg-[#181818] rounded-full hover:bg-x-hover transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 font-bold text-white rounded-full transition-colors ${
              danger
                ? 'bg-x-red hover:bg-x-red-hover'
                : 'bg-x-blue hover:bg-x-blue-hover'
            } disabled:opacity-50`}
          >
            {loading ? '删除中...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
