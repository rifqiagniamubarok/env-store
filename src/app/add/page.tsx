'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createNewProject } from '@/backend/project';
import { useRouter } from 'next/navigation';
import { z, ZodError } from 'zod';

type FormInput = {
  name: string;
  link: string;
  environments: string;
};

const createProjectSchma = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  link: z.string().nonempty({ message: 'Link is required' }),
  environments: z.string().nonempty({ message: 'Environments is required' }),
});

const AddEnv = () => {
  const [error, setError] = React.useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      createProjectSchma.parse(data);
      await createNewProject(data);
      router.push('/');
    } catch (error) {
      if (error instanceof ZodError) {
        return setError(error.errors[0]?.message);
      }
      return setError('Something error, try again later');
    }
  };

  return (
    <>
      <p className="font-semibold text-xl text-center ">ADD ENVIROMENT</p>
      <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMsg message={error} />}
        <Input placeholder="Enter your project name" {...register('name')} />
        <Input placeholder="Enter your project link" {...register('link')} />
        <Textarea placeholder="Enter your env" className="min-h-[200px]" {...register('environments')} />
        <Button className="w-full " type="submit">
          ADD
        </Button>
        <div>
          <Link href={'/'}>
            <Button className="w-full" type="button" variant={'outline'}>
              Back
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

const ErrorMsg = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ duration: 0.2 }}
      className="bg-red-100 border border-red-600 text-red-600 px-2 py-1 w-full rounded-sm"
    >
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 100 }} className="text-sm">
        {message}
      </motion.p>
    </motion.div>
  );
};
export default AddEnv;
