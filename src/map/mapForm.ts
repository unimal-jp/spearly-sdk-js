import { Form, ServerForm } from '../types'

export const mapForm = (form: ServerForm): Form => {
  return {
    ...form,
    startedAt: form.startedAt ? new Date(form.startedAt) : null,
    endedAt: form.endedAt ? new Date(form.endedAt) : null,
    createdAt: new Date(form.createdAt),
  }
}
