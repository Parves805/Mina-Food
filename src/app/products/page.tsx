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

const allCertifications: Certification[] = ['USDA Organic', 'Non-GMO Project Verified', 'Fair Trade Certified'];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 15]);
  const [selectedCerts, setSelectedCerts] = useState<Certification[]>([]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">আমাদের পণ্য</h1>
        <p className="text-lg text-muted-foreground mt-2">আমাদের তাজা এবং জৈব পণ্যের সংগ্রহ অন্বেষণ করুন।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-sm self-start sticky top-24">
          <h2 className="text-2xl font-semibold mb-6">ফিল্টার</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="search" className="text-base font-medium">অনুসন্ধান</Label>
              <Input 
                id="search" 
                placeholder="যেমন আপেল" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-base font-medium">বিভাগ</Label>
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
            
            <div>
              <Label className="text-base font-medium">মূল্য পরিসীমা</Label>
              <p className="text-sm text-muted-foreground mt-2 mb-4">${priceRange[0]} - ${priceRange[1]}</p>
              <Slider
                min={0}
                max={15}
                step={1}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
            </div>

            <div>
              <Label className="text-base font-medium">সারтификация</Label>
              <div className="space-y-2 mt-2">
                {allCertifications.map(cert => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox 
                      id={cert} 
                      checked={selectedCerts.includes(cert)}
                      onCheckedChange={(checked) => handleCertChange(cert, checked as boolean)}
                    />
                    <Label htmlFor={cert} className="font-normal">{cert}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={clearFilters} variant="outline" className="w-full">সমস্ত ফিল্টার সাফ করুন</Button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">আপনার ফিল্টারের সাথে কোনো পণ্য मेल খায় না।</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
