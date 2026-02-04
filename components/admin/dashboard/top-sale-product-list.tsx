"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyEnglish } from "@/lib/utils";
import { fetchProtectedData } from "@/utils/api-utils";
import { Eye, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingIndicator } from "../loading-indicator";

interface ProductUnit {
  id: number;
  name: string;
}

interface Attachment {
  id: number;
  fileName: string;
  url: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BestsellerProduct {
  id: number;
  name: string;
  slug: string;
  sellingPrice: number;
  stock: number;
  saleCount: number;
  isActive: boolean;
  isFeatured: boolean;
  weight: string;
  attachment: Attachment | null;
  brand?: { id: number; name: string; slug: string } | null;
  category?: Category | null;
  unit?: ProductUnit | null;
}

export default function TopSaleProductsList() {
  const [products, setProducts] = useState<BestsellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProtectedData<BestsellerProduct[]>(
          `products/bestsellers?limit=${limit}`
        );
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
        toast.error("Failed to load top selling products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <Card className="w-full">
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingIndicator message="Loading top selling products..." />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold">Top Selling Products</CardTitle>
            <CardDescription>Products sorted by sales count</CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={limit.toString()}
              onValueChange={(v) => setLimit(parseInt(v))}
            >
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Top 5</SelectItem>
                <SelectItem value="10">Top 10</SelectItem>
                <SelectItem value="20">Top 20</SelectItem>
                <SelectItem value="50">Top 50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-xs">#</TableHead>
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="hidden md:table-cell text-xs">
                  Category
                </TableHead>
                <TableHead className="text-center text-xs">Sold</TableHead>
                <TableHead className="text-right text-xs">Price</TableHead>
                <TableHead className="text-right text-xs">Stock</TableHead>
                <TableHead className="text-right text-xs w-[60px]">
                  View
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    <Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p className="font-medium">No products found</p>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p, idx) => (
                  <TableRow key={p.id}>
                    <TableCell className="py-2">{idx + 1}</TableCell>

                    <TableCell className="py-2">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                          {p.attachment?.url ? (
                            <Image
                              src={p.attachment.url}
                              alt={p.name}
                              fill
                              sizes="48px"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-sm truncate">
                            {p.name}
                          </span>
                          <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                            <span>{p.brand?.name ?? ""}</span>
                            {p.isFeatured && (
                              <Badge className="ml-2">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell py-2">
                      <span className="text-xs">{p.category?.name ?? "—"}</span>
                    </TableCell>

                    <TableCell className="text-center py-2">
                      <span className="font-bold">{p.saleCount}</span>
                    </TableCell>

                    <TableCell className="text-right py-2">
                      <span className="font-bold text-sm">
                        {formatCurrencyEnglish(p.sellingPrice)}
                      </span>
                    </TableCell>

                    <TableCell className="text-right py-2">
                      <span className="text-xs">{p.stock}</span>
                    </TableCell>

                    <TableCell className="text-right py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        asChild
                      >
                        <Link href={`/product/${p.slug}`}>
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
