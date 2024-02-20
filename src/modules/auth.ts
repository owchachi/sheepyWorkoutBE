import jwt from 'jsonwebtoken'
import { User } from '@type/user'
import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: string
      username: string
    }
  }
}

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user: User) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
  return token
}

export const protect: RequestHandler = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({ message: req.t('not_authorized') })
    return
  }

  const [_, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.json({ message: req.t('invalid_token') })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    res.status(401)
    res.json({ message: req.t('invalid_token') })
    return
  }
}
