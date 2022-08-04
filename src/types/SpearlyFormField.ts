import { SpearlyFormInputType } from './SpearlyFormInputType'

export type SpearlyFormField = {
  data?: {
    options: string[]
  }
  description: string
  identifier: string
  inputType: SpearlyFormInputType
  name: string
  order: number
  required: boolean
}
