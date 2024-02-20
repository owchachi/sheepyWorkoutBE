import { object, string } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    SingInSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    SignInResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 */

export const signInSchema = object({
  body: object({
    email: string().email(),
    password: string(),
  }),
})
