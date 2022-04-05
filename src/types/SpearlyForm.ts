import { SpearlyFormField } from './SpearlyFormField'

export type SpearlyForm = {
  callbackUrl: string
  createdAt: Date
  description: string
  endedAt: Date | null
  fields: SpearlyFormField[]
  id: number
  identifier: string
  name: string
  publicUid: string
  startedAt: Date | null
  thankYouMessage: string
}

export type ServerSpearlyForm = {
  startedAt: string | null
  endedAt: string | null
  createdAt: string
} & Omit<SpearlyForm, 'startedAt' | 'endedAt' | 'createdAt'>
