import { SpearlyFormField } from './SpearlyFormField'

export type SpearlyForm = {
  id: number
  publicUid: string
  identifier: string
  name: string
  description: string
  thankYouMessage: string
  fields: SpearlyFormField[]
  callbackUrl: string
  startedAt: Date | null
  endedAt: Date | null
  createdAt: Date
}

export type ServerSpearlyForm = {
  startedAt: string | null
  endedAt: string | null
  createdAt: string
} & Omit<SpearlyForm, 'startedAt' | 'endedAt' | 'createdAt'>
