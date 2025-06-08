export default function Details({ job }) {
  const { 
    position,
    postedAt,
    contract,
    location,
    description,
    requirements,
    role
  } = job;

  return (
    <div className="bg-white dark:bg-very-dark-blue rounded-md p-6 md:p-12 shadow-md">
      <div className="md:flex md:items-start md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center text-dark-grey mb-2">
            <span>{postedAt}</span>
            <span className="mx-3">•</span>
            <span>{contract}</span>
          </div>
          <h1 className="text-2xl font-bold text-very-dark-blue dark:text-white mb-2">
            {position}
          </h1>
          <p className="text-violet font-bold">{location}</p>
        </div>
        
        <a 
          href={job.apply}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full md:w-auto bg-violet hover:bg-light-violet text-white font-bold py-3 px-6 rounded-md text-center transition-colors duration-200"
        >
          Apply Now
        </a>
      </div>

      <div className="mt-8 text-dark-grey leading-relaxed">
        <p className="mb-8">{description}</p>
        
        <h2 className="text-xl font-bold text-very-dark-blue dark:text-white mb-6">Requirements</h2>
        <p className="mb-6">{requirements?.content}</p>
        
        <ul className="list-disc pl-5 space-y-2 mb-8 marker:text-violet marker:font-bold">
          {requirements?.items?.map((item, index) => (
            <li key={index} className="pl-2">
              <span className="relative -left-2">{item}</span>
            </li>
          ))}
        </ul>
        
        <h2 className="text-xl font-bold text-very-dark-blue dark:text-white mb-6">What You Will Do</h2>
        <p className="mb-6">{role?.content}</p>
        
        <ol className="list-decimal pl-5 space-y-2 marker:text-violet marker:font-bold">
          {role?.items?.map((item, index) => (
            <li key={index} className="pl-2">
              <span className="relative -left-2">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
