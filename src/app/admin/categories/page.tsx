
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  imageId: z.string({ required_error: 'An image is required.' }),
  coverImageId: z.string({ required_error: 'A cover image is required.' }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
}

function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const defaultValues = category ? {
    name: category.name,
    imageId: category.imageId,
    coverImageId: category.coverImageId || '',
  } : {
    name: '',
    imageId: undefined,
    coverImageId: undefined,
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
                <Input placeholder="e.g., Fresh Vegetables" {...field} />
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
                <FormLabel>Category Image</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an image" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-96">
                        {placeholderImages.placeholderImages.filter(p => p.id.startsWith('cat-')).map(img => (
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
        <FormField
          control={form.control}
          name="coverImageId"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Category Cover Image</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a cover image" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-96">
                        {placeholderImages.placeholderImages.filter(p => p.id.startsWith('cover-')).map(img => (
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
          <Button type="submit">{category ? 'Save Changes' : 'Create Category'}</Button>
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
        <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedCategory ? 'Edit Category' : 'Add New Category'}</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
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

