import React, { useState } from 'react';
import { Search, Filter, Calendar, ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface FilterProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string) => void;
  mangaList: string[];
}

const FilterControls: React.FC<FilterProps> = ({ 
  onSearch, 
  onSortChange, 
  onFilterChange,
  mangaList
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    onSortChange(sort);
  };
  
  return (
    <div className="bg-container rounded-lg shadow-custom p-4 mb-6">
      <form onSubmit={handleSearch} className="flex mb-4">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by username, manga, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background text-text-primary border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <button 
          type="submit" 
          className="ml-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Search
        </button>
      </form>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Activity size={14} className="mr-1" />
            Sort by
          </h3>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                activeSort === 'popular' 
                  ? 'bg-primary text-white' 
                  : 'bg-background text-text-secondary hover:text-primary'
              }`}
              onClick={() => handleSortChange('popular')}
            >
              Most Popular
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                activeSort === 'recent' 
                  ? 'bg-primary text-white' 
                  : 'bg-background text-text-secondary hover:text-primary'
              }`}
              onClick={() => handleSortChange('recent')}
            >
              <Calendar size={12} className="inline mr-1" />
              Most Recent
            </button>
          </div>
        </div>
        
        <button
          className="flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={14} className="mr-1" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {showFilters ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />}
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-medium mb-2">Filter by Manga</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 text-xs rounded-full transition-colors bg-primary text-white`}
              onClick={() => onFilterChange('all')}
            >
              All Manga
            </button>
            {mangaList.map((manga) => (
              <button
                key={manga}
                className={`px-3 py-1 text-xs rounded-full transition-colors bg-background text-text-secondary hover:text-primary`}
                onClick={() => onFilterChange(manga)}
              >
                {manga}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;