import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center bg-secondary/50 min-h-[calc(100vh-4rem)] py-12 px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center space-y-4">
           <Link href="/" className="inline-block">
            <Leaf className="h-10 w-10 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-2xl font-headline">একটি অ্যাকাউন্ট তৈরি করুন</CardTitle>
          <CardDescription>একটি নতুন অ্যাকাউন্ট তৈরি করতে আপনার তথ্য লিখুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">পুরো নাম</Label>
              <Input id="full-name" placeholder="জেন ডো" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ইমেল</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            এর মধ্যেই একটি অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="underline font-medium hover:text-primary">
              লগইন করুন
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
