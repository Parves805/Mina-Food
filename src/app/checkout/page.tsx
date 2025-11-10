import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const deliverySlots = [
    "Today, 4:00 PM - 6:00 PM",
    "Tomorrow, 9:00 AM - 11:00 AM",
    "Tomorrow, 2:00 PM - 4:00 PM",
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Shipping & Delivery */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5" /> Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Jane Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Green Way" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Natureville" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="90210" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Slot</CardTitle>
              <CardDescription>Choose a convenient time for your delivery.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue={deliverySlots[0]}>
                {deliverySlots.map(slot => (
                  <div key={slot} className="flex items-center space-x-2">
                    <RadioGroupItem value={slot} id={slot} />
                    <Label htmlFor={slot} className="font-normal">{slot}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Payment & Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between text-sm">
                  <span>Organic Carrots x 2</span>
                  <span>$5.98</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sourdough Bread x 1</span>
                  <span>$5.49</span>
                </div>
                <Separator/>
                 <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>$11.47</span>
                </div>
                 <div className="flex justify-between font-medium">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <Separator/>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$11.47</span>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button size="lg" asChild>
          <Link href="/account/orders">Place Order</Link>
        </Button>
      </div>
    </div>
  );
}
