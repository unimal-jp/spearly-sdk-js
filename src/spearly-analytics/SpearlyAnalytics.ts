import Cookies from 'js-cookie'
import { nanoid } from 'nanoid'
import type { AnalyticsPostParams } from '../types'
import { SpearlyAnalyticsApiClient } from './SpearlyAnalyticsApiClient'

export class SpearlyAnalytics {
  client: SpearlyAnalyticsApiClient

  constructor(domain?: string) {
    this.client = new SpearlyAnalyticsApiClient(domain)
  }

  async pageView(params: AnalyticsPostParams) {
    const patternName = params.patternName
    const contentId = params.contentId
    const sessionExpires = params?.expires || 1800

    const distinctId = this.distinctId || nanoid()
    const sessionId = this.sessionId || nanoid()

    // MEMO: update distinct_id expires
    const distinctIdExpires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime()
    this.setCookie('spearly_distinct_id', distinctId, distinctIdExpires)

    // MEMO: update session_id expires
    const sessionIdExpires = new Date(Date.now() + sessionExpires * 1000).getTime()
    this.setCookie('spearly_session_id', sessionId, sessionIdExpires)

    await this.client.postMetric({
      name: 'impressions',
      contentId,
      patternName,
      value: 1,
      distinctId,
      sessionId,
      sessionIdExpiresIn: sessionExpires,
    })
  }

  async conversion(params: AnalyticsPostParams) {
    const patternName = params.patternName
    const contentId = params.contentId

    const distinctId = this.getCookie('spearly_distinct_id') || nanoid()

    // MEMO: update distinct_id expires
    const distinctIdExpires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime()
    this.setCookie('spearly_distinct_id', distinctId, distinctIdExpires)

    await this.client.postMetric({
      name: 'conversions',
      contentId,
      patternName,
      value: 1,
      distinctId,
    })
  }

  get distinctId() {
    return this.getCookie('spearly_distinct_id')
  }

  get sessionId() {
    return this.getCookie('spearly_session_id')
  }

  private setCookie(name: string, body: string, expires: number) {
    Cookies.set(name, body, {
      expires,
      path: '/',
    })
  }

  private getCookie(name: string) {
    return Cookies.get(name)
  }
}
