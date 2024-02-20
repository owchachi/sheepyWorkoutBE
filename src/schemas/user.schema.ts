import { object, string } from 'zod'
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserSchema:
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
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        email:
 *          type: string
 *        createdAt:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    email: string().email(),
    password: string().min(6),
  }),
})
