interface SortOptionsProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (option: string) => void;
}

const SortOptions = ({ sortBy, sortOrder, onSortChange }: SortOptionsProps) => {
  const options = [
    { value: 'price', label: 'Price' },
    { value: 'departureDate', label: 'Departure Date' },
    { value: 'duration', label: 'Duration' }
  ];

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 text-sm">Sort by:</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              sortBy === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
            {sortBy === option.value && (
              <span className="ml-1">
                {sortOrder === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
