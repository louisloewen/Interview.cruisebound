import Image from 'next/image';
import { formatDate } from '@/utils/formatters';

interface Sailing {
  price: number;
  name: string;
  ship: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    line: {
      logo: string;
      name: string;
    };
  };
  itinerary: string[];
  region: string;
  departureDate: string;
  returnDate: string;
  duration: number;
}

interface CruiseCardProps {
  sailing: Sailing;
}

const CruiseCard = ({ sailing }: CruiseCardProps) => {
  // Format dates for display
  const departureDate = new Date(sailing.departureDate);
  const returnDate = new Date(sailing.returnDate);
  
  const depMonth = departureDate.toLocaleDateString('en-US', { month: 'short' });
  const depDay = departureDate.getDate();
  const retDay = returnDate.getDate();
  const retYear = returnDate.getFullYear();
  
  const dateRange = `${depMonth} ${depDay} - ${retDay}, ${retYear}`;
  
  // Fallback image for ships without images
  const fallbackImageUrl = "/images/NoImage1.png";
  
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-visible hover:shadow-md transition-shadow mb-4">
      <div className="flex flex-row">
        {/* Left side - Image */}
        <div className="relative w-1/3 rounded-l-lg overflow-hidden h-48">
          <Image 
            src={sailing.ship.image || fallbackImageUrl}
            alt={sailing.ship.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 33vw, 25vw"
            unoptimized
            onError={(e) => {
              // If the image fails to load, replace with fallback
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = fallbackImageUrl;
            }}
          />
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-sm text-sm">
            {dateRange}
          </div>
        </div>
        
        {/* Right side - Cruise Details */}
        <div className="w-2/3 flex flex-col">
          <div className="p-4 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-4">{sailing.name}</h3>
                <div className="flex items-center mb-6">
                  <span className="text-gray-700 mr-4">{sailing.region}</span>
                  <span className="text-gray-700 mr-4">{sailing.duration} nights</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-bold">{sailing.ship.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">{sailing.ship.reviews} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {sailing.ship.line.logo ? (
                  <Image
                    src={sailing.ship.line.logo}
                    alt={sailing.ship.line.name}
                    width={80}
                    height={30}
                    style={{ objectFit: 'contain' }}
                    unoptimized
                    onError={() => {/* Logo failed to load, will fall back to text */}}
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1.5 rounded">
                    {sailing.ship.line.name}
                  </span>
                )}
                <span className="text-sm text-gray-600 mt-1">{sailing.ship.name}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 w-full">
              {sailing.itinerary.length <= 3 ? (
                // If 3 or fewer ports, show all of them
                sailing.itinerary.map((port, index) => (
                  <span key={index} className="flex items-center whitespace-nowrap">
                    {index > 0 && <span className="mx-1 text-blue-600">→</span>}
                    <span className="truncate max-w-[200px]" title={port}>{port}</span>
                  </span>
                ))
              ) : (
                // If more than 3 ports, show first 3 and a "+X more" with tooltip
                <>
                  {sailing.itinerary.slice(0, 3).map((port, index) => (
                    <span key={index} className="flex items-center whitespace-nowrap">
                      {index > 0 && <span className="mx-1 text-blue-600">→</span>}
                      <span className="truncate max-w-[200px]" title={port}>{port}</span>
                    </span>
                  ))}
                  <span className="flex items-center">
                    <span className="mx-1 text-blue-600">→</span>
                    <div className="relative group">
                      <span className="text-blue-600 cursor-pointer">
                        +{sailing.itinerary.length - 3} more
                      </span>
                      <div className="absolute left-0 bottom-full mb-2 min-w-64 max-w-80 p-3 bg-white shadow-xl rounded-lg border border-gray-200 invisible group-hover:visible z-[100] opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <div className="text-sm font-medium text-gray-800 mb-2">Additional Stops:</div>
                        <div className="text-sm text-gray-700 max-h-48 overflow-y-auto space-y-1">
                          {sailing.itinerary.slice(3).map((port, index) => (
                            <div key={index} className="py-1.5 px-2 rounded hover:bg-gray-50 flex items-center">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                              <span>{port}</span>
                            </div>
                          ))}
                        </div>
                        <div className="absolute left-4 bottom-[-8px] w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                      </div>
                    </div>
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Interior from</p>
              <p className="text-2xl font-bold text-gray-900">
              <span className="text-sm align-text-top mr-0.5">$</span>{sailing.price}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors text-sm font-medium">
              See sailings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CruiseCard;