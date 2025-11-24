import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function PromoCardsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Promo Cards</CardTitle>
            <CardDescription>
              Manage small promotional cards displayed on your site.
            </CardDescription>
          </div>
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Promo Card
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No promo cards created yet.</p>
        </div>
      </CardContent>
    </Card>
  );
}
