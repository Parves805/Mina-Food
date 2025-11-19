'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  PanelLeft,
  Search,
  Tag,
  Megaphone,
  BarChart2,
  Settings,
  ImageIcon,
  Leaf,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';


const menuItems = [
    { href: '/admin', label: 'ড্যাশবোর্ড', icon: Home },
    { href: '/admin/products', label: 'পণ্য', icon: Package },
    { href: '/admin/orders', label: 'অর্ডার', icon: ShoppingCart },
    { href: '/admin/users', label: 'ব্যবহারকারী', icon: Users },
    { href: '/admin/analytics', label: 'বিশ্লেষণ', icon: LineChart },
    { href: '/admin/coupons', label: 'কুপন', icon: Tag },
    { href: '/admin/marketing', label: 'মার্কেটিং', icon: Megaphone },
    { href: '/admin/slider', label: 'Slider Settings', icon: ImageIcon },
    { href: '/admin/settings', label: 'সেটিংস', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const avatar = placeholderImages.placeholderImages.find(p => p.id === 'avatar-2');

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => {
        if (item.href === '/admin') return pathname === item.href;
        return pathname.startsWith(item.href);
    });
    return currentItem?.label || 'ড্যাশবোর্ড';
  };
  
  const SidebarNav = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {menuItems.map(item => {
        const isActive = (item.href === '/admin' && pathname === item.href) || 
                         (item.href !== '/admin' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
  
  const MobileSidebar = () => (
     <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-headline">মিনা ফুড</span>
            </Link>
            {menuItems.map(item => {
                const isActive = (item.href === '/admin' && pathname === item.href) || 
                                (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn("flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                        isActive && "bg-muted text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                )
            })}
          </nav>
        </SheetContent>
      </Sheet>
  );


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-headline">মিনা ফুড</span>
            </Link>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full ml-auto">
                {avatar && (
                   <div className="relative h-8 w-8 rounded-full overflow-hidden">
                     <Image src={avatar.imageUrl} alt="Admin" fill className="object-cover" />
                   </div>
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
         <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
            <MobileSidebar />
             <div className="w-full flex-1">
                <h1 className="text-xl font-semibold md:text-2xl">{getPageTitle()}</h1>
            </div>
         </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
