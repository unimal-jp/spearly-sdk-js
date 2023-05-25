export type AnalyticsMetricRequest = {
  name: 'impression' | 'conversion'
  properties: {
    resourceType: string
    resourceId: string
    patternName: 'a' | 'b'
    value?: number
    distinctId: string
    sessionId?: string
    sessionIdExpiresIn?: number
  }
}
