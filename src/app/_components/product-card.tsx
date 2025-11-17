'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    // This check ensures we only set a random number on the client-side after initial render.
    if (product.reviewsCount === undefined) {
      setReviewsCount(Math.floor(Math.random() * 100) + 10);
    } else {
      setReviewsCount(product.reviewsCount);
    }
  }, [product.reviewsCount]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageId: product.imageId,
    });
  };

  const rating = product.rating || 4.5;
  
  return (
    <Card className="group overflow-hidden rounded-xl border-transparent transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {image && (
            <Link href="#">
              <Image
                src={image.imageUrl}
                alt={product.name}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
             <Button onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`} className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                কার্টে যোগ করুন
            </Button>
          </div>
        </div>
        <div className="p-4 bg-background">
          <p className="text-sm text-muted-foreground mb-1">{product.category.name}</p>
          <h3 className="text-lg font-semibold truncate leading-tight">
            <Link href="#" className="hover:text-primary transition-colors">{product.name}</Link>
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      ratingValue <= Math.floor(rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-muted-foreground/50 fill-muted-foreground/20'
                    )}
                  />
                );
              })}
            </div>
            {reviewsCount > 0 && <span className="text-xs text-muted-foreground">({reviewsCount})</span>}
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-primary">৳{product.price.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
