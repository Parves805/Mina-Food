'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';
import { useCart } from '@/context/cart-context';

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
    <Card className="overflow-hidden group border-2 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl w-full">
      <CardContent className="p-0">
        <div className="relative h-56 w-full">
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
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate" title={product.name}>{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category.name}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
