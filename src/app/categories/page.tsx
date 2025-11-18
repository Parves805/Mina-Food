'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { categories } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { ClientHeader } from '../_components/client-header';
import { AppFooter } from '../_components/footer';
import { BottomNav } from '../_components/bottom-nav';

export default function CategoriesPage() {
  return (
    <>
      <ClientHeader />
      <main className="flex-grow pb-16 md:pb-0">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold font-headline">পণ্যের ক্যাটাগরি</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">আমাদের তাজা এবং জৈব পণ্যের সংগ্রহ অন্বেষণ করুন।</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => {
              const image = placeholderImages.placeholderImages.find(p => p.id === category.imageId);
              return (
                <Link key={category.id} href={`/products?category=${category.id}`}>
                  <Card className="group overflow-hidden rounded-xl border-transparent transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-square w-full overflow-hidden">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={category.name}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="relative z-10 flex items-end justify-center h-full text-center p-4 text-white">
                        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{category.name}</h2>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <AppFooter />
      <BottomNav />
    </>
  );
}
