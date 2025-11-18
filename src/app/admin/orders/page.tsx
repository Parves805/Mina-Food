import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { orders } from '@/lib/data';
import { OrderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function AdminOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>অর্ডার</CardTitle>
        <CardDescription>সমস্ত গ্রাহক অর্ডার দেখুন এবং পরিচালনা করুন।</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>অর্ডার আইডি</TableHead>
                <TableHead>গ্রাহক</TableHead>
                <TableHead className="hidden sm:table-cell">তারিখ</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="text-right">মোট</TableHead>
                <TableHead className="text-right">פעולה</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{format(order.orderDate, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('capitalize', statusStyles[order.status])}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">৳{order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/orders/${order.id}`}>বিস্তারিত দেখুন</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
