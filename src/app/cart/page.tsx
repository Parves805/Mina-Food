'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { Label } from '@/components/ui/label';
import { ClientHeader } from '../_components/client-header';
import { AppFooter } from '../_components/footer';
import { BottomNav } from '../_components/bottom-nav';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
    <ClientHeader />
    <main className="flex-grow pb-16 md:pb-0">
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">আপনার শপিং কার্ট</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-card border-2 border-dashed rounded-lg">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">আপনার কার্ট খালি।</h2>
          <p className="text-lg text-muted-foreground mb-6">মনে হচ্ছে আপনি এখনো কিছু যোগ করেননি।</p>
          <Button asChild>
            <Link href="/products">কেনাকাটা শুরু করুন</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const image = placeholderImages.placeholderImages.find(p => p.id === item.imageId);
              return (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={item.name}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-4 flex-grow grid gap-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">৳{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 mx-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="w-24 text-right font-semibold text-lg">৳{(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              );
            })}
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>অর্ডার সারাংশ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>উপমোট</span>
                  <span>৳{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>শিপিং</span>
                  <span className="font-medium text-primary">বিনামূল্যে</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>সর্বমোট</span>
                  <span>৳{cartTotal.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="pt-2 space-y-2">
                  <Label>কুপন কোড</Label>
                  <div className="flex space-x-2">
                    <Input placeholder="FRESH10" />
                    <Button variant="outline">প্রয়োগ করুন</Button>
                  </div>
                </div>
                <Button asChild className="w-full mt-4" size="lg">
                  <Link href="/checkout">
                    চেকআউটে এগিয়ে যান <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
    </main>
    <AppFooter />
    <BottomNav />
    </>
  );
}
