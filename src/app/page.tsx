'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Feather, Award, Leaf } from 'lucide-react';
import { products, sliderContent, categories } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductRecommendations } from '@/app/_components/recommendations';
import { ProductCard } from '@/app/_components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ClientHeader } from './_components/client-header';
import { AppFooter } from './_components/footer';
import { BottomNav } from './_components/bottom-nav';
import { Card } from '@/components/ui/card';
import { CategoryProductSection } from './_components/category-product-section';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const vegetableProducts = products.filter(p => p.category.id === 'cat-1').slice(0, 6);
  const fruitProducts = products.filter(p => p.category.id === 'cat-2').slice(0, 6);

  const sliderImages = sliderContent.map(content => 
    placeholderImages.placeholderImages.find(p => p.id === content.imageId)
  ).filter(Boolean);


  return (
    <>
      <ClientHeader />
      <main className="flex-grow pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <Carousel
            className="w-full h-full"
            opts={{ loop: true }}
            plugins={[
              Autoplay({ delay: 5000, stopOnInteraction: true }),
            ]}
          >
            <CarouselContent>
              {sliderContent.map((content, index) => {
                const image = placeholderImages.placeholderImages.find(p => p.id === content.imageId)
                return (
                <CarouselItem key={content.id}>
                  <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                    <div className="relative z-10 flex flex-col items-center justify-end h-full text-center p-4 sm:p-8 md:p-12 text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
                        {content.headline}
                      </h1>
                      <p className="max-w-2xl text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-primary-foreground/90">
                        {content.description}
                      </p>
                      <Button asChild size="lg" className="font-semibold text-base md:text-lg">
                        <Link href={content.buttonLink}>
                          {content.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              )})}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 border-none h-10 w-10 sm:h-12 sm:w-12" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 border-none h-10 w-10 sm:h-12 sm:w-12" />
          </Carousel>
        </section>

        {/* Categories Section */}
        <section className="py-8 md:py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-headline">আমাদের ক্যাটাগরি</h2>
              <p className="text-muted-foreground mt-2">আপনার প্রয়োজনীয় পণ্যগুলো খুঁজে নিন।</p>
            </div>
             <Carousel
              opts={{ align: 'start', loop: true }}
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {categories.map((category) => {
                  const image = placeholderImages.placeholderImages.find(p => p.id === category.imageId);
                  return (
                    <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                      <div className="p-1">
                        <Link href={`/category/${category.id}`}>
                          <Card className="group overflow-hidden rounded-xl border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
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
                              <div className="relative z-10 flex items-end justify-center h-full text-center p-2 text-white">
                                <h2 className="text-lg font-semibold tracking-tight">{category.name}</h2>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8 md:py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-headline">বৈশিষ্ট্যযুক্ত পণ্য</h2>
              <p className="text-muted-foreground mt-2">আমাদের সেরা বিক্রেতাদের থেকে আপনার পছন্দের জিনিসগুলি খুঁজুন।</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/products">
                  সকল পণ্য দেখুন <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Category-wise Product Sections */}
        <div className="space-y-8">
          {categories.find(c => c.id === 'cat-1') && (
            <CategoryProductSection
              category={categories.find(c => c.id === 'cat-1')!}
              products={vegetableProducts}
            />
          )}
          {categories.find(c => c.id === 'cat-2') && (
            <CategoryProductSection
              category={categories.find(c => c.id === 'cat-2')!}
              products={fruitProducts}
            />
          )}
        </div>
        
        {/* Why Choose Us Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-4">কেন মিনা ফুড?</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground mb-12">
                  আমরা টেকসই চাষাবাদ সমর্থন করার পাশাপাশি আপনাকে সর্বোচ্চ মানের জৈব পণ্য সরবরাহ করতে প্রতিশ্রুতিবদ্ধ।
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                        <Award className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">১০০% প্রত্যয়িত জৈব</h3>
                      <p className="text-muted-foreground">আমাদের ক্যাটালগের প্রতিটি আইটেম প্রত্যয়িত জৈব, যা আপনাকে স্বাস্থ্যকর এবং সবচেয়ে প্রাকৃতিক খাবার নিশ্চিত করে।</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                        <Leaf className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">টেকসইভাবে সংগৃহীত</h3>
                      <p className="text-muted-foreground">আমরা স্থানীয় কৃষক এবং নৈতিক সরবরাহকারীদের সাথে অংশীদারি করি যারা গ্রহের প্রতি আমাদের প্রতিশ্রুতি ভাগ করে নেয়।</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                        <Feather className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">তাজাতা নিশ্চিত</h3>
                      <p className="text-muted-foreground">আপনার মুদিখানা প্রতিবারই তাদের সর্বোচ্চ তাজাতা নিয়ে পৌঁছায়।</p>
                  </div>
              </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-headline">আপনার জন্য প্রস্তাবিত</h2>
              <p className="text-muted-foreground mt-2">আপনার ব্রাউজিং ইতিহাসের উপর ভিত্তি করে ব্যক্তিগতকৃত পছন্দ।</p>
            </div>
            <ProductRecommendations />
          </div>
        </section>
      </main>
      <AppFooter />
      <BottomNav />
    </>
  );
}
