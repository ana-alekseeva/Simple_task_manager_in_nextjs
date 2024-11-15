import { ClerkProvider, UserButton } from '@clerk/nextjs';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Easy Opus',
  description: 'A simple task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode 
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="bg-blue-600 bg-opacity-70 text-white p-4 shadow-md flex items-center justify-between">
            <div className="flex justify-center w-full">
              <Link href="/" className="text-lg font-bold">
               easy-opus
              </Link>
            </div>
            <div className="absolute right-4">
              <UserButton />
            </div>
          </nav>
          <>{children}</>
        </body>
      </html>
    </ClerkProvider>
 );
}
