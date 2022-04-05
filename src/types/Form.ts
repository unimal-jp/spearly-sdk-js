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
}

export type ServerForm = {
  createdAt: string
  endedAt: string | null
  startedAt: string | null
} & Omit<Form, 'createdAt' | 'endedAt' | 'startedAt'>
