import Cookies from 'js-cookie'
import { SpearlyAnalytics, SpearlyAnalyticsApiClient } from '../../spearly-analytics'

jest.mock('axios')
jest.mock('nanoid', () => {
  return { nanoid: () => 'abcd' }
})
jest.mock('../../spearly-analytics/SpearlyAnalyticsApiClient.ts')

describe('SpearlyAnalytics', () => {
  const spyMetric = jest.spyOn(SpearlyAnalyticsApiClient.prototype, 'postMetric')
  let cookiesGetMock: jest.Mock

  afterEach(() => {
    spyMetric.mockClear()
    cookiesGetMock.mockClear()
  })

  describe('pageView', () => {
    it('引数指定がない場合、初期値を使ってリクエストする', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => '')
      Cookies.get = cookiesGetMock

      const instance = new SpearlyAnalytics()
      instance.pageView({ patternName: 'b', contentId: 'content_id' })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'impressions',
        patternName: 'b',
        contentId: 'content_id',
        distinctId: 'abcd',
        sessionId: 'abcd',
        sessionIdExpiresIn: 1800,
        value: 1,
      })
    })

    it('cookieから値が取得できた場合はそちらを使用する', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => 'cookie_value')
      Cookies.get = cookiesGetMock

      const instance = new SpearlyAnalytics()
      instance.pageView({
        patternName: 'a',
        contentId: 'content_id_2',
      })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'impressions',
        patternName: 'a',
        contentId: 'content_id_2',
        distinctId: 'cookie_value',
        sessionId: 'cookie_value',
        sessionIdExpiresIn: 1800,
        value: 1,
      })
    })
  })

  describe('conversion', () => {
    it('引数指定がない場合、初期値を使ってリクエストする', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => '')
      Cookies.get = cookiesGetMock

      const instance = new SpearlyAnalytics()
      instance.conversion({ patternName: 'b', contentId: 'content_id' })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'conversions',
        patternName: 'b',
        contentId: 'content_id',
        distinctId: 'abcd',
        value: 1,
      })
    })

    it('cookieから値が取得できた場合はそちらを使用する', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => 'cookie_value')
      Cookies.get = cookiesGetMock

      const instance = new SpearlyAnalytics()
      instance.conversion({
        patternName: 'a',
        contentId: 'content_id_2',
      })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'conversions',
        patternName: 'a',
        contentId: 'content_id_2',
        distinctId: 'cookie_value',
        value: 1,
      })
    })
  })
})
