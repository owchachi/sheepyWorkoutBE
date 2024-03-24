import { Router } from 'express'
import { signIn } from '@handlers/user'
import { asyncHandler } from '@handlers/asyncHandler'
import { signInSchema } from '@schemas/auth.schema'
import { validateSchema } from '@middlewares/validateSchema'

export const authPublicRouter = Router()

/**
 * @openapi
 * '/sign-in':
 *  post:
 *     tags:
 *     - Auth
 *     summary: SignIn a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SingInSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignInResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
authPublicRouter.post('/sign-in', validateSchema(signInSchema), asyncHandler(signIn))
