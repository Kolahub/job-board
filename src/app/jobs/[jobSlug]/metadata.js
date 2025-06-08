async function getJobDetails(id) {
  try {
    const res = await fetch('http://localhost:3000/data.json');
    const jobs = await res.json();
    return jobs.find(job => job.id === parseInt(id));
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const job = await getJobDetails(params.jobSlug);
  
  return {
    title: job ? `${job.position} at ${job.company} | devjobs` : 'Job Details | devjobs',
    description: job?.description || 'Job details page',
  };
}
