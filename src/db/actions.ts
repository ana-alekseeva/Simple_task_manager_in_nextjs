'use server';

import { db } from '.';
import { projectTable, taskTable } from './schema';

export async function insertProject(userId: string, name: string) {
  await db.insert(projectTable).values({ userId, name });
}

export async function insertTask(title: string, description: string, projectId: number) {
  await db.insert(taskTable).values({ title, description, status: 'inprogress', projectId });
}
