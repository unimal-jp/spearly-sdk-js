import { SpearlyFormInputType } from './SpearlyFormInputType'

export type SpearlyFormField = {
  data?: {
    options?: string[]
    allowedExtensions?: ('jpg' | 'png' | 'pdf')[]
  }
  description: string
  identifier: string
  inputType: SpearlyFormInputType
  name: string
  order: number
  required: boolean
}
