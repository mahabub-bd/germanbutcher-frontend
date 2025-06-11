'use client';

import { Input } from '@/components/ui/input';
import { useGlobalSearch } from '@/hooks/use-global-search';
import { Search, X } from 'lucide-react';
import type React from 'react';

export function SearchBar() {
  const { searchQuery, setSearchQuery, handleSearch, clearSearch, loading } =
    useGlobalSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="relative group">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-primaryColor transition-colors" />
        <Input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="lg:w-30 xl:w-80 2xl:w-100 pl-10 pr-10 py-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primaryColor text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-gray-300"
          autoComplete="off"
          spellCheck="false"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search suggestions indicator */}
      {loading && (
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-primaryColor border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
