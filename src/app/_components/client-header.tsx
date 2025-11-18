'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Leaf, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/data';

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        
        <div className="flex items-center gap-4 mr-auto">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-headline">মিনা ফুড</span>
            </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center items-center mx-4">
          <div className="w-full max-w-md">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="পণ্য খুঁজুন..." className="pl-9 w-full" />
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 md:space-x-4">
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

          <div className="hidden md:flex items-center space-x-1">
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
        
        <div className="md:hidden ml-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="font-headline">মিনা ফুড</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
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
