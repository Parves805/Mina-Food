'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBasket, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/', label: 'হোম', icon: Home },
  { href: '/products', label: 'পণ্য', icon: ShoppingBasket },
  { href: '/cart', label: 'কার্ট', icon: ShoppingCart },
  { href: '/account', label: 'অ্যাকাউন্ট', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <nav className="h-full">
        <ul className="h-full grid grid-cols-4">
          {navItems.map((item) => {
            const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center h-full text-sm font-medium transition-colors',
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
