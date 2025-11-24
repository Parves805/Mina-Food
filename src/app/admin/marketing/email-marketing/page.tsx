
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function AdminEmailMarketingPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Email Marketing</CardTitle>
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
  );
}
