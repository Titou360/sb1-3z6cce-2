'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { setSelectedPlan } from '@/lib/slices/userSlice';
import { RootState } from '@/lib/store';

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for small hotels',
    features: [
      '49 rooms maximum',
      'Customer support by mail',
      'Instruction booklet',
    ],
    maxRooms: 49,
  },
  {
    name: 'Basic',
    price: 49,
    description: 'Ideal for small to medium hotels',
    features: [
      '49 rooms maximum',
      '24/7 customer support',
      'Staff Coordination (Team Management, instruction booklet, mailbox, maintenance tracker)',
    ],
    maxRooms: 49,
  },
  {
    name: 'Pro',
    price: 99,
    description: 'Great for medium-sized hotels',
    features: [
      '99 rooms maximum',
      '24/7 customer support',
      'Staff Coordination (Team Management, instruction booklet, mailbox, maintenance tracker)',
      'Housekeeping Manager',
      'Inventory Management',
      'Reporting',
    ],
    maxRooms: 99,
  },
  {
    name: 'Enterprise',
    price: 119,
    description: 'For large hotels and chains',
    features: [
      '299 rooms maximum',
      '24/7 customer support',
      'Staff Coordination (Team Management, instruction booklet, mailbox, maintenance tracker)',
      'Housekeeping Manager',
      'Inventory Management',
      'Reporting',
      'Guest communication',
      'Till management',
    ],
    maxRooms: 299,
  },
];

const PricingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleChoosePlan = (plan: typeof pricingPlans[0]) => {
    if (user.isAuthenticated) {
      // If user is authenticated, update their plan
      dispatch(setSelectedPlan(plan.name));
      router.push('/dashboard');
    } else {
      // If user is not authenticated, store the selected plan and redirect to signup
      dispatch(setSelectedPlan(plan.name));
      router.push('/signup');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold mb-4">
                  {plan.price === 0 ? 'Free' : `€${plan.price}`}
                  <span className="text-xl font-normal">/month</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleChoosePlan(plan)}>
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PricingPage;