'use client';

import { useEffect, useState, use } from 'react';
import { useDispatch } from 'react-redux';
import { setJobDetails } from '@/lib/jobSlice';
import Details from '@/components/job-details/Details';
import Footer from '@/components/job-details/Footer';

async function getJobDetails(id) {
  try {
    const res = await fetch('/data.json');
    const jobs = await res.json();
    const job = jobs.find(job => job.id === parseInt(id));
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    return job;
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
}

function JobDetailsContent({ jobSlug }) {
  const dispatch = useDispatch();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobDetails(jobSlug);
        if (jobData) {
          setJob(jobData);
          dispatch(setJobDetails(jobData));
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();

    // Cleanup function to clear job details when component unmounts
    return () => {
      dispatch(setJobDetails(null));
    };
  }, [jobSlug, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-violet h-5 w-5" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-very-dark-blue dark:text-white mb-4">
            {error || 'Job not found'}
          </h1>
          <p className="text-dark-grey">
            The job you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
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

export default function JobDetails({ params }) {
  // Use React.use() to unwrap the params promise
  const { jobSlug } = use(params);
  
  return <JobDetailsContent jobSlug={jobSlug} />;
}