'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Home, ShoppingBasket, Package, Users, Tag, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: ShoppingBasket },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
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
            <span className="text-lg font-semibold font-headline">GreenBasket</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    className={cn(
                      pathname === item.href
                        ? 'bg-primary/10 text-primary hover:bg-primary/20'
                        : 'hover:bg-accent'
                    )}
                    asChild
                  >
                    <a>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bg-secondary/40 min-h-screen">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b h-16 flex items-center px-6">
          <SidebarTrigger className="md:hidden"/>
          <h2 className="text-xl font-semibold ml-4 hidden md:block">
            {menuItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}
          </h2>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
