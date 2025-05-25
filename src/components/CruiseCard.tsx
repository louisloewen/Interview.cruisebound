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
  const departureDate = formatDate(sailing.departureDate, { month: 'short', day: 'numeric', year: 'numeric' });
  const returnDate = formatDate(sailing.returnDate, { month: 'short', day: 'numeric', year: 'numeric' });
  const dateRange = `${departureDate.split(' ')[0]} ${departureDate.split(' ')[1]}-${returnDate.split(' ')[1]}, ${returnDate.split(' ')[2]}`;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow mb-4">
      <div className="flex flex-row">
        {/* Left side - Image */}
        <div className="relative w-1/3" style={{ height: '25vh', minHeight: '180px' }}>
          <Image 
            src={sailing.ship.image} 
            alt={sailing.ship.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 33vw, 25vw"
            unoptimized
          />
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-sm text-xs">
            {`Sept ${dateRange}`}
          </div>
        </div>
        
        {/* Right side - Cruise Details */}
        <div className="w-2/3 flex flex-col">
          <div className="p-4 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">{sailing.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-gray-700 mr-2">{sailing.region}</span>
                  <span className="text-gray-700 mr-2">{sailing.duration} nights</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{sailing.ship.rating}</span>
                    <span className="text-gray-500 ml-1">{sailing.ship.reviews} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Image 
                  src={sailing.ship.line.logo} 
                  alt={sailing.ship.line.name}
                  width={80}
                  height={30}
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
                <span className="text-sm text-gray-600 ml-2">{sailing.ship.name}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
              {sailing.itinerary.map((port, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-gray-400">→</span>}
                  <span>{port.split(',')[0]}</span>
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end items-center gap-4">
            <div>
              <p className="text-xs text-gray-500">Interior from</p>
              <p className="text-2xl font-bold text-gray-900">${sailing.price}</p>
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
