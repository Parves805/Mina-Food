
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';

export default function AdminNotificationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Notification</CardTitle>
        <CardDescription>
          Send push notifications to all users or a specific user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-w-lg mx-auto">
          <div>
            <Label htmlFor="title">Notification Title</Label>
            <Input id="title" placeholder="e.g., Flash Sale!" />
          </div>
          <div>
            <Label htmlFor="body">Notification Body</Label>
            <Textarea id="body" placeholder="Describe the notification..." />
          </div>
          <div>
            <Label htmlFor="recipient">Recipient (Optional)</Label>
            <Input id="recipient" placeholder="Enter user ID to send to a specific user" />
            <p className="text-xs text-muted-foreground mt-1">Leave empty to send to all users.</p>
          </div>
          <Button className="w-full">
            <Bell className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
