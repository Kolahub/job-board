'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setJobDetails } from '@/lib/jobSlice';
import Details from './Details';
import Footer from './Footer';

export default function JobDetailsContent({ job }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (job) {
      dispatch(setJobDetails(job));
    }

    // Cleanup function to clear job details when component unmounts
    return () => {
      dispatch(setJobDetails(null));
    };
  }, [job, dispatch]);

  if (!job) {
    return null; // Let the server component handle the loading/error states
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 md:pb-24 pt-6 md:pt-8">
      <div className="pt-[142px] sm:pt-0 mb-12">
        <Details job={job} />
      </div>
      <Footer position={job.position} company={job.company} />
    </div>
  );
}
