import { FormInputType } from './FormInputType'

export type FormField = {
  data?: {
    options?: string[]
    allowedExtensions?: ('jpg' | 'png' | 'pdf')[]
  }
  description: string
  identifier: string
  inputType: FormInputType
  name: string
  order: number
  required: boolean
}
