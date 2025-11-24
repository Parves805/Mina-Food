
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminImageGeneratorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateImage = () => {
    if (!searchTerm) return;
    setLoading(true);
    const formattedSearch = encodeURIComponent(searchTerm);
    // Using Unsplash source for random image based on search term
    const url = `https://source.unsplash.com/800x600/?${formattedSearch}`;
    setImageUrl(url);
    // Simulate network delay for image to load
    setTimeout(() => setLoading(false), 1500);
  };

  const copyToClipboard = () => {
    if (!imageUrl) return;
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The image URL has been copied.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image URL Generator</CardTitle>
        <CardDescription>
          Generate and copy image URLs from Unsplash for your products.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Image Search Term</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="e.g., fresh apples, bread loaf"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={generateImage} disabled={loading}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>

        <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : imageUrl ? (
            <div className="relative h-full w-full">
              <Image src={imageUrl} alt={searchTerm} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          ) : (
            <p className="text-muted-foreground">Image preview will appear here</p>
          )}
        </div>

        {imageUrl && !loading && (
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Generated URL</Label>
            <div className="flex gap-2">
              <Input id="imageUrl" value={imageUrl} readOnly />
              <Button onClick={copyToClipboard} variant="outline">
                <Clipboard className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
