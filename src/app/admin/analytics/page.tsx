import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>বিশ্লেষণ</CardTitle>
        <CardDescription>
          আপনার দোকানের কর্মক্ষমতা ট্র্যাক করুন। এই বিভাগটি শীঘ্রই আসছে।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">বিশ্লেষণ বৈশিষ্ট্য শীঘ্রই আসছে...</p>
        </div>
      </CardContent>
    </Card>
  );
}
