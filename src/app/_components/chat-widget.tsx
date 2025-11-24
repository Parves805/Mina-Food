'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle the form submission, e.g., send to a server
    console.log('Message sent!');
    toast({
      title: 'বার্তা পাঠানো হয়েছে!',
      description: 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
    });
    setIsOpen(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageSquare className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">যোগাযোগ করুন</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSendMessage} className="flex-grow flex flex-col justify-between mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="chat-name">আপনার নাম</Label>
                <Input id="chat-name" placeholder="আপনার নাম লিখুন" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chat-email">আপনার ইমেল</Label>
                <Input id="chat-email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chat-message">আপনার বার্তা</Label>
                <Textarea id="chat-message" placeholder="আপনার বার্তা এখানে লিখুন..." required className="min-h-[120px]" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit" className="w-full">বার্তা পাঠান</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
