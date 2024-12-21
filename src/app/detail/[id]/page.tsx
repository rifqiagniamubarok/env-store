import { getProjectById } from '@/backend/project';
import { Button } from '@/components/ui/button';
import { Project } from '@prisma/client';
import clsx from 'clsx';
import { Link2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const project: Project | null = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const titleStyle = 'font-semibold text-sm';

  return (
    <>
      <div className="space-y-2">
        <div>
          <p className={clsx(titleStyle)}>Project</p>
          <p className="text-lg">{project.name}</p>
        </div>
        <div>
          <p className={clsx(titleStyle)}>Link</p>
          <Link href={project.link} target="__blank" className="flex items-center gap-2 text-sky-500">
            <Link2 />
            <p className="text-lg">{project.link}</p>
          </Link>
        </div>
        <div>
          <p className={clsx(titleStyle)}>Env</p>
          <div className="p-2 border-2 border-secondary rounded-sm min-h-[200px] max-h-[300px] overflow-auto">
            <p className="text-base">{project.environments}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link href={'/'}>
          <Button className="w-full" variant={'outline'}>
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}
