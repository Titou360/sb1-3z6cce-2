'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setRoomCount } from '@/lib/slices/userSlice';
import MainLayout from '@/components/MainLayout';
import { Progress } from '@/components/ui/progress';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RootState } from '@/lib/store';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  establishmentName: z.string().min(2, 'Establishment name must be at least 2 characters'),
  establishmentType: z.enum(['hotel', 'hostel', 'vacation_rental', 'other']),
  establishmentAddress: z.string().min(5, 'Please enter a valid address'),
  establishmentPhone: z.string().min(10, 'Please enter a valid phone number'),
  roomCount: z.number().min(1, 'Room count must be at least 1'),
  forfait: z.enum(['free', 'basic', 'pro', 'enterprise']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signupSchema>;

const forfaits = [
  { id: 'free', name: 'Free', price: 0, maxRooms: 49 },
  { id: 'basic', name: 'Basic', price: 49, maxRooms: 49 },
  { id: 'pro', name: 'Pro', price: 99, maxRooms: 99 },
  { id: 'enterprise', name: 'Enterprise', price: 119, maxRooms: 299 },
];

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedPlan = useSelector((state: RootState) => state.user.selectedPlan);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      establishmentName: '',
      establishmentType: 'hotel',
      establishmentAddress: '',
      establishmentPhone: '',
      roomCount: 1,
      forfait: selectedPlan?.toLowerCase() as 'free' | 'basic' | 'pro' | 'enterprise' || 'free',
    },
  });

  useEffect(() => {
    if (selectedPlan) {
      form.setValue('forfait', selectedPlan.toLowerCase() as 'free' | 'basic' | 'pro' | 'enterprise');
    }
  }, [selectedPlan, form]);

  const onSubmit = async (data: SignUpForm) => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // Here you would typically send the data to your backend
        console.log('Signup data:', data);
        
        // Simulate a successful signup
        dispatch(setUser({
          id: '1',
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          hotelName: data.establishmentName,
        }));
        dispatch(setRoomCount(data.roomCount));
        router.push('/dashboard');
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 3:
        return (
          <>
            <FormField
              control={form.control}
              name="establishmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Establishment Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="establishmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Establishment Type</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded">
                      <option value="hotel">Hotel</option>
                      <option value="hostel">Hostel</option>
                      <option value="vacation_rental">Vacation Rental</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 4:
        return (
          <>
            <FormField
              control={form.control}
              name="establishmentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Establishment Address</FormLabel>
                  <FormControl>
                    <AddressAutocomplete onAddressSelect={(address) => form.setValue('establishmentAddress', address)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="establishmentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Establishment Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Rooms</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      max={forfaits.find(f => f.id === form.getValues('forfait'))?.maxRooms || 299}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const maxRooms = forfaits.find(f => f.id === form.getValues('forfait'))?.maxRooms || 299;
                        field.onChange(Math.min(value, maxRooms));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 5:
        return (
          <FormField
            control={form.control}
            name="forfait"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Your Plan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      const maxRooms = forfaits.find(f => f.id === value)?.maxRooms || 299;
                      form.setValue('roomCount', Math.min(form.getValues('roomCount'), maxRooms));
                    }}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {forfaits.map((forfait) => (
                      <Card key={forfait.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            {forfait.name}
                          </CardTitle>
                          <RadioGroupItem value={forfait.id} id={forfait.id} />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {forfait.price === 0 ? 'Free' : `€${forfait.price}`}
                            <span className="text-xs font-normal">/month</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Up to {forfait.maxRooms} rooms
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Sign Up for RoomCare.Pro</h1>
        <Progress value={(currentStep / 5) * 100} className="mb-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </Button>
              )}
              <Button type="submit">
                {currentStep === 5 ? 'Complete Signup' : 'Next'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default SignUpPage;