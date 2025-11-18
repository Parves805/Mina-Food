
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
          <TabsTrigger value="campaigns">ক্যাম্পেইন</TabsTrigger>
          <TabsTrigger value="seo">এসইও</TabsTrigger>
          <TabsTrigger value="social">সামাজিক</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="campaigns">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>ইমেল ক্যাম্পেইন</CardTitle>
                <CardDescription>
                  আপনার গ্রাহকদের কাছে নিউজলেটার এবং প্রচারমূলক ইমেল পাঠান।
                </CardDescription>
              </div>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                নতুন ক্যাম্পেইন তৈরি করুন
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">এখনও কোনো ক্যাম্পেইন তৈরি করা হয়নি।</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seo">
        <Card>
          <CardHeader>
            <CardTitle>সার্চ ইঞ্জিন অপটিমাইজেশন (এসইও)</CardTitle>
            <CardDescription>
              সার্চ ইঞ্জিনে আপনার দোকানের র‍্যাঙ্কিং উন্নত করুন।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">এসইও বৈশিষ্ট্য শীঘ্রই আসছে...</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>সামাজিক মিডিয়া</CardTitle>
            <CardDescription>
              আপনার সামাজিক মিডিয়া অ্যাকাউন্টগুলো সংযুক্ত এবং পরিচালনা করুন।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">সামাজিক মিডিয়া ইন্টিগ্রেশন শীঘ্রই আসছে...</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
