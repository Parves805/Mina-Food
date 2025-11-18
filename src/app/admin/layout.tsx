'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Home, ShoppingBasket, Package, Users, Tag, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/admin', label: 'ড্যাশবোর্ড', icon: Home },
  { href: '/admin/products', label: 'পণ্য', icon: ShoppingBasket },
  { href: '/admin/orders', label: 'অর্ডার', icon: Package },
  { href: '/admin/users', label: 'ব্যবহারকারী', icon: Users },
  { href: '/admin/coupons', label: 'কুপন', icon: Tag },
  { href: '/admin/analytics', label: 'বিশ্লেষণ', icon: BarChart2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-primary rounded-lg" asChild>
                  <Link href="/">
                      <Leaf className="h-7 w-7" />
                  </Link>
              </Button>
              <span className="text-lg font-semibold font-headline">মিনা ফুড</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname === item.href
                        ? 'bg-primary/10 text-primary hover:bg-primary/20'
                        : 'hover:bg-accent'
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="bg-secondary/40 min-h-screen md:ml-64">
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b h-16 flex items-center px-6">
            <div className="md:hidden">
              <SidebarTrigger>
                <SheetHeader>
                  <SheetTitle className='sr-only'>Admin Menu</SheetTitle>
                </SheetHeader>
              </SidebarTrigger>
            </div>
            <h2 className="text-xl font-semibold ml-4">
              {menuItems.find(item => pathname.startsWith(item.href))?.label || 'ড্যাশবোর্ড'}
            </h2>
          </header>
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </SidebarProvider>
  );
}
