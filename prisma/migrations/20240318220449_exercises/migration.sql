/*
  Warnings:

  - The primary key for the `UserSavedTrainingPlans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `trainingPlan_id` on the `UserSavedTrainingPlans` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserSavedTrainingPlans` table. All the data in the column will be lost.
  - Added the required column `description` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingPlanId` to the `UserSavedTrainingPlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserSavedTrainingPlans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSavedTrainingPlans" DROP CONSTRAINT "UserSavedTrainingPlans_trainingPlan_id_fkey";

-- DropForeignKey
ALTER TABLE "UserSavedTrainingPlans" DROP CONSTRAINT "UserSavedTrainingPlans_user_id_fkey";

-- AlterTable
ALTER TABLE "TrainingPlan" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "workoutLength" TIME;

-- AlterTable
ALTER TABLE "UserSavedTrainingPlans" DROP CONSTRAINT "UserSavedTrainingPlans_pkey",
DROP COLUMN "trainingPlan_id",
DROP COLUMN "user_id",
ADD COLUMN     "trainingPlanId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserSavedTrainingPlans_pkey" PRIMARY KEY ("userId", "trainingPlanId");

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseAssignedToTraining" (
    "trainingPlanId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "numOfReps" INTEGER NOT NULL,
    "numOfSeries" INTEGER NOT NULL,

    CONSTRAINT "ExerciseAssignedToTraining_pkey" PRIMARY KEY ("exerciseId","trainingPlanId")
);

-- AddForeignKey
ALTER TABLE "UserSavedTrainingPlans" ADD CONSTRAINT "UserSavedTrainingPlans_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedTrainingPlans" ADD CONSTRAINT "UserSavedTrainingPlans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAssignedToTraining" ADD CONSTRAINT "ExerciseAssignedToTraining_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAssignedToTraining" ADD CONSTRAINT "ExerciseAssignedToTraining_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
