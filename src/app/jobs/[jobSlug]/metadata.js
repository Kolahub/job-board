import { getJobDetails } from "@/lib/data";

export async function generateMetadata({ params }) {
  const job = await getJobDetails(params.jobSlug);
  
  return {
    title: job ? `${job.position} at ${job.company} | devjobs` : 'Job Details | devjobs',
    description: job?.description || 'Job details page',
  };
}
