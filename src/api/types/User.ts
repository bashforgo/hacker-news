import { DateTime, Items, UserId } from './primitives'

export interface User {
  about: string
  created: DateTime
  delay: number
  id: UserId
  karma: number
  submitted: Items
}
