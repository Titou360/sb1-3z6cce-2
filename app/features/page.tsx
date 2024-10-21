import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Smart Room Management',
    description: 'Efficiently manage room assignments and cleaning schedules.',
  },
  {
    title: 'Guest Experience Enhancement',
    description: 'Personalize guest experiences with tailored services and recommendations.',
  },
  {
    title: 'Inventory Tracking',
    description: 'Keep track of supplies and automate reordering processes.',
  },
  {
    title: 'Staff Coordination',
    description: 'Streamline staff communication and task management.',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Gain insights into hotel performance with detailed analytics.',
  },
  {
    title: 'Integration Capabilities',
    description: 'Seamlessly integrate with existing hotel management systems.',
  },
];

export default function FeaturesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">RoomCare.Pro Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}