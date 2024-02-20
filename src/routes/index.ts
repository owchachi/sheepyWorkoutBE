import { Router } from 'express'
import { authPublicRouter } from './auth.public'
import { userPublicRouter } from './user.public'

const privateRouter = Router()
const publicRouter = Router()
publicRouter.use([authPublicRouter, userPublicRouter])

export { privateRouter, publicRouter }
