'use client';

import Link from 'next/link';
import { Leaf, Facebook, Twitter, Instagram } from 'lucide-react';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
              <Leaf className="h-7 w-7" />
              <span className="font-headline">মিনা ফুড</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm max-w-sm">
             তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।
            </p>
            <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                    <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                    <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                    <Instagram className="h-6 w-6" />
                </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-3">
              <div>
                <h3 className="font-semibold mb-4 text-primary-foreground">কেনাকাটা</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground/100">সকল পণ্য</Link></li>
                  <li><Link href="/category/cat-1" className="text-primary-foreground/80 hover:text-primary-foreground/100">শাকসবজি</Link></li>
                  <li><Link href="/category/cat-2" className="text-primary-foreground/80 hover:text-primary-foreground/100">ফল</Link></li>
                  <li><Link href="/category/cat-5" className="text-primary-foreground/80 hover:text-primary-foreground/100">প্যান্ট্রি</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-primary-foreground">আমাদের সম্পর্কে</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">আমাদের গল্প</Link></li>
                  <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">টেকসই</Link></li>
                  <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">ক্যারিয়ার</Link></li>
                </ul>
              </div>
              <div>
                 <h3 className="font-semibold mb-4 text-primary-foreground">গ্রাহক সেবা</h3>
                 <ul className="space-y-2 text-sm">
                    <li><Link href="/account" className="text-primary-foreground/80 hover:text-primary-foreground/100">আমার অ্যাকাউন্ট</Link></li>
                    <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">যোগাযোগ করুন</Link></li>
                    <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">FAQs</Link></li>
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
