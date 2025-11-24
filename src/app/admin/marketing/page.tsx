
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

export default function AdminMarketingPage() {
  return (
    <Tabs defaultValue="campaigns" className="w-full">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="campaigns">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  Send newsletters and promotional emails to your customers.
                </CardDescription>
              </div>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Campaign
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No campaigns created yet.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seo">
        <Card>
          <CardHeader>
            <CardTitle>Search Engine Optimization (SEO)</CardTitle>
            <CardDescription>
              Improve your store's ranking on search engines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">SEO features coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Connect and manage your social media accounts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Social media integrations coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
