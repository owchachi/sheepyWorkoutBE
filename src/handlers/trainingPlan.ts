import prisma from 'db'
import { CreateTrainingPlanBody, GetPublicTrainingPlansParams } from '@type/trainingPlan'
import { RequestHandler } from 'express'

export const createTrainingPlan: RequestHandler<object, object, CreateTrainingPlanBody> = async (
  req,
  res,
) => {
  const trainingPlan = await prisma.trainingPlan.create({
    data: {
      createdById: req.user.id,
      name: req.body.name,
      description: req.body.name,
      workoutLength: req.body.workoutLength,
      imageUrl: req.body.imageUrl,
      isPublic: req.body.isPublic,
    },
  })
  res.json(trainingPlan)
}

export const getPublicTrainingPlans: RequestHandler<
  object,
  object,
  object,
  GetPublicTrainingPlansParams
> = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize)
  const pageNumber = parseInt(req.query.pageNumber)
  const [count, trainingPlans] = await prisma.$transaction([
    prisma.trainingPlan.count(),
    prisma.trainingPlan.findMany({
      skip: pageNumber - 1 <= 0 ? 0 : (pageNumber - 1) * pageSize,
      take: pageSize,
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        workoutLength: true,
        isPublic: true,
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    }),
  ])
  res.json({
    pagination: {
      pageSize: pageSize,
      pageNumber: pageNumber,
      totalCount: count,
    },
    data: trainingPlans,
  })
}
