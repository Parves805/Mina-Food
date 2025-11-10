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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>অর্ডার আইডি</TableHead>
              <TableHead>গ্রাহক</TableHead>
              <TableHead>তারিখ</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead className="text-right">মোট</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{format(order.orderDate, 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', statusStyles[order.status])}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
