'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageId: product.imageId,
    });
  };

  return (
    <Card className="group overflow-hidden rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300 shadow-md hover:shadow-primary/20">
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
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Button size="icon" variant="default" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`} className="rounded-full h-10 w-10 bg-background/80 hover:bg-background text-primary hover:text-primary/90 backdrop-blur-sm">
                <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-4 bg-background">
          <p className="text-sm text-muted-foreground mb-1">{product.category.name}</p>
          <h3 className="text-lg font-semibold truncate leading-tight">
            <Link href="#" className="hover:text-primary transition-colors">{product.name}</Link>
          </h3>
          <div className="mt-3">
            <p className="text-xl font-bold text-primary">৳{product.price.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
