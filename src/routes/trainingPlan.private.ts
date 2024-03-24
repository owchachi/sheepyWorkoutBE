import { Router } from 'express'
import { createTrainingPlan, getPublicTrainingPlans } from '@handlers/trainingPlan'
import { asyncHandler } from '@handlers/asyncHandler'
import { trainingPlanSchema, publicTrainingPlansSchema } from '@schemas/trainingPlan.schema'
import { validateSchema } from '@middlewares/validateSchema'

export const trainingPlanPrivateRouter = Router()

/**
 * @openapi
 * '/training-plan':
 *  post:
 *     tags:
 *     - TrainingPlan
 *     summary: Create training plan
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/TrainingPlanSchema'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TrainingPlanResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
trainingPlanPrivateRouter.post(
  '/training-plan',
  validateSchema(trainingPlanSchema),
  asyncHandler(createTrainingPlan),
)

/**
 * @openapi
 * '/public-training-plans':
 *  get:
 *     tags:
 *     - TrainingPlan
 *     summary: Get public training plans
 *     parameters:
 *     - in: query
 *       name: pageNumber
 *       type: integer
 *     - in: query
 *       name: pageSize
 *       type: integer
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PublicTrainingPlansResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
trainingPlanPrivateRouter.get(
  '/public-training-plans',
  validateSchema(publicTrainingPlansSchema),
  asyncHandler(getPublicTrainingPlans),
)
