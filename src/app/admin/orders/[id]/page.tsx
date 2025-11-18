'use client';

import { useParams, notFound } from 'next/navigation';
import { orders, products as allProducts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/lib/types';
import { Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import './print.css';

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = orders.find(o => o.id === orderId);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return notFound();
  }

  return (
    <div className="order-details-page">
      <div className="flex items-center justify-between mb-6 no-print">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">অর্ডার #{order.id.split('-')[1]}</h1>
        </div>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          অর্ডার প্রিন্ট করুন
        </Button>
      </div>

      <Card className="printable-area p-6">
        <div className="print-header hidden">
            <h1 className="text-2xl font-bold">অর্ডার ইনভয়েস</h1>
            <p>অর্ডার আইডি: #{order.id.split('-')[1]}</p>
            <p>অর্ডারের তারিখ: {format(order.orderDate, 'MMM dd, yyyy')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>গ্রাহক</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{order.user.name}</p>
              <p className="text-sm text-muted-foreground">{order.user.email}</p>
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
        </div>
        
        <Separator className="my-6" />

        <h2 className="text-xl font-bold mb-4">অর্ডার আইটেম</h2>
        <Card>
          <CardContent className="p-0">
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
          </CardContent>
        </Card>
        
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
        <div className="print-footer hidden mt-12 text-center text-sm text-muted-foreground">
            <p>মিনা ফুড-এ কেনাকাটার জন্য আপনাকে ধন্যবাদ!</p>
        </div>
      </Card>
    </div>
  );
}
