export type AnalyticsMetricRequest = {
  name: 'impressions' | 'conversions'
  contentId: string
  patternName: 'a' | 'b'
  value?: number
  distinctId: string
  sessionId?: string
  sessionIdExpiresIn?: number
}
