import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck, ArrowLeft, Wallet, Landmark } from 'lucide-react';
import Link from 'next/link';

function BkashIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0496 3.24805H4.95041C4.01841 3.24805 3.25 4.01646 3.25 4.94846V19.0511C3.25 19.9831 4.01841 20.7515 4.95041 20.7515H19.0496C19.9816 20.7515 20.75 19.9831 20.75 19.0511V4.94846C20.75 4.01646 19.9816 3.24805 19.0496 3.24805Z" fill="#E2136E"/>
            <path d="M11.7198 14.8517C10.7412 14.8517 9.87351 14.4924 9.24351 13.8449C8.61351 13.1974 8.26123 12.3168 8.26123 11.3259C8.26123 10.3349 8.61351 9.45434 9.24351 8.80684C9.87351 8.15934 10.7412 7.8 11.7198 7.8H15.2673V6.15171H11.662C9.9659 6.15171 8.5284 6.72671 7.49151 7.82282C6.45462 8.91893 5.91893 10.2222 5.91893 11.662C5.91893 13.1017 6.45462 14.405 7.49151 15.5011C8.5284 16.5972 9.9659 17.1722 11.662 17.1722H15.2673V15.5239H11.9687C11.9109 15.5239 11.8531 15.5239 11.7953 15.5239C11.7764 15.5239 11.7575 15.5239 11.7423 15.5239C11.7347 15.5239 11.7271 15.5239 11.7198 15.5239V14.8517Z" fill="white"/>
            <path d="M15.2674 9.42773H11.7199V14.8519H15.2674V9.42773Z" fill="white"/>
        </svg>
    )
}

function NagadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#F7941D"/>
            <path d="M12 4.16113C11.0543 4.16113 10.1501 4.38006 9.36934 4.7937C8.58859 5.20735 7.9582 5.80101 7.53589 6.52044C7.11358 7.23986 6.9126 8.06175 6.95304 8.88701C6.99348 9.71227 7.27376 10.5115 7.76562 11.206L12 18.8389L16.2344 11.206C16.7262 10.5115 17.0065 9.71227 17.047 8.88701C17.0874 8.06175 16.8864 7.23986 16.4641 6.52044C16.0418 5.80101 15.4114 5.20735 14.6307 4.7937C13.8499 4.38006 12.9457 4.16113 12 4.16113V4.16113Z" fill="white"/>
        </svg>
    )
}

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#8C3494"/>
            <path d="M14.9998 6.50001L9 11.3333L12.5 13.5L14.9998 6.50001Z" fill="white"/>
            <path d="M12.5 13.5L9 17.5L14.5 11.8333L12.5 13.5Z" fill="#F5B422"/>
        </svg>
    )
}


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
                    <span>৳5.98</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>খट्टा রুটি x 1</span>
                    <span>৳5.49</span>
                  </div>
                  <Separator/>
                   <div className="flex justify-between font-medium">
                    <span>উপমোট</span>
                    <span>৳11.47</span>
                  </div>
                   <div className="flex justify-between font-medium">
                    <span>শিপিং</span>
                    <span className="text-primary">বিনামূল্যে</span>
                  </div>
                  <Separator/>
                  <div className="flex justify-between font-bold text-lg">
                    <span>সর্বমোট</span>
                    <span>৳11.47</span>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><CreditCard className="h-6 w-6" /> অর্থপ্রদানের বিবরণ</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="cod" className="gap-4">
                  <Label htmlFor="cod" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="cod" id="cod" />
                    <Wallet className="h-5 w-5 mr-2" />
                    <span className="font-medium">ক্যাশ অন ডেলিভারি</span>
                  </Label>
                  
                  <Label htmlFor="bkash" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="bkash" id="bkash" />
                    <BkashIcon className="h-6 w-6" />
                    <span className="font-medium">bKash</span>
                  </Label>

                  <Label htmlFor="nagad" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="nagad" id="nagad" />
                    <NagadIcon className="h-6 w-6" />
                    <span className="font-medium">Nagad</span>
                  </Label>

                  <Label htmlFor="rocket" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                    <RadioGroupItem value="rocket" id="rocket" />
                    <RocketIcon className="h-6 w-6" />
                    <span className="font-medium">Rocket</span>
                  </Label>
                  
                  <Label htmlFor="card" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                     <RadioGroupItem value="card" id="card" />
                     <Landmark className="h-5 w-5 mr-2" />
                    <span className="font-medium">কার্ড পেমেন্ট</span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
            <Button size="lg" className="w-full text-lg" asChild>
                <Link href="/account/orders">অর্ডার করুন (৳11.47)</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
