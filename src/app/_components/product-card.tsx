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
    <Card>
      <CardContent className="p-4">
        <Link href="#">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-4">
            {image && (
              <Image
                src={image.imageUrl}
                alt={product.name}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </Link>
        <p className="text-sm text-muted-foreground">{product.category.name}</p>
        <h3 className="text-lg font-semibold truncate mt-1">
          <Link href="#" className="hover:text-primary transition-colors">{product.name}</Link>
        </h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-foreground">৳{product.price.toFixed(2)}</p>
          <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
