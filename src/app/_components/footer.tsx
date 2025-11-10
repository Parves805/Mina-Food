import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Leaf className="h-7 w-7" />
              <span className="font-headline">GreenBasket</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Fresh organic food, delivered to your door.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Vegetables</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Fruits</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Pantry</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Sustainability</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="text-muted-foreground hover:text-primary">My Account</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GreenBasket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
