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
    "আজ, 4:00 PM - 6:00 PM",
    "আগামীকাল, 9:00 AM - 11:00 AM",
    "আগামীকাল, 2:00 PM - 4:00 PM",
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">চেকআউট</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Shipping & Delivery */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5" /> শিপিং ঠিকানা</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">পুরো নাম</Label>
                <Input id="name" placeholder="জেন ডো" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address"> রাস্তার ঠিকানা</Label>
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
              <CardTitle>ডেলিভারি স্লট</CardTitle>
              <CardDescription>আপনার ডেলিভারির জন্য একটি সুবিধাজনক সময় বেছে নিন।</CardDescription>
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
              <CardTitle>অর্ডার সারাংশ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between text-sm">
                  <span>জৈব গাজর x 2</span>
                  <span>$5.98</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>খट्टा রুটি x 1</span>
                  <span>$5.49</span>
                </div>
                <Separator/>
                 <div className="flex justify-between font-medium">
                  <span>মোট</span>
                  <span>$11.47</span>
                </div>
                 <div className="flex justify-between font-medium">
                  <span>শিপিং</span>
                  <span>$0.00</span>
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
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> অর্থপ্রদানের বিবরণ</CardTitle>
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
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button size="lg" asChild>
          <Link href="/account/orders">অর্ডার দিন</Link>
        </Button>
      </div>
    </div>
  );
}
