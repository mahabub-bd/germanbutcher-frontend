'use client';

import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

import { useGlobalSearch } from '@/hooks/use-global-search';
import { GermanbutcherLogo } from '@/public/images';
import { LoadingIndicator } from '../admin/loading-indicator';
import { Button } from '../ui/button';
import { MobileMenu } from './mobile-menu';

export function MobileHeader() {
  const {
    searchQuery,
    setSearchQuery,
    setIsOpen: setIsModalOpen,
    loading,
    handleSearch,
    clearSearch,
    isExpanded,
    setIsExpanded,
  } = useGlobalSearch();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
      setIsExpanded(false);
      setIsModalOpen(true);
    }
  };

  const toggleSearch = () => {
    if (isExpanded) {
      clearSearch();
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleClearSearch = () => {
    clearSearch();
    setSearchQuery('');
  };

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-primaryColor shadow-lg">
      {/* Main Header Row - Always Visible */}
      <div className="flex items-center justify-between py-3 px-4">
        <MobileMenu />

        <Link
          href="/"
          className="flex items-center justify-center size-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
          aria-label="Go to homepage"
        >
          <Image
            src={
              GermanbutcherLogo ||
              '/placeholder.svg?height=48&width=48&query=German Butcher logo' ||
              '/placeholder.svg' ||
              '/placeholder.svg'
            }
            alt="German Butcher logo"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain"
            priority
          />
        </Link>

        {/* Search Button */}
        <Button
          onClick={toggleSearch}
          className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm shadow-lg transition-all duration-200 border border-white/20 ${
            isExpanded
              ? 'bg-white/20 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          aria-label={isExpanded ? 'Close search' : 'Search products'}
          type="button"
        >
          {isExpanded ? (
            <X className="w-5 h-5" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Search Bar - Appears Below When Expanded */}
      {isExpanded && (
        <div className="px-4 pb-3 border-t border-white/10">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-12 text-sm pr-12 py-1 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 text-gray-900 placeholder-gray-500 shadow-lg"
                autoFocus
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {loading && <LoadingIndicator message="Loading Product..." />}
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
