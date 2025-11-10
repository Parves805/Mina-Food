'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Leaf, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/admin', label: 'Admin' },
];

export function AppHeader() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Leaf className="h-6 w-6" />
            <span className="font-headline">GreenBasket</span>
          </Link>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                  <Leaf className="h-6 w-6" />
                  <span className="font-headline">GreenBasket</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="pl-9 w-full md:w-64" />
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/account">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/account/orders">Orders</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/login">Log In</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
