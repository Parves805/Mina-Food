'use client';

import { useParams, notFound } from 'next/navigation';
import { orders, products as allProducts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function UserOrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="icon">
          <Link href="/account/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-semibold">অর্ডার #{order.id.split('-')[1]}</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <Card>
            <CardHeader>
              <CardTitle>অর্ডারের সারাংশ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <p><strong>অর্ডারের তারিখ:</strong> {format(order.orderDate, 'MMM dd, yyyy')}</p>
               <p><strong>সর্বমোট:</strong> ৳{order.total.toFixed(2)}</p>
               <div className="flex items-center gap-2"><strong>স্ট্যাটাস:</strong> <Badge variant="outline" className={cn('capitalize', statusStyles[order.status])}>{order.status}</Badge></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>শিপিং ঠিকানা</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>
        </div>
        
        <Separator />

        <h3 className="text-xl font-semibold">অর্ডার আইটেম</h3>
        <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>পণ্য</TableHead>
                  <TableHead>পরিমাণ</TableHead>
                  <TableHead className="text-right">একক মূল্য</TableHead>
                  <TableHead className="text-right">মোট</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{allProducts.find(p => p.id === item.product.id)?.name || 'Unknown Product'}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">৳{item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">৳{(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
        
        <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">উপমোট</span>
                    <span>৳{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">শিপিং</span>
                    <span>৳0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>সর্বমোট</span>
                    <span>৳{order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
