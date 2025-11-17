import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const deliverySlots = [
    "আজ, 4:00 PM - 6:00 PM",
    "আগামীকাল, 9:00 AM - 11:00 AM",
    "আগামীকাল, 2:00 PM - 4:00 PM",
  ];

  return (
    <div className="bg-secondary/50 min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
                <Link href="/cart"><ArrowLeft /></Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline">চেকআউট</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Shipping & Delivery */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Truck className="h-6 w-6" /> শিপিং ঠিকানা</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">পুরো নাম</Label>
                  <Input id="name" placeholder="জেন ডো" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">রাস্তার ঠিকানা</Label>
                  <Input id="address" placeholder="১২৩ গ্রিন ওয়ে" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">শহর</Label>
                    <Input id="city" placeholder="নেচারভিল" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">জিপ কোড</Label>
                    <Input id="zip" placeholder="90210" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">ডেলিভারি স্লট</CardTitle>
                <CardDescription>আপনার ডেলিভারির জন্য একটি সুবিধাজনক সময় বেছে নিন।</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue={deliverySlots[0]} className="gap-4">
                  {deliverySlots.map(slot => (
                    <Label key={slot} htmlFor={slot} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <RadioGroupItem value={slot} id={slot} />
                      <span className="font-medium">{slot}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Payment & Summary */}
          <div className="space-y-6 sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">অর্ডার সারাংশ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <span>জৈব গাজর x 2</span>
                    <span>$5.98</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>খट्टा রুটি x 1</span>
                    <span>$5.49</span>
                  </div>
                  <Separator/>
                   <div className="flex justify-between font-medium">
                    <span>উপমোট</span>
                    <span>$11.47</span>
                  </div>
                   <div className="flex justify-between font-medium">
                    <span>শিপিং</span>
                    <span className="text-primary">বিনামূল্যে</span>
                  </div>
                  <Separator/>
                  <div className="flex justify-between font-bold text-lg">
                    <span>সর্বমোট</span>
                    <span>$11.47</span>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><CreditCard className="h-6 w-6" /> অর্থপ্রদানের বিবরণ</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">কার্ড নম্বর</Label>
                  <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="expiry">মেয়াদ শেষ হওয়ার তারিখ</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button size="lg" className="w-full text-lg" asChild>
                <Link href="/account/orders">অর্ডার করুন ($11.47)</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
