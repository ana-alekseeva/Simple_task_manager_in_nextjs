import { db } from '@/db';
import { projectTable, taskTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { TaskList } from './task-list';

type Params = Promise<{ id: string }> // Adjust the type to match the expected parameter

export default async function Project({ params }: { params: Params}) {
  const { id } = await params;
  const projectId = parseInt(id, 10);

  if (isNaN(projectId)) {
    return <h1>Invalid project ID</h1>;
  }
  
  const { userId } = await auth();

  const projects = await db.select().from(projectTable).where(eq(projectTable.id, projectId));
  const project = projects[0];

  // Check if the project exists
  if (!project) {
    return <h1>Project not found</h1>; // Return a message if the project doesn't exist
  }

  if (project.userId !== userId) {
    return <h1>Not allowed to access project</h1>;
  }

  const tasks = await db.select().from(taskTable).where(eq(taskTable.projectId, projectId));

  return (
    <div>
      <TaskList projectId={projectId} tasks={tasks} />;
    </div>
  );
}
