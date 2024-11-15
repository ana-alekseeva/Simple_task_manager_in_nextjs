import { db } from '@/db';
import { projectTable, taskTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { TaskList } from './task-list';


export default async function Project({ params}: { params: { id: string } }) {
  const { id } = params;
  const projectId = parseInt(id);
  
  const { userId } = await auth();

  const projects = await db.select().from(projectTable).where(eq(projectTable.id, projectId));
  const project = projects[0];

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
