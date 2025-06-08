export default function Footer({ position, company }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-very-dark-blue py-6 border-t border-gray-200 dark:border-dark-grey">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="hidden md:block">
            <h3 className="text-lg font-bold text-very-dark-blue dark:text-white">{position}</h3>
            <p className="text-dark-grey">{company}</p>
          </div>
          
          <a 
            href="#apply"
            className="w-full md:w-auto bg-violet hover:bg-light-violet text-white font-bold py-3 px-6 rounded-md text-center transition-colors duration-200"
          >
            Apply Now
          </a>
        </div>
      </div>
    </footer>
  );
}
