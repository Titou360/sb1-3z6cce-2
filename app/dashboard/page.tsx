'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import PluginSelector from '@/components/PluginSelector';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const DashboardPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user.firstName}!</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Hotel Information</h2>
          <p><strong>Hotel Name:</strong> {user.hotelName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Current Plan:</strong> {user.selectedPlan}</p>
          <p><strong>Room Count:</strong> {user.roomCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Plugins</h2>
          <PluginSelector />
        </div>
        <Button onClick={() => router.push('/payment')}>Proceed to Payment</Button>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardPage;