import JobsList from '@/components/JobsList';


export default async function Home() {
  const res = await fetch('http://localhost:3000/data.json');
    const data = await res.json();
  
  return (
    <div className="pb-16">
      <div className="container mx-auto px-4">
        <JobsList  jobs={data}/>
         </div>

    </div>
  );
}
