export type SpearlyFormAnswer = {
  formVersionId: number
  formPublicUid: string
  data: {
    ipAddress: string
    userAgent: string
  }
  createdAt: Date
}

export type ServerSpearlyFormAnswer = { createdAt: string } & Omit<SpearlyFormAnswer, 'createdAt'>
