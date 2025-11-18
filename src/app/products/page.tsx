'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/app/_components/product-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/data';
import type { Certification } from '@/lib/types';
import { X, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const allCertifications: Certification[] = ['USDA Organic', 'Non-GMO Project Verified', 'Fair Trade Certified'];

function Filters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  selectedCerts,
  handleCertChange,
  clearFilters,
  hasActiveFilters,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: string;
  setCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCerts: Certification[];
  handleCertChange: (cert: Certification, checked: boolean) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <SlidersHorizontal className="h-5 w-5" />
          ফিল্টার
        </CardTitle>
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">
            পরিষ্কার করুন
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="search" className="font-semibold">অনুসন্ধান</Label>
          <Input
            id="search"
            placeholder="যেমন আপেল"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="mt-2"
          />
        </div>

        <Separator />

        <div>
          <Label className="font-semibold">বিভাগ</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="একটি বিভাগ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সমস্ত বিভাগ</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label className="font-semibold">মূল্য পরিসীমা</Label>
          <p className="text-sm text-muted-foreground mt-2 mb-4">৳{priceRange[0]} - ৳{priceRange[1]}</p>
          <Slider
            min={0}
            max={15}
            step={1}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        </div>

        <Separator />

        <div>
          <Label className="font-semibold">সার্টিফিকেশন</Label>
          <div className="space-y-3 mt-3">
            {allCertifications.map(cert => (
              <div key={cert} className="flex items-center space-x-3">
                <Checkbox
                  id={cert}
                  checked={selectedCerts.includes(cert)}
                  onCheckedChange={(checked) => handleCertChange(cert, checked as boolean)}
                />
                <Label htmlFor={cert} className="font-normal text-sm">{cert}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15]);
  const [selectedCerts, setSelectedCerts] = useState<Certification[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category.id === category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCerts = selectedCerts.length === 0 || selectedCerts.every(cert => product.certifications.includes(cert));
      return matchesSearch && matchesCategory && matchesPrice && matchesCerts;
    });
  }, [searchTerm, category, priceRange, selectedCerts]);

  const handleCertChange = (cert: Certification, checked: boolean) => {
    setSelectedCerts(prev =>
      checked ? [...prev, cert] : prev.filter(c => c !== cert)
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setPriceRange([0, 15]);
    setSelectedCerts([]);
  };

  const hasActiveFilters = searchTerm || category !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 15 || selectedCerts.length > 0;

  const filterProps = {
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    selectedCerts,
    handleCertChange,
    clearFilters,
    hasActiveFilters,
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold font-headline">আমাদের পণ্য</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">আমাদের তাজা এবং জৈব পণ্যের সংগ্রহ অন্বেষণ করুন। গুণমান এবং সতেজতার জন্য সাবধানে নির্বাচিত।</p>
      </div>
      
      <div className="mb-6 lg:hidden flex items-center justify-between">
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              ফিল্টার
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="sr-only">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-8">
             <Filters {...filterProps} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="text-sm text-muted-foreground">
            {filteredProducts.length}টি পণ্য দেখানো হচ্ছে
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12">
        {/* Filters - Desktop */}
        <aside className="hidden lg:block lg:col-span-1 self-start sticky top-24">
          <Filters {...filterProps} />
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          <div className="hidden lg:block mb-6 text-sm text-muted-foreground">
            {filteredProducts.length}টি পণ্য দেখানো হচ্ছে
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-lg text-muted-foreground mt-2">আপনার ফিল্টারের সাথে কোনো পণ্য মেল খায় না।</p>
              <Button onClick={clearFilters} variant="link" className="mt-4">
                <X className="mr-2 h-4 w-4" /> সমস্ত ফিল্টার সাফ করুন
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
