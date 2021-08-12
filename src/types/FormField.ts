export type FormField = {
  identifier: string
  name: string
  description: string
  inputType: 'text' | 'radio' | 'checkbox' | 'text_area'
  order: number
  required: boolean
  data?: {
    options: string[]
  }
}
