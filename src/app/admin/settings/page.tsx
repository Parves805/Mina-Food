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
import { toast } from '@/hooks/use-toast';

const settingsFormSchema = z.object({
  siteName: z.string().min(2, {
    message: 'সাইটের নাম কমপক্ষে ২ অক্ষরের হতে হবে।',
  }),
  siteDescription: z.string().min(10, {
    message: 'সাইটের বর্ণনা কমপক্ষে ১০ অক্ষরের হতে হবে।',
  }),
  logoUrl: z.string().url({ message: 'অনুগ্রহ করে একটি বৈধ URL লিখুন।' }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  siteName: 'মিনা ফুড',
  siteDescription: 'তাজা জৈব খাবার, আপনার দরজায় পৌঁছে দেওয়া হয়।',
  logoUrl: '/logo.png', // Assuming you have a logo in public folder
};

export default function SettingsPage() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: SettingsFormValues) {
    toast({
      title: 'আপনি নিম্নলিখিত মান জমা দিয়েছেন:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle>সাধারণ সেটিংস</CardTitle>
            <CardDescription>আপনার সাইটের নাম, বর্ণনা এবং লোগো পরিচালনা করুন।</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>সাইটের নাম</FormLabel>
                    <FormControl>
                      <Input placeholder="আপনার সাইটের নাম" {...field} />
                    </FormControl>
                    <FormDescription>
                      এটি আপনার সাইটের শিরোনাম হিসেবে প্রদর্শিত হবে।
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siteDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>সাইটের বর্ণনা</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="আপনার সাইট সম্পর্কে বলুন"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      এসইও-এর জন্য আপনার সাইটের একটি সংক্ষিপ্ত বর্ণনা।
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>লোগো URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/logo.png" {...field} />
                    </FormControl>
                    <FormDescription>
                      আপনার সাইটের লোগোর জন্য সম্পূর্ণ URL দিন।
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">পরিবর্তনগুলি সংরক্ষণ করুন</Button>
            </form>
          </Form>
        </CardContent>
       </Card>
    </div>
  );
}
