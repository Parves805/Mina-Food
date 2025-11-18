
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, Users, ShoppingBag } from 'lucide-react';

const monthlySalesData = [
    { month: 'Jan', sales: 186 },
    { month: 'Feb', sales: 305 },
    { month: 'Mar', sales: 237 },
    { month: 'Apr', sales: 273 },
    { month: 'May', sales: 209 },
    { month: 'Jun', sales: 214 },
    { month: 'Jul', sales: 345 },
    { month: 'Aug', sales: 289 },
    { month: 'Sep', sales: 256 },
    { month: 'Oct', sales: 312 },
    { month: 'Nov', sales: 322 },
    { month: 'Dec', sales: 389 },
];

const salesByCategoryData = [
  { name: 'Fresh Vegetables', value: 400 },
  { name: 'Fresh Fruits', value: 300 },
  { name: 'Bakery', value: 300 },
  { name: 'Dairy & Eggs', value: 200 },
  { name: 'Pantry', value: 278 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">মোট রাজস্ব</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">৳24,203.45</div>
                    <p className="text-xs text-muted-foreground">গত মাস থেকে +20.1%</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">বিক্রয়</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+1,234</div>
                    <p className="text-xs text-muted-foreground">গত মাস থেকে +19%</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">নতুন গ্রাহক</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+234</div>
                    <p className="text-xs text-muted-foreground">গত মাস থেকে +180.1%</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>মাসিক বিক্রয়</CardTitle>
                    <CardDescription>গত ১২ মাসের বিক্রয় দেখুন</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-80 w-full">
                        <BarChart data={monthlySalesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>বিভাগ অনুযায়ী বিক্রয়</CardTitle>
                    <CardDescription>প্রতিটি বিভাগে বিক্রয়ের বন্টন</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-80 w-full">
                        <PieChart>
                            <Pie
                                data={salesByCategoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {salesByCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
