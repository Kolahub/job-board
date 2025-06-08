'use client';

import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import SearchBar from "@/components/SearchBar";
import DetailsBar from "@/components/job-details/DetailsBar";

export default function SubHeader() {
  const pathName = usePathname();
  const isJobPage = pathName.startsWith('/jobs/');
  const currentJob = useSelector((state) => state.job.currentJob);

  return (
    <div className="fixed top-32 left-0 right-0 z-10">
      <div className="w-full sm:container sm:mx-auto px-4">
        {pathName === '/' ? (
          <SearchBar />
        ) : isJobPage && currentJob ? (
          <DetailsBar 
            company={currentJob.company}
            logo={currentJob.logo}
            logoBackground={currentJob.logoBackground}
            website={currentJob.website}
          />
        ) : null}
      </div>
    </div>
  );
}