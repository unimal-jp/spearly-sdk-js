import { FormAnswer, ServerFormAnswer } from '../types'

export const mapFormAnswer = (formAnswer: ServerFormAnswer): FormAnswer => {
  return {
    ...formAnswer,
    createdAt: new Date(formAnswer.createdAt),
  }
}
