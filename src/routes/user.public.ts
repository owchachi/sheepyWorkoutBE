import { createUserSchema } from '@schemas/user.schema'
import { validateSchema } from '@middlewares/validateSchema'
import { Router } from 'express'
import { createNewUser } from '@handlers/user'
import { asyncHandler } from '@handlers/asyncHandler'

export const userPublicRouter = Router()

/**
 * @openapi
 * '/user':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
userPublicRouter.post('/user', validateSchema(createUserSchema), asyncHandler(createNewUser))
