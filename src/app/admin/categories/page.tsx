
'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { categories } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { Category } from '@/lib/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  bannerImageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
}

function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const image = category ? placeholderImages.placeholderImages.find(p => p.id === category.imageId) : null;
  const coverImage = category ? placeholderImages.placeholderImages.find(p => p.id === category.coverImageId) : null;

  const defaultValues = category ? {
    name: category.name,
    imageUrl: image?.imageUrl || '',
    bannerImageUrl: coverImage?.imageUrl || '',
  } : {
    name: '',
    imageUrl: '',
    bannerImageUrl: '',
  };

  const form = useForm<CategoryFormValues>({
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
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Men's T-Shirts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
           )}
        />
        <FormField
          control={form.control}
          name="bannerImageUrl"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Banner Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://example.com/banner.png" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
           )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{category ? 'Save Changes' : 'Add Category'}</Button>
        </div>
      </form>
    </Form>
  );
}


export default function AdminCategoriesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsSheetOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsSheetOpen(true);
  };

  const handleFormSubmit = (values: any) => {
    console.log('Form submitted', values);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className='text-2xl font-bold'>Categories</h1>
            <p className="text-muted-foreground">Manage your product categories.</p>
        </div>
        <Button onClick={handleAddCategory}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => {
                  const image = placeholderImages.placeholderImages.find(p => p.id === category.imageId);
                  return(
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={category.name}
                              data-ai-hint={image.imageHint}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditCategory(category)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-[90vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedCategory ? 'Edit Category' : 'Add New Category'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <CategoryForm
              category={selectedCategory}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
