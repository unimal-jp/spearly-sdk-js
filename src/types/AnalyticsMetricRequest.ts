export type AnalyticsMetricRequest = {
  name: 'impression' | 'conversion'
  contentId: string
  patternName: 'a' | 'b'
  value?: number
  distinctId: string
  sessionId?: string
  sessionIdExpiresIn?: number
}
