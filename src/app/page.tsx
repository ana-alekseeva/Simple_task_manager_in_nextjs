import { ClerkProvider, SignInButton, SignedIn, SignedOut} from '@clerk/nextjs';
import './globals.css'
import * as React from 'react';
import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { ProjectList } from './project-list';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId } = await auth();
  const projects = userId
  ? await db
      .select()
      .from(projectTable)
      .where(eq(projectTable.userId, userId))
  : [];
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <div className="flex justify-center items-center h-screen">
            <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <ProjectList userId={userId!} projects={projects} />;
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}