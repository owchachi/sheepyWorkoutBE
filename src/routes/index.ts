import { trainingPlanPrivateRouter } from './trainingPlan.private'
import { Router } from 'express'
import { authPublicRouter } from './auth.public'
import { userPublicRouter } from './user.public'

const privateRouter = Router()
privateRouter.use([trainingPlanPrivateRouter])
const publicRouter = Router()
publicRouter.use([authPublicRouter, userPublicRouter])

export { privateRouter, publicRouter }
