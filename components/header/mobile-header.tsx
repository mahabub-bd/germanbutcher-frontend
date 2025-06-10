'use client';

import { ArrowLeft, Search, X } from 'lucide-react';
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

  const handleBackFromSearch = () => {
    setIsExpanded(false);
    if (searchQuery) {
      clearSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-primaryColor shadow-lg">
      {!isExpanded ? (
        <div className="flex items-center justify-between py-3 px-4">
          <MobileMenu />

          <Link
            href="/"
            className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
            aria-label="Go to homepage"
          >
            <Image
              src={
                GermanbutcherLogo ||
                '/placeholder.svg?height=48&width=48&query=German Butcher logo' ||
                '/placeholder.svg'
              }
              alt="German Butcher logo"
              width={32}
              height={32}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </Link>

          {/* Search Button */}
          <Button
            onClick={toggleSearch}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-lg transition-all duration-200 border border-white/20"
            aria-label="Search products"
            type="button"
          >
            <Search className="w-5 h-5 text-white" />
          </Button>
        </div>
      ) : (
        // Expanded Search Layout
        <div className="flex items-center py-3 px-4 space-x-3">
          {/* Back Button */}
          <Button
            onClick={handleBackFromSearch}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-lg transition-all duration-200 border border-white/20 flex-shrink-0"
            aria-label="Back"
            type="button"
          >
            <ArrowLeft className="w-3 h-3 text-white" />
          </Button>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1">
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
                  onClick={() => {
                    clearSearch();
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label="Clear search"
                >
                  <X className="w-2 h-2" />
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
