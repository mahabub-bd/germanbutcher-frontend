"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  DollarSign,
  Filter,
  Grid3X3,
  Tag,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Category {
  id: number;
  name: string;
  parentId?: number | null;
  isMainCategory: boolean;
  children?: Category[];
}

interface Brand {
  id: number;
  name: string;
}

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  priceRanges: PriceRange[];
  currentCategory?: string;
  currentBrand?: string;
  currentFeatured?: boolean;
  currentPriceRange?: {
    min?: string;
    max?: string;
  };
}

const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 500, label: "Under BDT 500" },
  { min: 500, max: 1000, label: "BDT 500 - 1,000" },
  { min: 1000, max: 2000, label: "BDT 1,000 - 2,000" },
  { min: 2000, max: 3000, label: "BDT 2,000 - 3,000" },
  { min: 3000, max: 4000, label: "BDT 3,000 - 4,000" },
  { min: 4000, max: Number.POSITIVE_INFINITY, label: "Above BDT 4,000" },
];

export function ProductFilters({
  categories,
  brands,
  currentCategory,
  currentBrand,
  currentFeatured,
  currentPriceRange,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceFilterType, setPriceFilterType] = useState<"range" | "slider">(
    "range"
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());

  const organizedCategories = useMemo(() => {
    const grouped: Record<number, Category[]> = {};
    categories.forEach((cat) => {
      if (cat.parentId) {
        if (!grouped[cat.parentId]) grouped[cat.parentId] = [];
        grouped[cat.parentId].push(cat);
      }
    });
    console.log(grouped);

    // Attach children to parents
    return categories
      .filter((cat) => !cat.parentId)
      .map((cat) => ({
        ...cat,
        children: grouped[cat.id] || [],
      }));
  }, [categories]);

  console.log(organizedCategories);

  const activeFiltersCount = [
    currentCategory ? 1 : 0,
    currentBrand ? 1 : 0,
    currentFeatured ? 1 : 0,
    currentPriceRange?.min || currentPriceRange?.max ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const hasActiveFilters = activeFiltersCount > 0;

  const MAX_PRICE = 5000;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(currentPriceRange?.min || 0),
    Number(currentPriceRange?.max || MAX_PRICE),
  ]);

  useEffect(() => {
    setPriceRange([
      Number(currentPriceRange?.min || 0),
      currentPriceRange?.max === "Infinity" || !currentPriceRange?.max
        ? MAX_PRICE
        : Number(currentPriceRange.max),
    ]);
  }, [currentPriceRange]);

  useEffect(() => {
    if (currentCategory) {
      const selectedCat = categories.find(
        (cat) => cat.id.toString() === currentCategory
      );
      if (selectedCat?.parentId) {
        setOpenCategories((prev) => new Set([...prev, selectedCat.parentId!]));
      }
    }
  }, [currentCategory, categories]);

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([name, value]) => {
      if (value === null) {
        newParams.delete(name);
      } else {
        newParams.set(name, value);
      }
    });

    return newParams.toString();
  };

  const handleCategoryChange = (categoryId: number) => {
    const params = {
      category:
        categoryId.toString() === currentCategory
          ? null
          : categoryId.toString(),
      page: "1",
    };
    router.push(`${pathname}?${createQueryString(params)}`);
    setIsSheetOpen(false);
  };

  const handleBrandChange = (brandId: number) => {
    const params = {
      brand: brandId.toString() === currentBrand ? null : brandId.toString(),
      page: "1",
    };
    router.push(`${pathname}?${createQueryString(params)}`);
    setIsSheetOpen(false);
  };

  const handleFeaturedChange = (checked: boolean) => {
    const params = {
      featured: checked ? "true" : null,
      page: "1",
    };
    router.push(`${pathname}?${createQueryString(params)}`);
    setIsSheetOpen(false);
  };

  const handlePriceRangeChange = (value: string) => {
    if (!value) {
      router.push(
        `${pathname}?${createQueryString({
          minPrice: null,
          maxPrice: null,
          page: "1",
        })}`
      );
      setIsSheetOpen(false);
      return;
    }

    const [min, max] = value.split("-");
    router.push(
      `${pathname}?${createQueryString({
        minPrice: min,
        maxPrice: max === "Infinity" ? max : max,
        page: "1",
      })}`
    );
    setIsSheetOpen(false);
  };

  const handleSliderPriceChangeCommitted = (values: number[]) => {
    const min = values[0];
    const max = values[1];

    if (min === 0 && max === MAX_PRICE) {
      router.push(
        `${pathname}?${createQueryString({
          minPrice: null,
          maxPrice: null,
          page: "1",
        })}`
      );
      return;
    }

    const maxValue = max === MAX_PRICE ? "Infinity" : max.toString();

    router.push(
      `${pathname}?${createQueryString({
        minPrice: min.toString(),
        maxPrice: maxValue,
        page: "1",
      })}`
    );
  };

  const handleResetFilters = () => {
    router.push(pathname);
    setIsSheetOpen(false);
  };

  const formatCurrencyEnglish = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const currentPriceValue =
    currentPriceRange?.min && currentPriceRange?.max
      ? `${currentPriceRange.min}-${currentPriceRange.max}`
      : undefined;

  const currentCategoryName = currentCategory
    ? categories.find((c) => c.id.toString() === currentCategory)?.name
    : null;
  const currentBrandName = currentBrand
    ? brands.find((b) => b.id.toString() === currentBrand)?.name
    : null;

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSliderPriceChangeWithDebounce = (values: number[]) => {
    setPriceRange([values[0], values[1]]);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      handleSliderPriceChangeCommitted(values);
    }, 500);

    setDebounceTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const toggleCategoryOpen = (categoryId: number) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg border border-red-100 dark:border-red-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-800/50 rounded-full">
            <Filter className="h-5 w-5 text-red-700 dark:text-red-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-2 bg-red-100 text-red-800 border-red-200 dark:bg-red-800/50 dark:text-red-200 dark:border-red-600"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-8 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
          >
            <X className="h-3.5 w-3.5" />
            Clear All
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mb-6 p-4 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-lg border border-red-100 dark:border-red-700 border-dashed">
          <h4 className="text-sm font-medium mb-3 text-foreground">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentCategoryName && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-background hover:bg-muted transition-colors border-red-200 text-red-800 dark:border-red-600 dark:text-red-200"
              >
                <span className="text-xs font-medium">
                  Category: {currentCategoryName}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 rounded-full hover:bg-destructive/20"
                  onClick={() =>
                    handleCategoryChange(Number.parseInt(currentCategory!))
                  }
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove category filter</span>
                </Button>
              </Badge>
            )}
            {currentBrandName && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-background hover:bg-muted transition-colors border-red-200 text-red-800 dark:border-red-600 dark:text-red-200"
              >
                <span className="text-xs font-medium">
                  Brand: {currentBrandName}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 rounded-full hover:bg-destructive/20"
                  onClick={() =>
                    handleBrandChange(Number.parseInt(currentBrand!))
                  }
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove brand filter</span>
                </Button>
              </Badge>
            )}
            {currentFeatured && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-background hover:bg-muted transition-colors border-red-200 text-red-800 dark:border-red-600 dark:text-red-200"
              >
                <span className="text-xs font-medium">Featured Only</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 rounded-full hover:bg-destructive/20"
                  onClick={() => handleFeaturedChange(false)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove featured filter</span>
                </Button>
              </Badge>
            )}
            {(currentPriceRange?.min || currentPriceRange?.max) && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-background hover:bg-muted transition-colors border-red-200 text-red-800 dark:border-red-600 dark:text-red-200"
              >
                <span className="text-xs font-medium">
                  Price:{" "}
                  {currentPriceRange.min && currentPriceRange.max
                    ? `${formatCurrencyEnglish(
                        Number(currentPriceRange.min)
                      )} - ${
                        currentPriceRange.max === "Infinity"
                          ? `${formatCurrencyEnglish(MAX_PRICE)}+`
                          : formatCurrencyEnglish(Number(currentPriceRange.max))
                      }`
                    : currentPriceRange.min
                      ? `Min ${formatCurrencyEnglish(
                          Number(currentPriceRange.min)
                        )}`
                      : `Max ${formatCurrencyEnglish(
                          Number(currentPriceRange.max)
                        )}`}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 rounded-full hover:bg-destructive/20"
                  onClick={() =>
                    router.push(
                      `${pathname}?${createQueryString({
                        minPrice: null,
                        maxPrice: null,
                      })}`
                    )
                  }
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove price filter</span>
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <Accordion
          type="multiple"
          defaultValue={["categories", "brands", "price"]}
          className="space-y-4"
        >
          <AccordionItem
            value="categories"
            className="border border-red-100 dark:border-red-700 rounded-lg px-4 py-2 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20"
          >
            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline text-red-800 dark:text-red-200">
              <div className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                Categories
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {organizedCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    {/* Main Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={category.id.toString() === currentCategory}
                          onCheckedChange={() =>
                            handleCategoryChange(category.id)
                          }
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                      {category.children && category.children.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCategoryOpen(category.id)}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              openCategories.has(category.id) ? "rotate-90" : ""
                            }`}
                          />
                        </Button>
                      )}
                    </div>

                    {/* Subcategories */}
                    {category.children && category.children.length > 0 && (
                      <Collapsible open={openCategories.has(category.id)}>
                        <CollapsibleContent className="ml-6 space-y-2 border-l-2 border-red-100 dark:border-red-800 pl-4">
                          {category.children.map((subCategory) => (
                            <div
                              key={subCategory.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`category-${subCategory.id}`}
                                checked={
                                  subCategory.id.toString() === currentCategory
                                }
                                onCheckedChange={() =>
                                  handleCategoryChange(subCategory.id)
                                }
                              />
                              <Label
                                htmlFor={`category-${subCategory.id}`}
                                className="text-sm font-normal cursor-pointer text-muted-foreground"
                              >
                                {subCategory.name}
                              </Label>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="price"
            className="border border-red-100 dark:border-red-700 rounded-lg px-4 py-2 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30"
          >
            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline text-red-800 dark:text-red-200">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price Range
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Tabs
                defaultValue={priceFilterType}
                onValueChange={(value) =>
                  setPriceFilterType(value as "range" | "slider")
                }
                className="mt-2"
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="range">Preset Ranges</TabsTrigger>
                  <TabsTrigger value="slider">Custom Range</TabsTrigger>
                </TabsList>
                <TabsContent value="range">
                  <RadioGroup
                    value={currentPriceValue}
                    onValueChange={handlePriceRangeChange}
                    className="space-y-2"
                  >
                    {PRICE_RANGES.map((range) => (
                      <div
                        key={range.label}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={`${range.min}-${
                            range.max === Number.POSITIVE_INFINITY
                              ? "Infinity"
                              : range.max
                          }`}
                          id={`price-${range.min}-${range.max}`}
                        />
                        <Label
                          htmlFor={`price-${range.min}-${range.max}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
                <TabsContent value="slider">
                  <div className="space-y-6 pt-2 px-1">
                    <div className="space-y-4 p-4 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-lg border border-red-100 dark:border-red-700">
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground mb-2">
                          Custom Price Range
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Drag to set your budget
                        </p>
                      </div>

                      <Slider
                        defaultValue={[0, MAX_PRICE]}
                        value={priceRange}
                        min={0}
                        max={MAX_PRICE}
                        step={100}
                        onValueChange={handleSliderPriceChangeWithDebounce}
                        className="mb-6 cursor-pointer [&_[role=slider]]:bg-red-800 [&_[role=slider]]:border-red-800"
                      />

                      <div className="flex items-center justify-between mb-4">
                        <div className="border border-red-100 bg-red-50 dark:border-red-600 dark:bg-red-950/50 rounded-lg px-3 py-2 shadow-sm">
                          <span className="text-sm font-medium text-red-800 dark:text-red-200">
                            {formatCurrencyEnglish(priceRange[0])}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          to
                        </div>
                        <div className="border border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-950/50 rounded-lg px-3 py-2 shadow-sm">
                          <span className="text-sm font-medium text-red-800 dark:text-red-200">
                            {priceRange[1] === MAX_PRICE
                              ? `${formatCurrencyEnglish(MAX_PRICE)}+`
                              : formatCurrencyEnglish(priceRange[1])}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleSliderPriceChangeCommitted(priceRange)
                          }
                          className="flex-1 bg-red-800 hover:bg-red-900 text-white"
                          size="sm"
                        >
                          Apply Filter
                        </Button>
                        <Button
                          onClick={() => {
                            setPriceRange([0, MAX_PRICE]);
                            router.push(
                              `${pathname}?${createQueryString({
                                minPrice: null,
                                maxPrice: null,
                              })}`
                            );
                          }}
                          variant="outline"
                          size="sm"
                          className="px-3 hover:bg-red-50 hover:text-red-800 hover:border-red-300 dark:hover:bg-red-950/50 dark:hover:text-red-200 dark:hover:border-red-600"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="brands"
            className="border border-rose-100 dark:border-rose-700 rounded-lg px-4 py-2 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20"
          >
            <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline text-red-800 dark:text-red-200">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Brands
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={brand.id.toString() === currentBrand}
                      onCheckedChange={() => handleBrandChange(brand.id)}
                    />
                    <Label
                      htmlFor={`brand-${brand.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {brand.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {hasActiveFilters && (
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <ScrollArea className="min-w-76 shadow-none p-2 md:flex hidden  absolute top-2">
        <div className="p-2">
          <FilterContent />
        </div>
      </ScrollArea>

      {/* Mobile view - Sheet component that slides in from the right */}

      <div className="md:hidden z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              className="relative group shadow-xl border-0 bg-gradient-to-r from-primaryColor to-primaryColor/90 hover:from-primaryColor/90 hover:to-secondaryColor text-white font-medium px-4  rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              size="lg"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span className="text-xs font-semibold">Filters</span>
              </div>
              {hasActiveFilters && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs font-bold bg-red-500 text-white border-2 border-white animate-pulse"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="sm:max-w-md overflow-y-auto p-6 bg-red-50 dark:bg-red-950/20"
          >
            <SheetTitle className="sr-only">Filter Menu</SheetTitle>
            <div className="py-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
