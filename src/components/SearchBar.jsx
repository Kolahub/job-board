'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, selectFilters } from '@/lib/jobSlice';
import Image from 'next/image';

function SearchBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [fullTimeOnly, setFullTimeOnly] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Initialize from Redux on mount
  useEffect(() => {
    setSearchTerm(filters.search || '');
    setLocation(filters.location || '');
    setFullTimeOnly(filters.fullTimeOnly || false);
  }, [filters]);

  // Scroll to top when mobile filters close
  useEffect(() => {
    if (!isMobileFiltersOpen && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isMobileFiltersOpen]);

  // Update filters on change instead of on form submit
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ 
        search: searchTerm,
        location,
        fullTimeOnly 
      }));
    }, 300); // Small debounce to avoid too many dispatches
    
    return () => clearTimeout(timer);
  }, [searchTerm, location, fullTimeOnly, dispatch]);

  // Keep the form submission handler but prevent default
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-very-dark-blue rounded-md shadow-lg w-full mx-auto -mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Search Input - Mobile */}
        <div className="md:hidden flex items-center px-4 py-4 gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by title..."
              className="w-full outline-none bg-transparent text-very-dark-blue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base caret-violet pr-12"
            suppressHydrationWarning={true}
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={toggleMobileFilters}
              className="p-2 text-gray-400 hover:text-gray-500"
              aria-label="Open filters"
              suppressHydrationWarning={true}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.108 0H0.861914C0.0452148 0 -0.313461 1.06667 0.366719 1.6L8 8.16667V16.6667C8 16.9917 8.15076 17.2917 8.39999 17.4667L11.7 19.8C12.2 20.15 12.9 19.825 12.9 19.2167V8.16667L20.6333 1.6C21.3135 1.06667 20.9247 0 19.108 0Z" fill="currentColor"/>
              </svg>
            </button>
            <button 
              type="submit"
              className="bg-violet hover:bg-light-violet text-white p-2 rounded-md flex-shrink-0"
              aria-label="Search"
            suppressHydrationWarning={true}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.024 15.0588H17.1123L22.8529 21.1765L21.1353 23L15.3364 16.9412V16.7647L14.976 16.3765C13.3548 17.6941 11.2508 18.4706 8.94648 18.4706C4.11594 18.4706 0.177246 14.4 0.177246 9.41176C0.177246 4.42353 4.11594 0.352936 8.94648 0.352936C13.777 0.352936 17.7157 4.42353 17.7157 9.41176C17.7157 11.8588 16.7323 14.0824 15.1364 15.6706L16.024 15.0588ZM2.89477 9.41174C2.89477 13.0588 5.62725 15.8823 8.94648 15.8823C12.2657 15.8823 14.9982 13.0588 14.9982 9.41174C14.9982 5.76467 12.2657 2.94116 8.94648 2.94116C5.62725 2.94116 2.89477 5.76467 2.89477 9.41174Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Input - Desktop */}
        <div className="hidden md:flex flex-1 items-center gap-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-grey py-4 md:py-0 px-4 md:px-6 h-20">
          <div>
            <Image 
              src="/desktop/icon-search.svg" 
              alt="Search" 
              width={24} 
              height={24}
              className="text-gray-400"
            />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by title, companies, expertise..."
            className="w-full outline-none bg-transparent text-very-dark-blue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base caret-violet"
            suppressHydrationWarning={true}
          />
        </div>

        {/* Location Filter - Desktop */}
        <div className="hidden md:flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-grey py-4 md:py-0 px-4 md:px-6 h-20 w-1/3">
          <div>
            <Image 
              src="/desktop/icon-location.svg" 
              alt="Location" 
              width={24} 
              height={24}
              className="text-gray-400"
            />
          </div>
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by location..."
            className="w-full outline-none bg-transparent text-very-dark-blue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base caret-violet"
            suppressHydrationWarning={true}
          />
        </div>

        {/* Full Time Only - Desktop */}
        <div className="hidden md:flex items-center justify-between px-4 md:px-6 h-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="checkbox" 
                id="full-time"
                checked={fullTimeOnly}
                onChange={(e) => setFullTimeOnly(e.target.checked)}
                className="appearance-none w-6 h-6 rounded bg-[#979797]/30 hover:bg-light-violet checked:hover:bg-violet checked:bg-violet checked:bg-[url('/desktop/icon-check.svg')] bg-no-repeat bg-center cursor-pointer focus:outline-none"
                suppressHydrationWarning={true}
              />
            </div>
            <label htmlFor="full-time" className="font-bold text-very-dark-blue dark:text-white whitespace-nowrap">
              Full Time Only
            </label>
          </div>
          <button 
            type="submit"
            className="bg-violet hover:bg-light-violet text-white font-bold py-2.5 px-4 sm:py-3 sm:px-6 rounded-md whitespace-nowrap ml-4 transition-colors duration-200 text-sm sm:text-base"
            suppressHydrationWarning={true}
          >
            Search
          </button>
        </div>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Clickable Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileFiltersOpen(false)}
            role="button"
            aria-label="Close filters"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsMobileFiltersOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
            <div 
              className="bg-white dark:bg-very-dark-blue rounded-2xl p-6 w-full max-w-md mx-auto pointer-events-auto" 
              onClick={e => e.stopPropagation()}
            >
            
            <div className="flex flex-col gap-6 mt-4">
              {/* Location Filter */}
              <div className="flex items-center gap-4 border-b border-gray-200 dark:border-dark-grey pb-4">
                <Image 
                  src="/desktop/icon-location.svg" 
                  alt="Location" 
                  width={24} 
                  height={24}
                  className="text-gray-400"
                />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Filter by location..."
                  className="w-full outline-none bg-transparent text-very-dark-blue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base"
                />
              </div>

              {/* Full Time Only */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="mobile-full-time"
                    checked={fullTimeOnly}
                    onChange={(e) => {
                      setFullTimeOnly(e.target.checked);
                      // Close modal after a small delay to allow state to update
                      setTimeout(() => setIsMobileFiltersOpen(false), 100);
                    }}
                    className="appearance-none w-6 h-6 rounded bg-[#979797]/30 hover:bg-light-violet checked:hover:bg-violet checked:bg-violet checked:bg-[url('/desktop/icon-check.svg')] bg-no-repeat bg-center cursor-pointer focus:outline-none"
                    suppressHydrationWarning={true}
                  />
                </div>
                <label htmlFor="mobile-full-time" className="font-bold text-very-dark-blue dark:text-white">
                  Full Time Only
                </label>
              </div>
              
              {/* Search Button */}
              <button 
                type="button"
                onClick={() => {
                  // Close the modal when search is clicked
                  setIsMobileFiltersOpen(false);
                }}
                className="w-full bg-violet hover:bg-light-violet text-white font-bold py-4 px-6 rounded-md transition-colors duration-200"
                suppressHydrationWarning={true}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </form>
  );
}

export default SearchBar;