import JobsContainer from '@/components/JobsContainer';

export const metadata = {
  title: 'Find Your Dream Developer Job',
  description: 'Browse and apply for the latest developer jobs. Filter by location, job type, and more to find your perfect tech career opportunity.',
  openGraph: {
    title: 'Find Your Dream Developer Job | DevJobs',
    description: 'Browse and apply for the latest developer jobs. Filter by location, job type, and more to find your perfect tech career opportunity.',
  },
};

async function getJobs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/data.json`);
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export default async function Home() {
  const initialJobs = await getJobs();
  
  return <JobsContainer initialJobs={initialJobs} />;
}
