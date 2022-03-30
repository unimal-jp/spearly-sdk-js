import { SpearlyForm, ServerSpearlyForm } from '../types'

export const mapSpearlyForm = (form: ServerSpearlyForm): SpearlyForm => {
  return {
    ...form,
    startedAt: form.startedAt ? new Date(form.startedAt) : null,
    endedAt: form.endedAt ? new Date(form.endedAt) : null,
    createdAt: new Date(form.createdAt),
  }
}
