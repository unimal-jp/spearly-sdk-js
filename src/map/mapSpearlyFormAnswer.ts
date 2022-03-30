import { SpearlyFormAnswer, ServerSpearlyFormAnswer } from '../types'

export const mapSpearlyFormAnswer = (formAnswer: ServerSpearlyFormAnswer): SpearlyFormAnswer => {
  return {
    ...formAnswer,
    createdAt: new Date(formAnswer.createdAt),
  }
}
