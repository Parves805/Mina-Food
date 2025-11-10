import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <Card className="mx-auto max-w-sm w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">আবার স্বাগতম</CardTitle>
          <CardDescription>আপনার অ্যাকাউন্টে লগইন করতে আপনার ইমেল লিখুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ইমেল</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              লগইন
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{' '}
            <Link href="/register" className="underline">
              সাইন আপ করুন
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
