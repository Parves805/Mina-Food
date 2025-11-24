
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

export default function AdminCommunicationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communications</CardTitle>
        <CardDescription>
          View and respond to customer messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <div className="text-center w-full max-w-md">
                <h3 className="text-lg font-semibold">No messages yet</h3>
                <p className="text-muted-foreground mt-2 mb-6">When a customer sends a message, it will appear here.</p>
                <div className="space-y-4 text-left">
                     <div>
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input id="recipient" placeholder="Enter customer email or ID"/>
                     </div>
                     <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Type your message..."/>
                     </div>
                     <Button className="w-full">Send Message</Button>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
