'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const sections = [
  { id: 'categories', label: 'Categories Section' },
  { id: 'newProducts', label: 'New Products' },
  { id: 'vegetables', label: 'Vegetable Products Section' },
  { id: 'fruits', label: 'Fruit Products Section' },
  { id: 'whyChooseUs', label: 'Why Choose Us Section' },
  { id: 'recommendations', label: 'AI Recommendations' },
];

export default function HomepageSectionsPage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: 'Settings Saved',
            description: 'Your homepage section settings have been updated.',
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage Sections</CardTitle>
        <CardDescription>
          Enable or disable different sections on your homepage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 rounded-lg border p-4">
            {sections.map(section => (
                <div key={section.id} className="flex items-center justify-between">
                    <Label htmlFor={section.id} className="font-medium">{section.label}</Label>
                    <Switch id={section.id} defaultChecked />
                </div>
            ))}
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
