import { Form, ServerForm } from '../types'

export const mapForm = (form: ServerForm): Form => {
  const {
    confirmationEmailEnabled,
    confirmationEmailName,
    confirmationEmailDescription,
    confirmationScreenBeforeSubmitEnabled,
    backButtonLabel,
    submitButtonLabel,
    ...others
  } = form

  return {
    ...others,
    startedAt: form.startedAt ? new Date(form.startedAt) : null,
    endedAt: form.endedAt ? new Date(form.endedAt) : null,
    createdAt: new Date(form.createdAt),
    confirmationEmail: {
      enabled: confirmationEmailEnabled,
      name: confirmationEmailName,
      description: confirmationEmailDescription,
    },
    confirmationScreen: {
      enabled: confirmationScreenBeforeSubmitEnabled,
      backButtonLabel: backButtonLabel || '',
      submitButtonLabel: submitButtonLabel || '',
    },
  }
}
