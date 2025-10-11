function ProductCardSkeleton() {
  return (
    <div className="group relative bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-gray-200 mb-2" />
      <div className="p-2 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      </div>
      <div className="p-3">
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
}

// Grid skeleton
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-2 md:gap-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export { ProductCardSkeleton, ProductGridSkeleton };
