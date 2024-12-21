'use server';

import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createProjectSchma = z.object({
  name: z.string().nonempty(),
  link: z.string().nonempty(),
  environments: z.string().nonempty(),
});

type CreateProject = {
  name: string;
  link: string;
  environments: string;
};

export const createNewProject = async (data: CreateProject) => {
  try {
    createProjectSchma.parse(data);

    const newProject = await prisma.project.create({
      data: {
        name: data.name,
        link: data.link,
        environments: data.environments,
      },
    });

    return newProject;
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      console.log(error.errors[0]);
      throw error.errors[0].message;
    }
    throw 'Something error, try again later';
  }
};

export const GetAllProject = async () => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  } catch (error) {
    throw error;
  }
};
