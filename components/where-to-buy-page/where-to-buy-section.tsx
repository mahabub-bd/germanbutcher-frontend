"use client";

import { bangladeshData } from "@/constants";
import { SalesPoint } from "@/utils/types";
import {
  Building2,
  ChevronDown,
  Filter,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  Store,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationComponent } from "../common/pagination";

export interface ApiResponse {
  message: string;
  statusCode: number;
  data: SalesPoint[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface SearchParams {
  page?: string;
  shopName?: string;
  division?: string;
  district?: string;
  search?: string;
}

interface WhereToBuyClientProps {
  initialData: ApiResponse;
  searchParams: SearchParams;
}

function WhereToBuyClient({
  initialData,
  searchParams,
}: WhereToBuyClientProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const [salesPoints, setSalesPoints] = useState<SalesPoint[]>(
    initialData.data
  );
  const [loading] = useState(false);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [total, setTotal] = useState(initialData.total);
  const [currentPage, setCurrentPage] = useState(Number(initialData.page));

  // Filter states
  const [shopName, setShopName] = useState(
    Array.isArray(searchParams.shopName)
      ? searchParams.shopName[0] || ""
      : searchParams.shopName || ""
  );
  const [division, setDivision] = useState(
    Array.isArray(searchParams.division)
      ? searchParams.division[0] || ""
      : searchParams.division || ""
  );
  const [district, setDistrict] = useState(
    Array.isArray(searchParams.district)
      ? searchParams.district[0] || ""
      : searchParams.district || ""
  );
  const [search, setSearch] = useState(
    Array.isArray(searchParams.search)
      ? searchParams.search[0] || ""
      : searchParams.search || ""
  );

  const divisions = Object.keys(bangladeshData);
  const districts = division
    ? bangladeshData[division as keyof typeof bangladeshData] || []
    : [];

  // Update URL with search params
  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(urlSearchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`?${newParams.toString()}`);
  };

  const handlePageChange = (page: number) => {
    updateURL({ page: page.toString() });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({
      page: "1",
      shopName,
      division,
      district,
      search,
    });
  };

  const clearFilters = () => {
    setShopName("");
    setDivision("");
    setDistrict("");
    setSearch("");
    router.push("?");
  };

  const handleDivisionChange = (selectedDivision: string) => {
    setDivision(selectedDivision);
    setDistrict("");
  };

  useEffect(() => {
    setSalesPoints(initialData.data);
    setTotalPages(initialData.totalPages);
    setTotal(initialData.total);
    setCurrentPage(Number(initialData.page));
  }, [initialData]);

  return (
    <>
      {/* Compact Search and Filter Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-primaryColor/10 p-2 rounded-lg mr-3">
              <Filter className="w-5 h-5 text-primaryColor" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Filter Locations
              </h2>
              <p className="text-sm text-gray-600">
                Find the perfect partner location
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-full text-sm font-semibold">
            <MapPin className="w-4 h-4 mr-1" />
            {total} Locations
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-4">
          {/* Compact Search Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Shop Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Enter shop name..."
                  className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all text-gray-800 placeholder-gray-400"
                />
                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Division Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <div className="relative">
                <select
                  value={division}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  className="w-full px-3 py-2 pl-9 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Select Division</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* District Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!division}
                  className="w-full px-3 py-2 pl-9 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all text-gray-800 appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  <option value="">Select District</option>
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Global Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search everything..."
                  className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all text-gray-800 placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Compact Action Buttons */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </button>
            </div>

            {/* Active Filters Display */}
            {(shopName || division || district || search) && (
              <div className="flex flex-wrap gap-2 mt-3 lg:mt-0">
                <span className="text-sm font-medium text-gray-600 mr-2">
                  Filters:
                </span>
                {shopName && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primaryColor/10 text-primaryColor">
                    Shop: {shopName}
                    <button
                      type="button"
                      onClick={() => setShopName("")}
                      className="ml-1 hover:text-primaryColor/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {division && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primaryColor/10 text-primaryColor">
                    {division}
                    <button
                      type="button"
                      onClick={() => handleDivisionChange("")}
                      className="ml-1 hover:text-primaryColor/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {district && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primaryColor/10 text-primaryColor">
                    {district}
                    <button
                      type="button"
                      onClick={() => setDistrict("")}
                      className="ml-1 hover:text-primaryColor/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primaryColor/10 text-primaryColor">
                    Search: {search}
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="ml-1 hover:text-primaryColor/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Sales Points Grid */}
      <div className="grid gap-8">
        {salesPoints.map((salesPoint) => (
          <div
            key={salesPoint.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Sales Point Header */}
            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/20  p-6">
              <div className="flex items-start gap-6">
                {salesPoint.logoAttachment && (
                  <div className="bg-white rounded-xl p-3 shadow-lg">
                    <Image
                      src={salesPoint.logoAttachment.url}
                      alt={`${salesPoint.name} logo`}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{salesPoint.name}</h2>
                  <p className=" mb-4 text-lg">{salesPoint.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {salesPoint.website && (
                      <a
                        href={salesPoint.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                    {salesPoint.email && (
                      <a
                        href={`mailto:${salesPoint.email}`}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        {salesPoint.email}
                      </a>
                    )}
                    {salesPoint.contactNumber && (
                      <a
                        href={`tel:${salesPoint.contactNumber}`}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        {salesPoint.contactNumber}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Shops/Branches */}
            {salesPoint.shops && salesPoint.shops.length > 0 && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Store className="w-5 h-5 mr-2 text-primaryColor" />
                  Branches ({salesPoint.shops.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salesPoint.shops.map((shop) => (
                    <div
                      key={shop.id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      {/* Shop Image */}
                      <div className="flex items-center gap-4 mb-4">
                        {salesPoint.logoAttachment && (
                          <div className="bg-white rounded-lg p-2 shadow-sm">
                            <Image
                              src={salesPoint.logoAttachment.url}
                              alt={`${shop.shopName} logo`}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">
                            {shop.shopName}
                          </h4>
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                shop.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  shop.isActive ? "bg-green-400" : "bg-red-400"
                                }`}
                              ></span>
                              {shop.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-primaryColor" />
                          <span className="font-medium">Division:</span>
                          <span className="ml-2 text-gray-800">
                            {shop.division}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Building2 className="w-4 h-4 mr-2 text-green-500" />
                          <span className="font-medium">District:</span>
                          <span className="ml-2 text-gray-800">
                            {shop.district}
                          </span>
                        </div>
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-orange-500" />
                          <div>
                            <span className="font-medium">Address:</span>
                            <p className="text-gray-800 mt-1 leading-relaxed">
                              {shop.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {!loading && salesPoints.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
            <div className="text-gray-300 text-8xl mb-6">🏪</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No sales points found
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              Try adjusting your search criteria to find what you&apos;re
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl=""
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export { WhereToBuyClient };
