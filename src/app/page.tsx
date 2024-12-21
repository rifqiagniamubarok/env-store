import { GetAllProject } from '@/backend/project';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ENV STORE',
  description: 'env store',
};

export default async function Home() {
  const projects = await GetAllProject();
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-secondary text-xl font-semibold">ENV STORE</p>
        <Link href={'/add'}>
          <Button>Add</Button>
        </Link>
      </div>
      <div className="mt-2">
        {projects.map((project) => {
          return (
            <div key={project.id} className="hover:bg-primary hover:text-white p-1.5 cursor-pointer ">
              <p>{project.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
