'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Feather, Award, Leaf } from 'lucide-react';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductRecommendations } from '@/app/_components/recommendations';
import { ProductCard } from '@/app/_components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  
  const sliderImages = [
    placeholderImages.placeholderImages.find(p => p.id === 'slider-1'),
    placeholderImages.placeholderImages.find(p => p.id === 'slider-2'),
    placeholderImages.placeholderImages.find(p => p.id === 'slider-3'),
  ].filter(Boolean);

  const sliderContent = [
    {
      headline: "খাঁটিভাবে। সহজভাবে। জৈবভাবে।",
      description: "সেরা জৈব খাবার আবিষ্কার করুন, দায়িত্বের সাথে সংগ্রহ করা এবং আপনার দোরগোড়ায় তাজা পৌঁছে দেওয়া হয়।",
      buttonText: "এখনই কিনুন",
      buttonLink: "/products"
    },
    {
      headline: "সকালের নাস্তার সেরা ডিল",
      description: "আমাদের বেকারির তাজা পণ্য এবং দুগ্ধজাত খাবারের সাথে আপনার দিন শুরু করুন।",
      buttonText: "অফার দেখুন",
      buttonLink: "/products?category=cat-3"
    },
    {
      headline: "সতেজ সবজি, স্বাস্থ্যকর জীবন",
      description: "খামার থেকে সরাসরি আপনার রান্নাঘরে আসা মওসুমি সবজির সেরা সম্ভার।",
      buttonText: "সবজি কিনুন",
      buttonLink: "/products?category=cat-1"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh]">
        <Carousel
          className="w-full h-full"
          opts={{ loop: true }}
          plugins={[
            Autoplay({ delay: 5000, stopOnInteraction: true }),
          ]}
        >
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={image!.id}>
                <div className="relative w-full h-[70vh] md:h-[80vh]">
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
                  <div className="relative z-10 flex flex-col items-center justify-end h-full text-center p-8 md:p-12 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
                      {sliderContent[index].headline}
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl mb-8 text-primary-foreground/90">
                      {sliderContent[index].description}
                    </p>
                    <Button asChild size="lg" className="font-semibold text-lg">
                      <Link href={sliderContent[index].buttonLink}>
                        {sliderContent[index].buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 border-none h-12 w-12" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 border-none h-12 w-12" />
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline">বৈশিষ্ট্যযুক্ত পণ্য</h2>
            <p className="text-muted-foreground mt-2">আমাদের সেরা বিক্রেতাদের থেকে আপনার পছন্দের জিনিসগুলি খুঁজুন।</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
      
      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-4">কেন গ্রিনবাস্কেট?</h2>
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
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline">আপনার জন্য প্রস্তাবিত</h2>
            <p className="text-muted-foreground mt-2">আপনার ব্রাউজিং ইতিহাসের উপর ভিত্তি করে ব্যক্তিগতকৃত পছন্দ।</p>
          </div>
          <ProductRecommendations />
        </div>
      </section>
    </div>
  );
}
