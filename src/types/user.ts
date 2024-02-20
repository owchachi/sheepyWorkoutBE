import { Prisma } from '@prisma/client'

export type User = Prisma.UserGetPayload<null>

export interface SignInBody {
  email: string
  password: string
}

export interface CreateNewUserBody {
  email: string
  password: string
}
