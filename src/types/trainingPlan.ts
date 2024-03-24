import { PaginationParams } from './common'

export interface CreateTrainingPlanBody {
  name: string
  description: string
  workoutLength?: Date
  imageUrl?: string
  isPublic: boolean
}

export interface GetPublicTrainingPlansParams extends PaginationParams {}
