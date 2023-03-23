import { FormField } from './FormField'

export type Form = {
  callbackUrl: string
  createdAt: Date
  description: string
  endedAt: Date | null
  fields: FormField[]
  id: number
  identifier: string
  name: string
  publicUid: string
  startedAt: Date | null
  thankYouMessage: string
  confirmationEmail: {
    enabled: boolean
    name: string
    description: string
  }
  confirmationScreen: {
    enabled: boolean
    backButtonLabel: string
    submitButtonLabel: string
  }
}

export type ServerForm = {
  createdAt: string
  endedAt: string | null
  startedAt: string | null
  confirmationEmailEnabled: boolean
  confirmationEmailName: string
  confirmationEmailDescription: string
  confirmationScreenBeforeSubmitEnabled: boolean
  backButtonLabel: string | null
  submitButtonLabel: string | null
} & Omit<Form, 'createdAt' | 'endedAt' | 'startedAt'>
