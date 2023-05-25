import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AnalyticsMetricRequest } from '../types'

const BASE_URL_FALLBACK = 'analytics.spearly.com'

export class SpearlyAnalyticsApiClient {
  client: AxiosInstance

  constructor(domain = BASE_URL_FALLBACK) {
    this.client = axios.create({
      baseURL: `https://${domain}`,
    })
  }

  async postMetric(data: AnalyticsMetricRequest) {
    return await this.client.post('/metrics', {
      metric: data,
    })
  }
}
