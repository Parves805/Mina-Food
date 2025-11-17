'use client';

import { useState, useEffect } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductRecommendations() {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // In a real app, this would come from user session data
        const mockHistory = {
          browsingHistory: ['prod-1', 'prod-5'],
          pastPurchases: ['prod-2'],
        };

        const result = await getProductRecommendations(mockHistory);
        const recommendedIds = result.productRecommendations.slice(0, 8); // Limit to 8 recommendations
        
        const foundProducts = recommendedIds
          .map(id => products.find(p => p.id === id))
          .filter((p): p is Product => p !== undefined);

        setRecommendedProducts(foundProducts);
      } catch (error) {
        console.error("Failed to get product recommendations:", error);
        // Fallback to showing some popular products
        setRecommendedProducts(products.slice(4, 12));
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {[...Array(4)].map((_, i) => (
           <div key={i} className="flex flex-col space-y-3">
             <Skeleton className="h-[224px] w-full rounded-xl" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-4/5" />
               <Skeleton className="h-4 w-3/5" />
             </div>
           </div>
        ))}
      </div>
    );
  }

  if (recommendedProducts.length === 0) {
    return <p className="text-center text-muted-foreground">এখন কোনো সুপারিশ উপলব্ধ নেই।</p>;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {recommendedProducts.map((product) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
