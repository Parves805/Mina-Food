'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Category, Product } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategoryProductSectionProps {
  category: Category;
  products: Product[];
}

export function CategoryProductSection({ category, products }: CategoryProductSectionProps) {
  const categoryImage = placeholderImages.placeholderImages.find(p => p.id === category.coverImageId);

  return (
    <section className="py-8 md:py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Category Promo */}
          <div className="lg:col-span-1 rounded-xl overflow-hidden relative aspect-square lg:aspect-auto h-full">
            {categoryImage && (
              <Image
                src={categoryImage.imageUrl}
                alt={category.name}
                data-ai-hint={categoryImage.imageHint}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 text-white">
              <h2 className="text-4xl font-bold font-headline mb-4">{category.name}</h2>
              <Button asChild variant="secondary">
                <Link href={`/category/${category.id}`}>
                  সব দেখুন <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Product Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
