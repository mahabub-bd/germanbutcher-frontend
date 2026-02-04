"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrencyEnglish } from "@/lib/utils";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface Last30DaysData {
  date: string;
  orderCount: number;
  totalValue: number;
}

interface Last30DaysDeliveredChartProps {
  chartData: Last30DaysData[];
}

const ORDERS_COLOR = "#3b82f6"; // Blue-500
const ORDERS_COLOR_LIGHT = "#60a5fa"; // Blue-400
const SALES_COLOR = "#10b981"; // Emerald-500
const SALES_COLOR_LIGHT = "#34d399"; // Emerald-400

export default function Last30DaysDeliveredChart({
  chartData,
}: Last30DaysDeliveredChartProps) {
  const totalOrders = chartData.reduce((sum, item) => sum + item.orderCount, 0);
  const totalSales = chartData.reduce((sum, item) => sum + item.totalValue, 0);
  const avgOrders = totalOrders / (chartData.length || 1);
  const avgSales = totalSales / (chartData.length || 1);

  // Format date for display (e.g., "Jan 4")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Format data for chart with readable dates
  const formattedData = chartData.map((item) => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: unknown[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-3 shadow-lg">
          <div className="font-semibold mb-2 text-sm">{label}</div>
          {payload.map((entry: unknown, index: number) => {
            const e = entry as {
              color?: string;
              name?: string;
              value?: number;
            };
            return (
              <div
                key={`item-${index}`}
                className="flex items-center justify-between text-sm gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: e.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">{e.name}:</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {e.name === "Sales"
                    ? formatCurrencyEnglish(e.value ?? 0)
                    : (e.value ?? 0).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // Custom tick component to rotate labels vertically
  const CustomAxisTick = ({
    x,
    y,
    payload,
  }: {
    x?: number;
    y?: number;
    payload?: { value: string };
  }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={5}
          transform="rotate(-90)"
          fontSize={13}
          fontWeight={600}
          fill="currentColor"
          className="text-gray-700 dark:text-gray-300"
          textAnchor="end"
        >
          {payload?.value}
        </text>
      </g>
    );
  };

  return (
    <Card className="w-full border-2 shadow-lg">
      <Tabs defaultValue="area" className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold">Last 30 Days</CardTitle>
              <CardDescription>
                Daily order count and revenue trends
              </CardDescription>
            </div>
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="area" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                Area
              </TabsTrigger>
              <TabsTrigger value="trend" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                Trend
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                Orders
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                Sales
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <CardContent>

          <TabsContent value="area" className="mt-0">
            <ResponsiveContainer
              width="100%"
              height={350}
              className="md:h-[400px]"
            >
              <AreaChart
                data={formattedData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ORDERS_COLOR} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={ORDERS_COLOR} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SALES_COLOR} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={SALES_COLOR} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  interval={0}
                  tick={<CustomAxisTick />}
                  height={80}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} iconType="circle" iconSize={10} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="orderCount"
                  name="Orders"
                  stroke={ORDERS_COLOR}
                  strokeWidth={3}
                  fill="url(#colorOrders)"
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: ORDERS_COLOR }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalValue"
                  name="Sales"
                  stroke={SALES_COLOR}
                  strokeWidth={3}
                  fill="url(#colorSales)"
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: SALES_COLOR }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="trend" className="mt-0">
            <ResponsiveContainer
              width="100%"
              height={350}
              className="md:h-[400px]"
            >
              <LineChart
                data={formattedData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  interval={0}
                  tick={<CustomAxisTick />}
                  height={80}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} iconType="circle" iconSize={10} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orderCount"
                  name="Orders"
                  stroke={ORDERS_COLOR}
                  strokeWidth={3}
                  dot={{ fill: ORDERS_COLOR, r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: ORDERS_COLOR }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalValue"
                  name="Sales"
                  stroke={SALES_COLOR}
                  strokeWidth={3}
                  dot={{ fill: SALES_COLOR, r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: SALES_COLOR }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <ResponsiveContainer
              width="100%"
              height={350}
              className="md:h-[400px]"
            >
              <BarChart
                data={formattedData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="barOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ORDERS_COLOR_LIGHT}/>
                    <stop offset="100%" stopColor={ORDERS_COLOR}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  interval={0}
                  tick={<CustomAxisTick />}
                  height={80}
                />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="orderCount"
                  name="Orders"
                  fill="url(#barOrders)"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="sales" className="mt-0">
            <ResponsiveContainer
              width="100%"
              height={350}
              className="md:h-[400px]"
            >
              <BarChart
                data={formattedData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="barSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SALES_COLOR_LIGHT}/>
                    <stop offset="100%" stopColor={SALES_COLOR}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  interval={0}
                  tick={<CustomAxisTick />}
                  height={80}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="totalValue"
                  name="Sales"
                  fill="url(#barSales)"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
