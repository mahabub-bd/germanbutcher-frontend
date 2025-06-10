'use client';

import { fetchData } from '@/utils/api-utils';
import type { Product } from '@/utils/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get search query from URL params on mount
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      setIsOpen(true);
    }
  }, [searchParams]);

  // Fetch products when search query changes
  useEffect(() => {
    if (!isOpen || !searchQuery.trim()) {
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
  }, [searchQuery, isOpen]);

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
    setProducts([]);
    setError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl);
  }, [router, searchParams]);

  return {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    products,
    loading,
    error,
    handleSearch,
    clearSearch,
  };
}
