import { FormField } from './FormField'

export type Form = {
  id: number
  publicUid: string
  identifier: string
  name: string
  description: string
  thankYouMessage: string
  fields: FormField[]
  callbackUrl: string
  startedAt: Date | null
  endedAt: Date | null
  createdAt: Date
}

export type ServerForm = {
  startedAt: string | null
  endedAt: string | null
  createdAt: string
} & Omit<Form, 'startedAt' | 'endedAt' | 'createdAt'>
