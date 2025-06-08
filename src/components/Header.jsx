'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-32 md:h-40 bg-[url('/mobile/bg-pattern-header.svg')] md:bg-[url('/desktop/bg-pattern-header.svg')] bg-no-repeat bg-cover">
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
