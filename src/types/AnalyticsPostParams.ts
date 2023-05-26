import type { AnalyticsMetricRequest } from './AnalyticsMetricRequest'

export type AnalyticsPostParams = {
  patternName: AnalyticsMetricRequest['patternName']
  contentId: AnalyticsMetricRequest['contentId']
  expires?: AnalyticsMetricRequest['sessionIdExpiresIn']
}
