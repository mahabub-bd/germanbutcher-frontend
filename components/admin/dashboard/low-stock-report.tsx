"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginationComponent } from "@/components/common/pagination";
import { formatCurrencyEnglish } from "@/lib/utils";
import { fetchDataPagination } from "@/utils/api-utils";
import type { Product } from "@/utils/types";
import { AlertTriangle, Package, Search, XCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductImage } from "../image-wrapper";
import { LoadingIndicator } from "../loading-indicator";
import { PageHeader } from "../page-header";

interface LowStockReportProps {
  initialPage?: number;
  initialLimit?: number;
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

export function LowStockReport({
  initialPage = 1,
  initialLimit = 20,
  initialSearchParams = {},
}: LowStockReportProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getInitialParam = (key: string) => {
    const param = searchParams?.get(key);
    return param ? param : initialSearchParams?.[key] || "";
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    getInitialParam("search") as string
  );
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, currentPage, limit, searchQuery]);

  const fetchLowStockProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", limit.toString());
      params.append("stockLessThan", "5"); // Filter for products with stock < 5

      if (searchQuery) params.append("search", searchQuery);

      const response = await fetchDataPagination<{
        data: Product[];
        total: number;
        totalPages: number;
      }>(`products?${params.toString()}`);

      // Client-side filter as backup if API doesn't support stockLessThan
      const lowStockProducts = response.data.filter(
        (product) => (product.stock || 0) < 5
      );

      setProducts(lowStockProducts);
      setTotalItems(lowStockProducts.length > 0 ? response.total : 0);
      setTotalPages(
        response.totalPages || Math.ceil(lowStockProducts.length / limit)
      );
    } catch (error) {
      console.error("Error fetching low stock products:", error);
      toast.error("Failed to load low stock report. Please try again.");
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, searchQuery]);

  // Initial load with URL params
  useEffect(() => {
    const pageFromUrl = searchParams?.get("page");
    const searchFromUrl = searchParams?.get("search");

    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl, 10));
    }
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchLowStockProducts();
  }, [fetchLowStockProducts]);

  // Update URL when state changes
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getStockStatusBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Out of Stock
        </Badge>
      );
    } else if (stock <= 2) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Critical ({stock})
        </Badge>
      );
    } else if (stock < 5) {
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-orange-600 bg-orange-50"
        >
          <AlertTriangle className="h-3 w-3" />
          Low ({stock})
        </Badge>
      );
    }
    return null;
  };

  const renderActiveFilters = () => {
    if (!searchQuery) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          Search: {searchQuery}
          <button onClick={() => setSearchQuery("")} className="ml-1">
            <XCircle className="h-3 w-3" />
          </button>
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-7 text-xs"
        >
          Clear search
        </Button>
      </div>
    );
  };

  const renderTableView = () => (
    <div className="rounded-lg border bg-white dark:bg-gray-950 p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Brand</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right hidden lg:table-cell">
                Unit Price
              </TableHead>
              <TableHead className="text-right">Restock Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm text-muted-foreground">
                      Loading...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <Package className="h-12 w-12 text-green-500" />
                    <div className="space-y-1">
                      <h3 className="font-semibold">
                        Great! No Low Stock Items
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "No products matching your search have low stock."
                          : "All products are well-stocked. Your inventory levels are healthy!"}
                      </p>
                    </div>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                const restockQuantity = Math.max(20 - (product.stock || 0), 0);
                const restockValue = restockQuantity * product.purchasePrice;

                return (
                  <TableRow
                    key={product.id}
                    className={`hover:bg-muted/50 ${product.stock === 0 ? "bg-red-50 dark:bg-red-950/20" : ""}`}
                  >
                    <TableCell>
                      <ProductImage product={product} height={50} width={50} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="max-w-xs">
                        <p className="font-medium line-clamp-2">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1 md:hidden">
                          <Badge variant="outline" className="text-xs">
                            {product.category?.name || "N/A"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.brand?.name || "N/A"}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {product.category?.name || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {product.brand?.name || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`font-mono font-medium text-lg ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 2
                              ? "text-red-500"
                              : "text-orange-600"
                        }`}
                      >
                        {product.stock || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStockStatusBadge(product.stock || 0)}
                    </TableCell>
                    <TableCell className="text-right font-medium hidden lg:table-cell">
                      {formatCurrencyEnglish(product.sellingPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        <div className="font-medium text-blue-600">
                          {formatCurrencyEnglish(restockValue)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ({restockQuantity} units)
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      {!isLoading && products.length > 0 && (
        <div className="flex justify-between items-center gap-4 p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((currentPage - 1) * limit + 1, totalItems)} to{" "}
            {Math.min(currentPage * limit, totalItems)} of {totalItems} low
            stock products
          </div>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="#"
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );

  // Calculate summary statistics
  const outOfStockCount = products.filter((p) => (p.stock || 0) === 0).length;
  const criticalStockCount = products.filter(
    (p) => (p.stock || 0) > 0 && (p.stock || 0) <= 2
  ).length;
  const lowStockCount = products.filter(
    (p) => (p.stock || 0) > 2 && (p.stock || 0) < 5
  ).length;
  const totalRestockValue = products.reduce((sum, product) => {
    const restockQuantity = Math.max(20 - (product.stock || 0), 0);
    return sum + restockQuantity * product.purchasePrice;
  }, 0);

  return (
    <div className="w-full md:p-6 p-4">
      <PageHeader
        title="Low Stock Report"
        description="Products with stock levels below 5 units"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700 dark:text-red-400">
              Out of Stock
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {outOfStockCount}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
              Critical (≤2)
            </span>
          </div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            {criticalStockCount}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              Low (3-4)
            </span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {lowStockCount}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
              Restock Value
            </span>
          </div>
          <div className="text-lg font-bold text-blue-600 mt-1">
            {formatCurrencyEnglish(totalRestockValue)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search low stock products..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {renderActiveFilters()}

        {isLoading ? (
          <LoadingIndicator message="Loading low stock report..." />
        ) : (
          <div className="space-y-4">{renderTableView()}</div>
        )}
      </div>
    </div>
  );
}
