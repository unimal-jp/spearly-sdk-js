import { FormInputType } from './FormInputType'

export type FormField = {
  data?: {
    options: string[]
  }
  description: string
  identifier: string
  inputType: FormInputType
  name: string
  order: number
  required: boolean
}
