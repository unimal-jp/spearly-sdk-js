import Cookies from 'js-cookie'
import { nanoid } from 'nanoid'
import type { AnalyticsPostParams } from '../types'
import { SpearlyAnalyticsApiClient } from './SpearlyAnalyticsApiClient'

export class SpearlyAnalytics {
  client: SpearlyAnalyticsApiClient
  distinctId: string
  sessionId: string

  constructor(domain?: string) {
    this.client = new SpearlyAnalyticsApiClient(domain)
    this.distinctId = this.setDistinctId()
    this.sessionId = this.setSessionId()
  }

  async pageView(params: AnalyticsPostParams) {
    const patternName = params.patternName
    const contentId = params.contentId
    const sessionExpires = params?.expires || 1800

    // MEMO: update distinct_id expires
    this.setDistinctId()

    // MEMO: update session_id expires
    this.setSessionId()

    await this.client.postMetric({
      name: 'impressions',
      contentId,
      patternName,
      value: 1,
      distinctId: this.distinctId,
      sessionId: this.sessionId,
      sessionIdExpiresIn: sessionExpires,
    })
  }

  async conversion(params: AnalyticsPostParams) {
    const patternName = params.patternName
    const contentId = params.contentId

    // MEMO: update distinct_id expires
    this.setDistinctId()

    await this.client.postMetric({
      name: 'conversions',
      contentId,
      patternName,
      value: 1,
      distinctId: this.distinctId,
    })
  }

  private setDistinctId() {
    const distinctId = this.getCookie('spearly_distinct_id') || nanoid()
    const distinctIdExpires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).getTime()
    this.setCookie('spearly_distinct_id', distinctId, distinctIdExpires)
    return distinctId
  }

  private setSessionId(expires = 1800) {
    const sessionId = this.getCookie('spearly_session_id') || nanoid()
    const sessionIdExpires = new Date(Date.now() + expires * 1000).getTime()
    this.setCookie('spearly_session_id', sessionId, sessionIdExpires)
    return sessionId
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
