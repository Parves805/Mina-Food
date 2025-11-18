
'use client';

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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { sliderContent } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SliderForm } from './_components/slider-form';
import type { SliderContent as SliderContentType } from '@/lib/types';

export default function AdminSliderPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<SliderContentType | null>(null);

  const handleEditSlide = (slide: SliderContentType) => {
    setSelectedSlide(slide);
    setIsSheetOpen(true);
  };

  const handleFormSubmit = (values: any) => {
    console.log('Form submitted', values);
    // Here you would typically handle updating the slider content
    setIsSheetOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Slider Settings</CardTitle>
              <CardDescription>Manage the content of the homepage slider.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliderContent.map((slide) => {
                 const image = placeholderImages.placeholderImages.find(p => p.id === slide.imageId);
                 return(
                  <TableRow key={slide.id}>
                    <TableCell className="hidden sm:table-cell">
                      <div className="relative h-16 w-28 rounded-md overflow-hidden">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={slide.headline}
                            data-ai-hint={image.imageHint}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{slide.headline}</TableCell>
                    <TableCell className="max-w-sm truncate">{slide.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditSlide(slide)}>Edit</DropdownMenuItem>
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
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Edit Slide</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <SliderForm
              slide={selectedSlide}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
