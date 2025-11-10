'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg shadow-sm">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const image = placeholderImages.placeholderImages.find(p => p.id === item.imageId);
              return (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden">
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
                  <div className="ml-4 flex-grow">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="w-24 text-right font-semibold ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              );
            })}
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="pt-4 space-y-2">
                  <Label>Coupon Code</Label>
                  <div className="flex space-x-2">
                    <Input placeholder="FRESH10" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
                <Button asChild className="w-full mt-4" size="lg">
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
