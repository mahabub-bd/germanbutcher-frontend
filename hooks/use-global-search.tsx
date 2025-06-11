'use client';

import type React from 'react';

import { fetchData } from '@/utils/api-utils';
import type { Product } from '@/utils/types';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SearchContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  loading: boolean;
  error: string | null;
  handleSearch: (query: string) => void;
  clearSearch: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      setIsOpen(true);
    }
  }, [searchParams]);


  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setError(null);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchData<Product[]>(
          `products?search=${encodeURIComponent(searchQuery.trim())}`
        );
        setProducts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (query.trim()) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('search', query.trim());
        router.push(`?${params.toString()}`);
        setIsOpen(true);
      } else {
        clearSearch();
      }
    },
    [router, searchParams]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsOpen(false);
    setIsExpanded(false);
    setProducts([]);
    setError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl);
  }, [router, searchParams]);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        setIsOpen,
        searchQuery,
        setSearchQuery,
        products,
        loading,
        error,
        handleSearch,
        clearSearch,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useGlobalSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useGlobalSearch must be used within a SearchProvider');
  }
  return context;
}
