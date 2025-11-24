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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const aboutFormSchema = z.object({
  aboutUs: z.string().min(10, { message: 'About us content is too short.' }),
  terms: z.string().min(10, { message: 'Terms and conditions content is too short.' }),
  privacy: z.string().min(10, { message: 'Privacy policy content is too short.' }),
});

type AboutFormValues = z.infer<typeof aboutFormSchema>;

const defaultValues: Partial<AboutFormValues> = {
  aboutUs: 'Mina Food is dedicated to bringing you the freshest organic products directly from the farm to your table.',
  terms: 'Welcome to Mina Food. By using our services, you agree to the following terms and conditions...',
  privacy: 'Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.',
};

export default function AdminAboutPage() {
  const { toast } = useToast();
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: AboutFormValues) {
    toast({
      title: 'Content Saved!',
      description: 'Your changes to the About & Legal pages have been saved.',
    });
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About & Legal Pages</CardTitle>
        <CardDescription>
          Manage the content for your "About Us", "Terms & Conditions", and "Privacy Policy" pages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="aboutUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Us</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Content for your About Us page..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms & Conditions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Content for your Terms & Conditions page..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Privacy Policy</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Content for your Privacy Policy page..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Content</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
