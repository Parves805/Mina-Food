import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { users } from '@/lib/data';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AccountProfilePage() {
  const user = users.find(u => u.role === 'customer');
  const avatar = placeholderImages.placeholderImages.find(p => p.id === user?.avatarId);

  if (!user) {
    return <div>ব্যবহারকারী পাওয়া যায়নি।</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">প্রোফাইলের তথ্য</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden">
            {avatar && (
              <Image
                src={avatar.imageUrl}
                alt={user.name}
                data-ai-hint={avatar.imageHint}
                fill
                className="object-cover"
              />
            )}
          </div>
          <Button variant="outline">ছবি পরিবর্তন করুন</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">পুরো নাম</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">ইমেল ঠিকানা</Label>
            <Input id="email" type="email" defaultValue={user.email} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>পরিবর্তনগুলি সংরক্ষণ করুন</Button>
        </div>
      </div>
    </div>
  );
}
