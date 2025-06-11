'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 dark:border-t-blue-400 border-transparent animate-spin">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  );
}
