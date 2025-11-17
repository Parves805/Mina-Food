
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Minus, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { ProductCard } from '@/app/_components/product-card';
import { cn } from '@/lib/utils';
import { notFound, useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [reviewsCount, setReviewsCount] = useState(0);

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = products.find((p) => p.id === productId);
  
  useEffect(() => {
    if (product) {
      if (product.reviewsCount === undefined) {
        setReviewsCount(Math.floor(Math.random() * 100) + 10);
      } else {
        setReviewsCount(product.reviewsCount);
      }
    }
  }, [product]);

  if (!product) {
    notFound();
  }

  const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
  const rating = product.rating || 4.5;
  const relatedProducts = products.filter(p => p.category.id === product.category.id && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageId: product.imageId,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <div className="relative aspect-square rounded-xl overflow-hidden">
          {image && (
            <Image
              src={image.imageUrl}
              alt={product.name}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div>
          <Badge variant="outline" className="mb-2">{product.category.name}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-3">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('h-5 w-5', rating > i ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30')} />
              ))}
            </div>
            {reviewsCount > 0 && <span className="text-sm text-muted-foreground">({reviewsCount} reviews)</span>}
          </div>

          <p className="text-4xl font-bold text-primary mb-6">৳{product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-6">
            <p className="font-medium">পরিমাণ:</p>
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-bold text-lg">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button size="lg" className="w-full lg:w-auto text-lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            কার্টে যোগ করুন
          </Button>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">ফ্রি ডেলিভারি</h4>
                <p>৳500 এর বেশি অর্ডারে ফ্রি ডেলিভারি উপভোগ করুন।</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">নিরাপদ ও সুরক্ষিত</h4>
                <p>আমাদের সকল পণ্য ১০০% জৈব এবং নিরাপদে প্যাকেজ করা হয়।</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {product.certifications.map(cert => (
                <Badge key={cert} variant="secondary" className="mr-2 mb-2">{cert}</Badge>
            ))}
          </div>

        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16 lg:mt-24">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">সম্পর্কিত পণ্য</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
