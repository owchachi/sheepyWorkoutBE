import prisma from 'db'
import { hashPassword, createJWT, comparePasswords } from '@modules/auth'
import { CreateNewUserBody, SignInBody } from '@type/user'
import { RequestHandler } from 'express'

export const createNewUser: RequestHandler<object, object, CreateNewUserBody> = async (
  req,
  res,
) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: (await hashPassword(req.body.password)) as string,
    },
  })
  const token = createJWT(user)
  res.json({ token })
}

export const signIn: RequestHandler<object, object, SignInBody> = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })
  if (!user) {
    res.status(401)
    res.json({ message: req.t('user_credentials_invalid') })
    return
  }

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: req.t('user_credentials_invalid') })
    return
  }

  const token = createJWT(user)
  res.json({ token })
}
