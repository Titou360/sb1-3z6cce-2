'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

const PaymentSuccessPage = () => {
  const router = useRouter();

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8 text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">Thank you for your subscription to RoomCare.Pro</p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    </AuthenticatedLayout>
  );
};

export default PaymentSuccessPage;