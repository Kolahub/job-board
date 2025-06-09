'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Error initializing theme:', e);
    }
  }, []);

  return null; // This component doesn't render anything
}
