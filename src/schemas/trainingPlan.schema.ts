import { object, string } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    TrainingPlanSchema:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: full body workout
 *        description:
 *          type: string
 *          default: some kind of description
 *        workoutLength:
 *          type: string
 *        isPublic:
 *          type: boolean
 *        imageUrl:
 *          type: boolean
 *    TrainingPlanResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *        imageUrl:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        isPublic:
 *          type: boolean
 *        workoutLength:
 *          type: string
 *        createdById:
 *          type: string
 */

export const trainingPlanSchema = object({
  body: object({
    name: string(),
    description: string(),
    workoutLength: string().datetime().optional(),
  }),
})

/**
 * @openapi
 * components:
 *  schemas:
 *    PublicTrainingPlansResponse:
 *      type: object
 *      properties:
 *        pagination:
 *          type: object
 *          properties:
 *            pageSize:
 *              type: integer
 *            pageNumber:
 *              type: integer
 *            totalCount:
 *              type: integer
 *        data:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              workoutLength:
 *                type: string
 *              isPublic:
 *                type: boolean
 *              createdBy:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 */

export const publicTrainingPlansSchema = object({
  query: object({
    pageNumber: string(),
    pageSize: string(),
  }),
})
