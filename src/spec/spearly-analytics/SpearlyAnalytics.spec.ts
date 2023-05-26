import Cookies from 'js-cookie'
import { SpearlyAnalytics, SpearlyAnalyticsApiClient } from '../../spearly-analytics'

jest.mock('axios')
jest.mock('nanoid', () => {
  return { nanoid: () => 'abcd' }
})
jest.mock('../../spearly-analytics/SpearlyAnalyticsApiClient.ts')

describe('SpearlyAnalytics', () => {
  const instance = new SpearlyAnalytics('b', 'content_id')
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
      instance.pageView()
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

    it('引数指定がある場合、そちらを優先してリクエストする', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => 'cookie_value')
      Cookies.get = cookiesGetMock
      instance.pageView({
        patternName: 'a',
        contentId: 'content_id_2',
        expires: 3600,
      })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'impressions',
        patternName: 'a',
        contentId: 'content_id_2',
        distinctId: 'cookie_value',
        sessionId: 'cookie_value',
        sessionIdExpiresIn: 3600,
        value: 1,
      })
    })

    it('patternNameが指定されていない場合、リクエストは行われない', () => {
      const wrongInstance = new SpearlyAnalytics('', '')
      jest.spyOn(console, 'error').mockImplementation()
      wrongInstance.pageView()
      expect(spyMetric).not.toHaveBeenCalled()
    })
  })

  describe('conversion', () => {
    it('引数指定がない場合、初期値を使ってリクエストする', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => '')
      Cookies.get = cookiesGetMock
      instance.conversion()
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'conversions',
        patternName: 'b',
        contentId: 'content_id',
        distinctId: 'abcd',
        value: 1,
      })
    })

    it('引数指定がある場合、そちらを優先してリクエストする', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => 'cookie_value')
      Cookies.get = cookiesGetMock
      instance.conversion({
        patternName: 'a',
        contentId: 'content_id_2',
        expires: 3600,
      })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'conversions',
        patternName: 'a',
        contentId: 'content_id_2',
        distinctId: 'cookie_value',
        value: 1,
      })
    })

    it('patternNameが指定されていない場合、リクエストは行われない', () => {
      const wrongInstance = new SpearlyAnalytics('', '')
      jest.spyOn(console, 'error').mockImplementation()
      wrongInstance.conversion()
      expect(spyMetric).not.toHaveBeenCalled()
    })
  })

  describe('idの取得', () => {
    it('distinctIdの取得', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => 'distinct_value')
      Cookies.get = cookiesGetMock
      expect(instance.distinctId).toBe('distinct_value')
    })

    it('sessionIdの取得', () => {
      cookiesGetMock = jest.fn().mockImplementation(() => 'session_value')
      Cookies.get = cookiesGetMock
      expect(instance.sessionId).toBe('session_value')
    })
  })
})
