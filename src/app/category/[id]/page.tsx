'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { categories, products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { ClientHeader } from '@/app/_components/client-header';
import { AppFooter } from '@/app/_components/footer';
import { BottomNav } from '@/app/_components/bottom-nav';
import { ProductCard } from '@/app/_components/product-card';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category.id === categoryId);
  const coverImage = placeholderImages.placeholderImages.find(p => p.id === category.coverImageId);

  return (
    <>
      <ClientHeader />
      <main className="flex-grow pb-16 md:pb-0">
        <section className="relative w-full h-64 md:h-80">
          {coverImage && (
            <Image
              src={coverImage.imageUrl}
              alt={category.name}
              data-ai-hint={coverImage.imageHint}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">
              {category.name}
            </h1>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 lg:py-12">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">কোনো পণ্য পাওয়া যায়নি</h2>
              <p className="text-muted-foreground mt-2">এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।</p>
            </div>
          )}
        </section>
      </main>
      <AppFooter />
      <BottomNav />
    </>
  );
}
