
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const seoFormSchema = z.object({
  metaTitle: z.string().max(60, { message: 'Title should be 60 characters or less.' }),
  metaDescription: z.string().max(160, { message: 'Description should be 160 characters or less.' }),
  keywords: z.string(),
});

type SeoFormValues = z.infer<typeof seoFormSchema>;

const defaultValues: Partial<SeoFormValues> = {
  metaTitle: 'Mina Food | Fresh Organic Food',
  metaDescription: 'Discover the best organic food, sourced responsibly and delivered fresh to your doorstep. Shop for fresh vegetables, fruits, bakery, dairy and more.',
  keywords: 'organic food, fresh vegetables, online grocery, mina food',
};

export default function AdminSeoManagementPage() {
  const { toast } = useToast();
  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: SeoFormValues) {
    toast({
      title: 'SEO Settings Saved!',
      description: 'Your new SEO settings have been applied.',
    });
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Management</CardTitle>
        <CardDescription>
          Improve your store's ranking on search engines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your site's meta title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title that appears in search engine results (max 60 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short description for search engines"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of your site for search results (max 160 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="organic, fresh, food, delivery" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords relevant to your store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save SEO Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
