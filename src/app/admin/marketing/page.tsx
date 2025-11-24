

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminMarketingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Overview</CardTitle>
        <CardDescription>
          Select a marketing module from the sidebar to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">You can manage campaigns, SEO, and social media from here.</p>
            <Button asChild>
                <Link href="/admin/marketing/campaigns">Go to Campaigns</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
