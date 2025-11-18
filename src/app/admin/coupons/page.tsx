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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { coupons } from '@/lib/data';
import { format } from 'date-fns';

export default function AdminCouponsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>কুপন</CardTitle>
            <CardDescription>আপনার দোকানের জন্য প্রচারমূলক কোড পরিচালনা করুন।</CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            কুপন যোগ করুন
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>কোড</TableHead>
                <TableHead className="hidden sm:table-cell">ডিসকাউন্ট</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="hidden md:table-cell">মেয়াদ শেষ হওয়ার তারিখ</TableHead>
                <TableHead>
                  <span className="sr-only">অ্যাকশন</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell className="hidden sm:table-cell">{coupon.discount}%</TableCell>
                  <TableCell>
                    <Badge variant={coupon.isActive ? 'outline' : 'secondary'} className={coupon.isActive ? 'text-green-700 border-green-200' : ''}>
                      {coupon.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{format(coupon.expiryDate, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>অ্যাকশন</DropdownMenuLabel>
                        <DropdownMenuItem>সম্পাদনা</DropdownMenuItem>
                        <DropdownMenuItem>{coupon.isActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">মুছে ফেলুন</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
