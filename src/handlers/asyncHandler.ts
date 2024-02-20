import { Prisma } from '@prisma/client'
import { ErrorType } from '@type/enums'

import { RequestHandler, Request, Response, NextFunction } from 'express'

interface ErrorWithType extends Error {
  type: ErrorType
}

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((e: ErrorWithType) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        e.type = ErrorType.PRISMA
        if (e.code === 'P2002') {
          const metaTarget = (e.meta?.target as string[]) || undefined
          e.message = req.t('fields_unique', {
            fields: metaTarget ? metaTarget.join(', ') : '',
          })
        }
        return next(e)
      }
      e.type = ErrorType.INPUT
      next(e)
    })
