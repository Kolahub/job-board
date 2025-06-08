'use client';
import Image from 'next/image';

function SearchBar() {
  return (
    <div className='bg-white dark:bg-very-dark-blue rounded-md shadow-lg w-full mx-auto flex flex-col md:flex-row items-stretch'>
      <div className='flex-2/5 flex items-center gap-4 border-r border-gray-200 dark:border-dark-grey py-4 md:py-0 px-4 md:px-6 h-[80px]'>
        <div className='hidden md:block'>
          <Image 
            src="/desktop/icon-search.svg" 
            alt="Search" 
            width={24} 
            height={24}
            className='text-gray-400'
          />
        </div>
        <input 
          type="text" 
          placeholder="Filter by title, companies, expertise..."
          className='w-full outline-none bg-transparent text-very-dark-blue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base caret-violet'
          suppressHydrationWarning={true}
        />
      </div>
      
      <div className='flex-1/4 flex items-center gap-4 w-full md:w-auto border-r border-gray-200 dark:border-dark-grey py-4 md:py-0 px-4 md:px-6'>
        <div className='hidden md:block'>
          <Image 
            src="/desktop/icon-location.svg" 
            alt="Location" 
            width={17} 
            height={24}
          />
        </div>
        <input 
          type="text" 
          placeholder="Filter by location..."
          className='w-full md:w-40 outline-none bg-transparent text-very-dark-blue dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base caret-violet'
          suppressHydrationWarning={true}
        />
      </div>
      
      <div className='flex-grow flex items-center justify-end gap-6 w-full md:w-auto px-4 md:px-6 py-4 md:py-0'>
        <div className='flex items-center gap-3'>
          <div className="relative">
            <input 
              type="checkbox" 
              id="full-time"
              className="appearance-none w-6 h-6 rounded bg-gray-200 dark:bg-gray-400 hover:bg-light-violet checked:hover:bg-violet checked:bg-violet checked:bg-[url('/desktop/icon-check.svg')] bg-no-repeat bg-center cursor-pointer focus:outline-none"
            />
          </div>
          <label htmlFor="full-time" className='text-very-dark-blue dark:text-white font-bold text-sm md:text-base'>
            Full Time Only
          </label>
        </div>

        <button className= 'cursor-pointer bg-violet hover:bg-light-violet text-white font-bold w-32 py-4 px-2 rounded-md whitespace-nowrap text-sm md:text-base'>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;