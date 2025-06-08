'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const JobsList = ({jobs}) => {
  const [visibleJobs, setVisibleJobs] = useState(12);
  const jobsPerPage = 12;

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">No jobs found</h2>
        <p className="text-gray-500 mt-2">Check back later for new job postings</p>
      </div>
    );
  }

  const toggleJobs = () => {
    if (visibleJobs > jobsPerPage) {
      setVisibleJobs(jobsPerPage);
    } else {
      setVisibleJobs(Math.min(jobs.length, visibleJobs + jobsPerPage));
    }
  };

  const displayedJobs = jobs.slice(0, visibleJobs);
  const showToggleButton = jobs.length > jobsPerPage;
  const isExpanded = visibleJobs > jobsPerPage;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-4 sm:gap-y-16 lg:gap-x-8 lg:gap-y-12">
        {displayedJobs.map((job) => (
          <Link href={`/jobs/${job.id}`} 
            key={job.id}
            className="bg-white dark:bg-very-dark-blue rounded-md px-6 py-8 sm:px-8 sm:py-10 relative shadow-md hover:shadow-lg transition-shadow duration-200 h-auto flex flex-col justify-between"
          >
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center absolute -top-6 left-6 sm:-top-7 sm:left-8"
              style={{ backgroundColor: job.logoBackground }}
            >
              <Image 
                src={job.logo} 
                alt={`${job.company} logo`} 
                width={40}
                height={40}
                className="w-2/3 h-auto object-contain"
              />
            </div>
            
            <div className="mb-10">
              <div className="text-dark-grey mb-3">
                <span>{job.postedAt}</span>
                <span className="mx-2 font-bold text-2xl">•</span>
                <span>{job.contract}</span>
              </div>
              <h2 className="text-xl font-bold text-very-dark-blue dark:text-white mb-2 line-clamp-1">
                {job.position}
              </h2>
              <p className="text-gray-400 text-base mb-4 line-clamp-1">{job.company}</p>
            </div>
            <p className="text-violet font-bold text-sm">{job.location}</p>
          </Link>
        ))}
      </div>
      
      {showToggleButton && (
        <div className="flex justify-center mt-12">
          <button
            onClick={toggleJobs}
            className="cursor-pointer bg-violet hover:bg-light-violet text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
          >
            {isExpanded ? 'Show Less' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
};

export default JobsList;
