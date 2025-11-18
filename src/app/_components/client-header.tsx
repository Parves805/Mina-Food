'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Leaf, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { categories, products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';


const navLinks = [
  { href: '/', label: 'হোম' },
  { href: '/products', label: 'পণ্য' },
];

const categoryLinks = categories.map(category => ({
    href: `/products?category=${category.id}`,
    label: category.name,
}));

export function ClientHeader() {
  const { cartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  }
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between w-full md:hidden">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-headline">মিনা ফুড</span>
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <SheetHeader>
                   <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2 font-bold text-lg mb-4">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-headline">মিনা ফুড</span>
                  </Link>
                </SheetHeader>
                <nav className="flex-grow flex flex-col text-base font-medium mt-4 overflow-y-auto">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="text-foreground transition-colors hover:text-primary py-2"
                  >
                    হোম
                  </Link>
                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="text-foreground transition-colors hover:text-primary py-2 font-semibold"
                  >
                    সকল পণ্য
                  </Link>
                  
                  {categoryLinks.map(link => (
                      <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="text-muted-foreground transition-colors hover:text-primary py-2">
                          {link.label}
                      </Link>
                  ))}
                  <Separator className="my-4" />
                  <Link href="/account" onClick={closeMobileMenu} className="text-foreground transition-colors hover:text-primary py-2">প্রোফাইল</Link>
                  <Link href="/account/orders" onClick={closeMobileMenu} className="text-foreground transition-colors hover:text-primary py-2">অর্ডার</Link>
                  <Separator className="my-4" />
                  <Link href="/login" onClick={closeMobileMenu} className="text-foreground transition-colors hover:text-primary py-2">লগইন</Link>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden md:flex items-center w-full">
          <div className="flex items-center gap-4 mr-auto">
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-headline">মিনা ফুড</span>
              </Link>
          </div>
          
          <div ref={searchRef} className="flex-1 justify-center items-center mx-4">
            <div className="w-full max-w-md relative">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="পণ্য খুঁজুন..." 
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
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
              </form>
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-50 overflow-hidden">
                  <ul>
                    {searchResults.map(product => {
                      const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
                      return (
                      <li key={product.id}>
                        <Link 
                          href={`/products/${product.id}`}
                          className="flex items-center gap-4 p-3 hover:bg-accent transition-colors"
                          onClick={() => {
                            setSearchTerm('');
                            setIsSearchFocused(false);
                          }}
                        >
                           <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
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
                              <p className="font-medium truncate">{product.name}</p>
                              <p className="text-sm text-primary font-semibold">৳{product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      </li>
                    )})}
                  </ul>
                </div>
              )}
              {isSearchFocused && searchTerm && searchResults.length === 0 && (
                   <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-50 p-4 text-center text-muted-foreground">
                      <p>কোনো পণ্য পাওয়া যায়নি।</p>
                  </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors text-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-1">
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge variant="default" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {cartCount}
                    </Badge>
                  )}
                  <span className="sr-only">শপিং কার্ট</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">ব্যবহারকারীর অ্যাকাউন্ট</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/account">প্রোফাইল</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/account/orders">অর্ডার</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/login">লগইন</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block border-t">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-4 lg:space-x-6">
            {categoryLinks.map((link) => (
                <Button key={link.href} asChild variant="ghost" className="text-sm font-medium h-12 hover:bg-accent rounded-none">
                    <Link href={link.href} className="text-foreground hover:text-primary">{link.label}</Link>
                </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
