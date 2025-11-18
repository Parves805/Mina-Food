import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminMarketingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>মার্কেটিং</CardTitle>
        <CardDescription>
          আপনার মার্কেটিং ক্যাম্পেইন এবং প্রচার পরিচালনা করুন।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">মার্কেটিং বৈশিষ্ট্য শীঘ্রই আসছে...</p>
        </div>
      </CardContent>
    </Card>
  );
}
