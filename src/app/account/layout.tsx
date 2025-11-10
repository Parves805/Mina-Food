'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Package, MapPin, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/account', label: 'Profile', icon: User },
  { href: '/account/orders', label: 'Orders', icon: Package },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card className="p-4 sticky top-24">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className={cn(
                    'justify-start',
                    pathname === item.href ? 'bg-accent text-accent-foreground' : ''
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
              <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </nav>
          </Card>
        </aside>
        <main className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
