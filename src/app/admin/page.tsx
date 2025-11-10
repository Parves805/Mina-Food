import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { orders } from '@/lib/data';
import { OrderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const recentOrders = orders.slice(0, 5);

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট রাজস্ব</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,203.45</div>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">এখন সক্রিয়</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+57</div>
            <p className="text-xs text-muted-foreground">অনলাইন</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>গ্রাহক</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead>তারিখ</TableHead>
                <TableHead className="text-right">পরিমাণ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.user.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('capitalize', statusStyles[order.status])}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(order.orderDate, 'MMM dd, yyyy')}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
