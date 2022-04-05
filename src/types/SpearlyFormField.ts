export type SpearlyFormField = {
  data?: {
    options: string[]
  }
  description: string
  identifier: string
  inputType: 'text' | 'radio' | 'checkbox' | 'text_area'
  name: string
  order: number
  required: boolean
}
