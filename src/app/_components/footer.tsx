'use client';

import Link from 'next/link';
import { Leaf, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/context/pwa-install-context';

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  const { installPrompt, isInstallable } = usePWAInstall();

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
    }
  };


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
             {isInstallable && (
                <div className="pt-4">
                    <Button 
                        onClick={handleInstallClick} 
                        variant="secondary"
                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    >
                       <Download className="mr-2 h-4 w-4" />
                        অ্যাপ ডাউনলোড করুন
                    </Button>
                </div>
            )}
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
                 <h3 className="font-semibold mb-4 text-primary-foreground">সামাজিক</h3>
                 <div className="flex space-x-4">
                    <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">Facebook</Link>
                    <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground/100">Instagram</Link>
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
