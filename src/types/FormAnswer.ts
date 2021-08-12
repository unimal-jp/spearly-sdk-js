export type FormAnswer = {
  formVersionId: number
  formPublicUid: string
  data: {
    ipAddress: string
    userAgent: string
  }
  createdAt: Date
}
