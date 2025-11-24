
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ShippingRatesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Rates</CardTitle>
        <CardDescription>
          Configure shipping costs for different regions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Shipping rate configuration will be available here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
