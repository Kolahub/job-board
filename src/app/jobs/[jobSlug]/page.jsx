import JobDetailsContent from '@/components/job-details/JobDetailsContent';

export async function generateMetadata({ params }) {
  try {
    const job = await getJobDetails(params.jobSlug);
    if (!job) {
      return {
        title: 'Job Not Found',
        description: 'The requested job could not be found.'
      };
    }

    return {
      title: `${job.position} at ${job.company} | DevJobs`,
      description: `Apply for the ${job.position} position at ${job.company} in ${job.location}. ${job.requirements?.content?.substring(0, 150) || ''}...`,
      openGraph: {
        title: `${job.position} at ${job.company}`,
        description: `Apply for the ${job.position} position at ${job.company} in ${job.location}.`,
        type: 'article',
        publishedTime: new Date().toISOString(),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${job.position} at ${job.company}`,
        description: `Apply for the ${job.position} position at ${job.company} in ${job.location}.`,
      },
    };
  } catch (error) {
    return {
      title: 'Job Details',
      description: 'View job details',
    };
  }
}

async function getJobDetails(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/data.json`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
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

export default async function JobDetailsPage({ params }) {
  const { jobSlug } = params;
  let job = null;
  let error = null;

  try {
    job = await getJobDetails(jobSlug);
    if (!job) {
      error = 'Job not found';
    }
  } catch (err) {
    console.error('Error in JobDetailsPage:', err);
    error = 'Failed to load job details';
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

  return <JobDetailsContent job={job} />;
}