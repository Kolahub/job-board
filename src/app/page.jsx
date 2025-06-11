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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = `${baseUrl}/data.json`;
    console.log('Fetching from URL:', url);
    
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('Response status:', res.status, 'URL:', url);
      throw new Error(`Failed to fetch jobs: ${res.status}`);
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
