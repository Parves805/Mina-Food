import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { users } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ব্যবহারকারী</CardTitle>
        <CardDescription>আপনার গ্রাহক এবং প্রশাসকদের পরিচালনা করুন।</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>নাম</TableHead>
              <TableHead>ইমেল</TableHead>
              <TableHead>ভূমিকা</TableHead>
              <TableHead>অর্ডার</TableHead>
              <TableHead>
                <span className="sr-only">פעולות</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const avatar = placeholderImages.placeholderImages.find(p => p.id === user.avatarId);
              return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
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
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.orderHistory.length}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>פעולות</DropdownMenuLabel>
                      <DropdownMenuItem>প্রোফাইল দেখুন</DropdownMenuItem>
                      <DropdownMenuItem>অর্ডার দেখুন</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">ব্যবহারকারীকে সাসপেন্ড করুন</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
