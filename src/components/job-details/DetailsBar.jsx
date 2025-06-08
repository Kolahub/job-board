import Image from 'next/image';

export default function DetailsBar({ company, logo, logoBackground, website }) {
  return (
    <div className="bg-white relative dark:bg-very-dark-blue rounded-md mb-6 pt-12 pb-8 px-6 text-center -mt-8 sm:-mt-4 md:pt-0 md:pb-0 md:px-0 md:flex md:items-center max-w-4xl mx-auto w-full shadow-md">
      {/* Logo Container - Positioned absolutely on mobile */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-2xl md:rounded-none md:relative md:left-0 md:translate-x-0 md:translate-y-0 md:top-0 md:w-36 md:h-36"
        style={{ backgroundColor: logoBackground }}
      >
        <div className="relative w-10 h-10 md:w-20 md:h-20">
          <Image 
            src={logo} 
            alt={company} 
            fill
            className="object-contain p-1"
          />
        </div>
      </div>
      
      <div className="md:flex md:items-center md:justify-between md:w-full md:px-10 md:py-8">
        <div className="mb-6 md:mb-0 md:text-left">
          <h2 className="text-xl font-bold text-very-dark-blue dark:text-white mb-2">{company}</h2>
          <p className="text-dark-grey">{website?.replace(/^https?:\/\//, '')}</p>
          </div>
          
          <div className="md:ml-4">
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-violet/10 hover:bg-violet/25 text-violet font-bold py-3 px-5 rounded-md transition-colors duration-200"
            >
              Company Site
            </a>
          </div>
        </div>
      </div>
  );
}
