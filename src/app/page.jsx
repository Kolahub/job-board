'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JobsList from '@/components/JobsList';
import { selectFilters } from '@/lib/jobSlice';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/data.json');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    // Search by title, company, or expertise
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = !filters.search || 
      job.position.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.requirements?.content?.toLowerCase().includes(searchLower) ||
      job.role?.content?.toLowerCase().includes(searchLower);
    
    // Filter by location
    const locationLower = filters.location.toLowerCase();
    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(locationLower);
    
    // Filter by job type (full time)
    const matchesJobType = !filters.fullTimeOnly || 
      job.contract.toLowerCase() === 'full time';
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-violet h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="container mx-auto px-4">
        <JobsList jobs={filteredJobs} />
      </div>
    </div>
  );
}
