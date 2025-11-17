'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-headline">গ্রিনবাস্কেট</span>
            </Link>
            <p className="text-muted-foreground text-sm">
             তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।
            </p>
          </div>
          <div className="lg:col-start-3">
            <h3 className="font-semibold mb-4">কেনাকাটা</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">সকল পণ্য</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">শাকসবজি</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">ফল</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">প্যান্ট্রি</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">আমাদের সম্পর্কে</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">আমাদের গল্প</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-primary">কার্ট</Link></li>
              <li><Link href="/account" className="text-muted-foreground hover:text-primary">অ্যাকাউন্ট</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} গ্রিনবাস্কেট। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
