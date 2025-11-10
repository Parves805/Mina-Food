import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AdminProductsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>পণ্য</CardTitle>
            <CardDescription>আপনার পণ্য পরিচালনা করুন এবং তাদের বিক্রয় কর্মক্ষমতা দেখুন।</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            পণ্য যোগ করুন
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">ছবি</TableHead>
              <TableHead>নাম</TableHead>
              <TableHead>বিভাগ</TableHead>
              <TableHead className="hidden md:table-cell">স্টক</TableHead>
              <TableHead>মূল্য</TableHead>
              <TableHead>
                <span className="sr-only">פעולות</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
               const image = placeholderImages.placeholderImages.find(p => p.id === product.imageId);
               return(
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={product.name}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category.name}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem>সম্পাদনা</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">মুছে ফেলুন</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
