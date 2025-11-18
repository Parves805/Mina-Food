
'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, { message: 'নাম অবশ্যই কমপক্ষে 2 অক্ষরের হতে হবে।' }),
  description: z.string().min(10, { message: 'বর্ণনা অবশ্যই কমপক্ষে 10 অক্ষরের হতে হবে।' }),
  price: z.coerce.number().positive({ message: 'মূল্য অবশ্যই একটি ধনাত্মক সংখ্যা হতে হবে।' }),
  stock: z.coerce.number().int().min(0, { message: 'স্টক অবশ্যই 0 বা তার বেশি হতে হবে।' }),
  categoryId: z.string({ required_error: 'একটি বিভাগ নির্বাচন করা আবশ্যক।' }),
  imageId: z.string({ required_error: 'একটি ছবি নির্বাচন করা আবশ্যক।' }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const defaultValues = product ? {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.category.id,
    imageId: product.imageId,
  } : {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: undefined,
    imageId: undefined,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পণ্যের নাম</FormLabel>
              <FormControl>
                <Input placeholder="যেমন, জৈব গাজর" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পণ্যের বর্ণনা</FormLabel>
              <FormControl>
                <Textarea placeholder="পণ্যের একটি সংক্ষিপ্ত বিবরণ দিন..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>মূল্য</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>স্টক পরিমাণ</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিভাগ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="একটি বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
                <FormLabel>পণ্যের ছবি</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="একটি ছবি নির্বাচন করুন" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-96">
                        {placeholderImages.filter(p => p.id.startsWith('prod-')).map(img => (
                            <SelectItem key={img.id} value={img.id}>
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                                        <Image src={img.imageUrl} alt={img.description} fill className="object-cover" />
                                    </div>
                                    <span className="truncate">{img.description}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <FormMessage />
            </FormItem>
           )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            বাতিল করুন
          </Button>
          <Button type="submit">{product ? 'সংরক্ষণ করুন' : 'পণ্য তৈরি করুন'}</Button>
        </div>
      </form>
    </Form>
  );
}
