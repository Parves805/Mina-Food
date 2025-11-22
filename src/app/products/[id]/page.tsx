'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Minus, ShoppingCart, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { ProductCard } from '@/app/_components/product-card';
import { cn } from '@/lib/utils';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ClientHeader } from '@/app/_components/client-header';
import { AppFooter } from '@/app/_components/footer';
import { BottomNav } from '@/app/_components/bottom-nav';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CheckoutForm } from '@/app/checkout/page';


function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.51 14.83c-.15.42-1 1.2-1.18 1.22-.17.02-.36.02-1.61-.53s-2.08-1.27-3.48-2.67c-1.4-1.4-2.3-2.89-2.67-3.48-.37-.6-.06-.9.24-1.21.28-.28.58-.37.78-.37.2 0 .37 0 .53.05.15.05.34.42.39.58.05.17.05.36 0 .53-.1.18-.15.28-.28.42-.12.15-.24.3-.3.42-.07.12-.15.24.03.45.18.2.42.6.95 1.13.53.53.92.73 1.13.95.2.18.33.15.45.03.12-.07.28-.3.42-.42.15-.12.24-.22.42-.1.17.1.58.32.7.38.1.05.2.1.24.15.05.05.05.28 0 .42z" />
      </svg>
    );
}

function MessengerIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.63-.1 2.38-.29a.5.5 0 0 0 .43-.72L14 14.41V11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v2.91l-1.81 6.51a.5.5 0 0 0 .43.72A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10zm-3.5 10.5L6 15l2.5-2.5L11 15l2.5-2.5L16 15l-2.5-2.5L11 10l-2.5 2.5z" />
      </svg>
    );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [reviewsCount, setReviewsCount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = products.find((p) => p.id === productId);
  
  useEffect(() => {
    if (product) {
      if (product.reviewsCount === undefined) {
        setReviewsCount(Math.floor(Math.random() * 100) + 10);
      } else {
        setReviewsCount(product.reviewsCount);
      }
    }
  }, [product]);

  if (!product) {
    notFound();
  }

  const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
  const rating = product.rating || 4.5;
  const relatedProducts = products.filter(p => p.category.id === product.category.id && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageId: product.imageId,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageId: product.imageId,
    });
    setIsCheckoutOpen(true);
  };

  const phoneNumber = "1234567890";
  const message = `হ্যালো, আমি ${product.name} সম্পর্কে জানতে আগ্রহী।`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const messengerUrl = `https://m.me/your-page-id`;

  return (
    <>
    <ClientHeader />
    <main className="flex-grow pb-16 md:pb-0">
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square rounded-xl overflow-hidden">
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

        <div>
          <Badge variant="outline" className="mb-2">{product.category.name}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-3">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('h-5 w-5', rating > i ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30')} />
              ))}
            </div>
            {reviewsCount > 0 && <span className="text-sm text-muted-foreground">({reviewsCount} reviews)</span>}
          </div>

          <p className="text-4xl font-bold text-primary mb-6">৳{product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-6">
            <p className="font-medium">পরিমাণ:</p>
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-bold text-lg">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button size="lg" variant="outline" className="w-full text-lg h-12" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    কার্টে যোগ করুন
                </Button>
                <SheetTrigger asChild>
                  <Button size="lg" className="w-full text-lg h-12" onClick={handleBuyNow}>
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      এখনই কিনুন
                  </Button>
                </SheetTrigger>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-14 text-base bg-[#25D366] text-white hover:bg-[#1DAE53] hover:text-white border-0">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon className="h-6 w-6" />
                          <span>WhatsApp</span>
                      </a>
                  </Button>
                  <Button asChild variant="outline" className="h-14 text-base bg-[#00B2FF] text-white hover:bg-[#0099e6] hover:text-white border-0">
                      <a href={messengerUrl} target="_blank" rel="noopener noreferrer">
                          <MessengerIcon className="h-6 w-6" />
                          <span>Messenger</span>
                      </a>
                  </Button>
              </div>
            </div>
            <SheetContent className="w-full max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>চেকআউট</SheetTitle>
              </SheetHeader>
              <CheckoutForm />
            </SheetContent>
          </Sheet>


          <div className="mt-8 space-y-4 text-sm text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">ফ্রি ডেলিভারি</h4>
                <p>৳500 এর বেশি অর্ডারে ফ্রি ডেলিভারি উপভোগ করুন।</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">নিরাপদ ও সুরক্ষিত</h4>
                <p>আমাদের সকল পণ্য ১০০% জৈব এবং নিরাপদে প্যাকেজ করা হয়।</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {product.certifications.filter(cert => !['USDA Organic', 'Non-GMO Project Verified'].includes(cert)).map(cert => (
                <Badge key={cert} variant="secondary" className="mr-2 mb-2">{cert}</Badge>
            ))}
          </div>

        </div>
      </div>
      
      <div className="mt-16 lg:mt-24">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">সম্পর্কিত পণ্য</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
    </main>
    <AppFooter />
    <BottomNav />
    </>
  );
}
