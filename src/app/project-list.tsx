'use client';

import { insertProject } from '@/db/actions';
import { NewProjectModal } from './new-project-modal';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export function ProjectList({
  userId,
  projects,
}: {
  userId: string,
  projects: { id: number, name: string }[],
}) {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);

  async function handleNewProject(name: string) {
    await insertProject(userId, name);
    setShowModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out"
      >
        Add New Project
      </button>

      {projects.map((project) => (
          <div
            key={project.id} 
            className="flex items-center justify-between bg-white p-4 
    rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 
    ease-in-out">
            <span className="text-lg font-semibold text-gray-800 hover:text
    blue-500 transition-colors duration-150 ease-in-out">
                {project.name}
            </span>
          </div>
        ))}

      {showModal && (
        <NewProjectModal onSubmit={handleNewProject} onClose={() => setShowModal(true)} />
      )}
    </div>
  );
}
