'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function RacipeSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (search.trim()) {
        params.set('query', search.trim());
      } else {
        params.delete('query');
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-0 max-w-md mx-auto mt-8 sm:mt-10 md:mt-14 lg:mt-28">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-3 sm:py-4 px-5 sm:px-6 rounded-2xl border border-black/20 w-full text-black/70 font-medium text-sm sm:text-base lg:text-lg placeholder:text-sm sm:placeholder:text-base"
          placeholder="Search your favorite recipe"
        />
        <button className="absolute top-0 cursor-pointer right-0 bg-secondaryColor text-whiteColor px-5 sm:px-7 h-full rounded-r-2xl flex items-center justify-center">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default RacipeSearch;
