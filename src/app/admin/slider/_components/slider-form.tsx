
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
import type { SliderContent } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Image from 'next/image';

const formSchema = z.object({
  headline: z.string().min(1, { message: 'Headline is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  buttonText: z.string().min(1, { message: 'Button text is required.' }),
  buttonLink: z.string().min(1, { message: 'Button link is required.' }),
  imageId: z.string({ required_error: 'An image is required.' }),
});

type SliderFormValues = z.infer<typeof formSchema>;

interface SliderFormProps {
  slide?: SliderContent | null;
  onSubmit: (values: SliderFormValues) => void;
  onCancel: () => void;
}

export function SliderForm({ slide, onSubmit, onCancel }: SliderFormProps) {
  const defaultValues = slide ? {
    headline: slide.headline,
    description: slide.description,
    buttonText: slide.buttonText,
    buttonLink: slide.buttonLink,
    imageId: slide.imageId,
  } : {
    headline: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    imageId: undefined,
  };

  const form = useForm<SliderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Truly. Simply. Organic." {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A short description for the slide..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buttonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Text</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Shop Now" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="buttonLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Link</FormLabel>
              <FormControl>
                <Input placeholder="e.g., /products" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Slider Image</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an image" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-96">
                        {placeholderImages.filter(p => p.id.startsWith('slider-')).map(img => (
                            <SelectItem key={img.id} value={img.id}>
                                <div className="flex items-center gap-3">
                                    <div className="relative h-12 w-20 rounded-md overflow-hidden flex-shrink-0">
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
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
