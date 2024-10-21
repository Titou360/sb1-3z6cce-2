'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { clearUser } from '@/lib/slices/userSlice';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    dispatch(clearUser());
    router.push('/');
  };

  const isLoginPage = pathname === '/login';

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {user.isAuthenticated && <Sidebar />}
          <Link href="/" className="text-2xl font-bold text-green-600">
            RoomCare.Pro
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          {user.isAuthenticated ? (
            <>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link href="/" className="text-gray-600 hover:text-green-600">
                Home
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-green-600">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-green-600">
                Pricing
              </Link>
              {!isLoginPage && (
                <>
                  <Button asChild variant="outline">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;