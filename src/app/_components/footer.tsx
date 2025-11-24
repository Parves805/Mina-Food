'use client';

import Link from 'next/link';
import { Leaf, Facebook, Twitter, Instagram } from 'lucide-react';

function GooglePlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M325.1 234.2L132.3 43.2c-5.4-3.2-12.3-3.1-17.6.1-5.4 3.3-8.7 9-8.7 15.2v400c0 6.1 3.3 11.9 8.7 15.2 5.3 3.2 12.2 3.3 17.6.1l192.8-191.1c5.2-3.1 8.3-8.6 8.3-14.6s-3.1-11.5-8.3-14.6zM40.4 49.3C18.1 62.4 2.8 86.8 0 115.3l127.3 127.3L40.4 49.3zM0 396.7c2.8 28.5 18.1 52.9 40.4 66l86.9-193.3L0 396.7zM471.6 226.7C449.3 213.6 420.3 216 400 229.5l-71.3 71.3 71.3 71.3c20.3 13.5 49.3 15.9 71.6 2.8 23.6-13.8 38.4-38.6 38.4-66.3s-14.8-52.5-38.4-66.3z" />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.6 0 184.2 0 241.2c0 63.8 40.4 118.8 73.1 145.5C99.8 413.5 125.4 435 158.4 435c24.9 0 45.4-14.8 67.2-14.8 21.8 0 41.8 14.8 63.6 14.8 34.3 0 59.5-21.7 85.9-44.5C370.1 364.5 384 321.4 384 279.3c0-26.2-7.3-51.7-21.4-73.2H318.7zM253.7 98.6c13.7-15.1 22.8-35.3 22.8-53.5 0-2.3-1-5.1-1.1-5.2-1.3 0-35.4 14.8-51.9 37.2-15.4 20.8-22.3 45.6-22.3 64.2 0 2.3 1 5.1 1.1 5.1 1.2 0 35.2-14.8 51.4-37.8z" />
    </svg>
  );
}

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground">
              <Leaf className="h-7 w-7" />
              <span className="font-headline">মিনা ফুড</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm max-w-sm">
             তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়। গুণমান এবং সতেজতার জন্য সাবধানে নির্বাচিত।
            </p>
            <div className="flex space-x-4 pt-2">
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
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
                  <li><Link href="/cart" className="text-primary-foreground/80 hover:text-primary-foreground/100">কার্ট</Link></li>
                  <li><Link href="/account" className="text-primary-foreground/80 hover:text-primary-foreground/100">অ্যাকাউন্ট</Link></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="font-semibold mb-4 text-primary-foreground">আমাদের অ্যাপ ডাউনলোড করুন</h3>
                <div className="space-y-3 flex flex-col items-start">
                    <a href="#" className="inline-flex items-center justify-center gap-3 bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors">
                        <GooglePlayIcon className="h-6 w-6"/>
                        <div>
                            <p className="text-xs">GET IT ON</p>
                            <p className="text-base font-semibold">Google Play</p>
                        </div>
                    </a>
                    <a href="#" className="inline-flex items-center justify-center gap-3 bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors">
                        <AppleIcon className="h-6 w-6"/>
                        <div>
                            <p className="text-xs">Download on the</p>
                            <p className="text-base font-semibold">App Store</p>
                        </div>
                    </a>
                </div>
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
