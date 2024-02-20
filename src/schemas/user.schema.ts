import { object, string } from 'zod'
import i18next from 'i18next'

const { t } = i18next

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
    email: string({
      required_error: t('field_required', { field: 'email' }),
    }).email('Not a valid email'),
    password: string({
      required_error: t('field_required', { field: 'password' }),
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }),
})
