'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const isDarkMode = root.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newIsDark = !isDark;
    
    if (newIsDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(newIsDark);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-32 md:h-40 bg-[url('/mobile/bg-pattern-header.svg')] md:bg-[url('/desktop/bg-pattern-header.svg')] bg-no-repeat bg-cover z-10">
      <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
        <div className="pt-1">
          <Image 
            src='/desktop/logo.svg'
            alt="devjobs logo" 
            width={115} 
            height={32} 
            className="w-auto h-7 md:h-8"
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          <Image 
            src="/desktop/icon-sun.svg" 
            alt="Light mode" 
            width={20} 
            height={20}
            className="w-5 h-5"
          />
          <div 
            className="relative w-12 h-6 bg-white group rounded-full p-1 cursor-pointer" 
            onClick={toggleTheme}
            role="switch"
            aria-checked={isDark}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTheme()}
          >
            <div 
              className={`absolute w-4 h-4 bg-violet group-hover:bg-light-violet rounded-full transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
            ></div>
          </div>
          <Image 
            src="/desktop/icon-moon.svg" 
            alt="Dark mode" 
            width={16} 
            height={16}
            className="w-4 h-4"
          />
        </div>
      </div>
    </header>
  );
}
