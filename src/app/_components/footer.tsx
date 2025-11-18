'use client';

import Link from 'next/link';
import { Leaf, Facebook, Twitter, Instagram } from 'lucide-react';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4 text-primary-foreground">
              <Leaf className="h-7 w-7" />
              <span className="font-headline">মিনা ফুড</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
             তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-start-3 grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-primary-foreground">কেনাকাটা</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground/100">সকল পণ্য</Link></li>
                  <li><Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground/100">শাকসবজি</Link></li>
                  <li><Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground/100">ফল</Link></li>
                  <li><Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground/100">প্যান্ট্রি</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-primary-foreground">আমাদের সম্পর্কে</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">আমাদের গল্প</Link></li>
                  <li><Link href="/cart" className="text-primary-foreground/80 hover:text-primary-foreground/100">কার্ট</Link></li>
                  <li><Link href="/account" className="text-primary-foreground/80 hover:text-primary-foreground/100">অ্যাকাউন্ট</Link></li>
                </ul>
              </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/80">
          <p>&copy; {currentYear} মিনা ফুড। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
