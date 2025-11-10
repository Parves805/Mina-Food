import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductRecommendations } from '@/app/_components/recommendations';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
            খাঁটিভাবে। সহজভাবে। জৈবভাবে।
          </h1>
          <p className="max-w-2xl text-lg md:text-xl mb-8 text-primary-foreground/90">
            সেরা জৈব খাবার আবিষ্কার করুন, দায়িত্বের সাথে সংগ্রহ করা এবং আপনার দোরগোড়ায় তাজা পৌঁছে দেওয়া হয়।
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Link href="/products">
              এখনই কিনুন <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">বৈશિષ્ટ্যযুক্ত পণ্য</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => {
              const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
              return (
                <Card key={product.id} className="overflow-hidden group border-2 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl">
                  <CardContent className="p-0">
                    <Link href={`/products`}>
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
                        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category.name}</p>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
                          <Button size="icon" variant="outline">
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="ghost" className="text-primary hover:text-primary">
              <Link href="/products">
                সকল পণ্য দেখুন <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">আপনার জন্য প্রস্তাবিত</h2>
          <ProductRecommendations />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">কেন গ্রিনবাস্কেট?</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-12">
                আমরা টেকসই চাষাবাদ সমর্থন করার পাশাপাশি আপনাকে সর্বোচ্চ মানের জৈব পণ্য সরবরাহ করতে প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">۱০০% प्रमाणित জৈব</h3>
                    <p className="text-muted-foreground">আমাদের ক্যাটালগের প্রতিটি আইটেম প্রত্যয়িত জৈব, যা আপনাকে স্বাস্থ্যকর এবং সবচেয়ে প্রাকৃতিক খাবার নিশ্চিত করে।</p>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">টেকসইভাবে সংগৃহীত</h3>
                    <p className="text-muted-foreground">আমরা স্থানীয় কৃষক এবং नैतिक সরবরাহকারীদের সাথে অংশীদারি করি যারা গ্রহের প্রতি আমাদের প্রতিশ্রুতি ভাগ করে নেয়।</p>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">তাজাতা নিশ্চিত</h3>
                    <p className="text-muted-foreground">আমাদের স্মার্ট ডেলিভারি সিস্টেমের মাধ্যমে, আপনার মুদিখানা প্রতিবারই তাদের সর্বোচ্চ ताजगीতে পৌঁছায়।</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
