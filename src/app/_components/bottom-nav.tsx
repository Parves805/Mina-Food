'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, Search, X, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import type { Product } from '@/lib/types';


const navItems = [
  { id: 'home', href: '/', label: 'হোম', icon: Home },
  { id: 'categories', href: '/categories', label: 'ক্যাটাগরি', icon: LayoutGrid },
  { id: 'search', href: '#', label: 'সার্চ', icon: Search },
  { id: 'cart', href: '/cart', label: 'কার্ট', icon: ShoppingCart },
];

function MobileSearchSheet() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const closeSheet = () => {
    setIsOpen(false);
    setSearchTerm('');
  };


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
            className="flex flex-col items-center justify-center h-full w-full text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">সার্চ</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>পণ্য খুঁজুন</SheetTitle>
        </SheetHeader>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="আপনার প্রয়োজনীয় কিছু খুঁজুন..." 
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
              <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={handleClearSearch}
              >
                  <X className="h-4 w-4 text-muted-foreground" />
              </Button>
          )}
        </div>
        <div className="flex-grow overflow-y-auto mt-4">
            {searchTerm && searchResults.length > 0 && (
                <ul>
                {searchResults.map(product => {
                    const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
                    return (
                    <li key={product.id}>
                        <Link 
                            href={`/products/${product.id}`}
                            className="flex items-center gap-4 p-3 hover:bg-accent transition-colors rounded-lg"
                            onClick={closeSheet}
                        >
                           <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            {image && (
                              <Image
                                src={image.imageUrl}
                                alt={product.name}
                                data-ai-hint={image.imageHint}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className='flex-grow'>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-primary font-semibold">৳{product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                    </li>
                    )})}
                </ul>
            )}
            {searchTerm && searchResults.length === 0 && (
                <div className="pt-10 text-center text-muted-foreground">
                    <p>"{searchTerm}" এর জন্য কোনো পণ্য পাওয়া যায়নি।</p>
                </div>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}


export function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <nav className="h-full">
        <ul className="h-full grid grid-cols-4">
          {navItems.map((item) => {
            if (item.id === 'search') {
              return (
                <li key={item.id} className="h-full flex items-center justify-center">
                  <MobileSearchSheet />
                </li>
              );
            }
            
            const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center h-full text-sm font-medium transition-colors w-full',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <div className="relative">
                    <item.icon className="h-6 w-6" />
                    {item.href === '/cart' && cartCount > 0 && (
                      <Badge variant="default" className="absolute -top-2 -right-3 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
