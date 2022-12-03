-- AlterTable
ALTER TABLE "List" ADD COLUMN     "icon" TEXT NOT NULL DEFAULT E'todo';

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "done" SET DEFAULT false;
