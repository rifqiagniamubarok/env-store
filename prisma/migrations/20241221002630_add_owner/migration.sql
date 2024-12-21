-- CreateEnum
CREATE TYPE "Owner" AS ENUM ('personal', 'smp');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "owner" "Owner" NOT NULL DEFAULT 'personal';
