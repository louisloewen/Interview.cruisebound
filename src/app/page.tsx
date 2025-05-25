'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import CruiseCard from "@/components/CruiseCard";
import Pagination from "@/components/Pagination";
import SortOptions from "@/components/SortOptions";

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

export default function Home() {
  const [sailings, setSailings] = useState<Sailing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const itemsPerPage = 10;
  
  useEffect(() => {
    const fetchSailings = async () => {
      try {
        setLoading(true);
        console.log('Fetching sailings from local API route...');
        
        // Use the local API route instead of directly calling the external API
        const response = await fetch('/api/sailings');
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch sailings: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
        
        if (data && data.results && Array.isArray(data.results)) {
          setSailings(data.results);
          console.log('Sailings set successfully:', data.results.length);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Error fetching sailings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSailings();
  }, []);
  
  // Sort sailings based on sortBy and sortOrder
  const sortedSailings = [...sailings].sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'departureDate') {
      return sortOrder === 'asc' 
        ? new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
        : new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
    } else if (sortBy === 'duration') {
      return sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration;
    }
    return 0;
  });
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSailings.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    const [field, order] = option.split('-');
    setSortBy(field);
    setSortOrder(order as 'asc' | 'desc');
  };
  
  // Reset filters to default
  const handleResetFilters = () => {
    setSortBy('price');
    setSortOrder('asc');
    setCurrentPage(1);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with sort and filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="font-medium text-gray-700 mr-2">{sailings.length} trips found</h2>
          <button 
            className="text-sm text-gray-500 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
            onClick={handleResetFilters}
          >
            Reset filters
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">Sort by</span>
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="price-asc">Price (Lowest first)</option>
              <option value="price-desc">Price (Highest first)</option>
              <option value="departureDate-asc">Departure Date (Earliest first)</option>
              <option value="departureDate-desc">Departure Date (Latest first)</option>
              <option value="duration-asc">Duration (Shortest first)</option>
              <option value="duration-desc">Duration (Longest first)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cruise Cards */}
      <div className="mb-8">
        {currentItems.map((sailing, index) => (
          <CruiseCard key={index} sailing={sailing} />
        ))}
      </div>
      
      {/* Pagination */}
      {sailings.length > itemsPerPage && (
        <div className="flex justify-start mb-8">
          <Pagination 
            itemsPerPage={itemsPerPage}
            totalItems={sailings.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
}
