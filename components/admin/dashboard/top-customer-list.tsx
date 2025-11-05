"use client";

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
import { Award, Eye, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingIndicator } from "../loading-indicator";
import { PageHeader } from "../page-header";

interface CustomerStatistics {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  completedOrders: number;
  pendingOrders: number;
}

interface TopCustomer {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  isVerified: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  profilePhoto: {
    id: number;
    url: string;
  } | null;
  statistics: CustomerStatistics;
}

export function TopCustomersList() {
  const [customers, setCustomers] = useState<TopCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<"orders" | "spending">("orders");

  useEffect(() => {
    const fetchTopCustomers = async () => {
      setLoading(true);
      try {
        const response = await fetchProtectedData(
          `users/customers/top?limit=${limit}&sortBy=${sortBy}`
        );

        setCustomers(response as TopCustomer[]);
      } catch (error) {
        console.error("Error fetching top customers:", error);
        toast.error("Failed to load top customers. Please try again.");
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCustomers();
  }, [limit, sortBy]);

  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <Badge className="bg-yellow-500 text-white h-6">
          <Award className="h-3 w-3 mr-1" />1
        </Badge>
      );
    if (index === 1)
      return (
        <Badge className="bg-gray-400 text-white h-6">
          <Award className="h-3 w-3 mr-1" />2
        </Badge>
      );
    if (index === 2)
      return (
        <Badge className="bg-amber-600 text-white h-6">
          <Award className="h-3 w-3 mr-1" />3
        </Badge>
      );
    return (
      <Badge variant="outline" className="h-6">
        {index + 1}
      </Badge>
    );
  };

  const calculateTotalStats = () => {
    return customers.reduce(
      (acc, customer) => ({
        totalOrders: acc.totalOrders + customer.statistics.totalOrders,
        totalSpent: acc.totalSpent + customer.statistics.totalSpent,
      }),
      { totalOrders: 0, totalSpent: 0 }
    );
  };

  const totalStats = calculateTotalStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingIndicator message="Loading top customers..." />
      </div>
    );
  }

  return (
    <div className="w-full md:p-6 p-2">
      <PageHeader
        title="Top Customers"
        description="Best customers by orders and spending"
      />

      {/* Compact Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <Select
            value={limit.toString()}
            onValueChange={(value) => setLimit(parseInt(value))}
          >
            <SelectTrigger className="w-[90px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Top 5</SelectItem>
              <SelectItem value="10">Top 10</SelectItem>
              <SelectItem value="20">Top 20</SelectItem>
              <SelectItem value="50">Top 50</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value: "orders" | "spending") => setSortBy(value)}
          >
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orders">By Orders</SelectItem>
              <SelectItem value="spending">By Spending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Compact Summary */}
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">{customers.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">
              {formatCurrencyEnglish(totalStats.totalSpent)}
            </span>
          </div>
        </div>
      </div>

      {/* Compact Table */}
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-xs h-10">Rank</TableHead>
              <TableHead className="text-xs h-10">Customer</TableHead>
              <TableHead className="hidden md:table-cell text-xs h-10">
                Contact
              </TableHead>
              <TableHead className="text-center text-xs h-10">Orders</TableHead>
              <TableHead className="text-right text-xs h-10">Spent</TableHead>
              <TableHead className="text-right text-xs h-10 hidden lg:table-cell">
                Avg
              </TableHead>
              <TableHead className="text-right text-xs h-10 w-[60px]">
                View
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">No customers found</p>
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer, index) => (
                <TableRow key={customer.id}>
                  {/* Rank */}
                  <TableCell className="py-2">{getRankBadge(index)}</TableCell>

                  {/* Customer */}
                  <TableCell className="py-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm truncate max-w-[150px]">
                          {customer.name}
                        </span>
                        {customer.isVerified && (
                          <Badge variant="default" className="text-xs h-4 px-1">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="hidden md:table-cell py-2">
                    <span className="text-xs">{customer.mobileNumber}</span>
                  </TableCell>

                  {/* Orders */}
                  <TableCell className="text-center py-2">
                    <div className="flex flex-col items-center">
                      <span className="font-bold">
                        {customer.statistics.totalOrders}
                      </span>
                      {customer.statistics.pendingOrders > 0 && (
                        <span className="text-xs text-yellow-600">
                          {customer.statistics.pendingOrders}p
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Total Spent */}
                  <TableCell className="text-right py-2">
                    <span className="font-bold text-sm">
                      {formatCurrencyEnglish(customer.statistics.totalSpent)}
                    </span>
                  </TableCell>

                  {/* Average */}
                  <TableCell className="text-right py-2 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {customer.statistics.totalOrders > 0
                        ? formatCurrencyEnglish(
                            customer.statistics.averageOrderValue
                          )
                        : "—"}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      asChild
                    >
                      <Link href={`/admin/customer/${customer.id}/view`}>
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

      {/* Compact Summary Footer */}
      {customers.length > 0 && (
        <div className="mt-3 p-3 bg-muted rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            <div>
              <p className="text-muted-foreground">Customers</p>
              <p className="text-lg font-bold">{customers.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Orders</p>
              <p className="text-lg font-bold">{totalStats.totalOrders}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p className="text-lg font-bold">
                {formatCurrencyEnglish(totalStats.totalSpent)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Avg/Customer</p>
              <p className="text-lg font-bold">
                {customers.length > 0
                  ? formatCurrencyEnglish(
                      totalStats.totalSpent / customers.length
                    )
                  : "৳0"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
