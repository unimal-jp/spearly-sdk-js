import { SpearlyAnalytics, SpearlyAnalyticsApiClient } from '../../spearly-analytics'

jest.mock('axios')
jest.mock('js-cookie')
jest.mock('nanoid', () => {
  return { nanoid: () => 'abcd' }
})
jest.mock('../../spearly-analytics/SpearlyAnalyticsApiClient.ts')

describe('SpearlyAnalytics', () => {
  const instance = new SpearlyAnalytics('b', 'content_id')
  const spyMetric = jest.spyOn(SpearlyAnalyticsApiClient.prototype, 'postMetric')

  afterEach(() => {
    spyMetric.mockClear()
  })

  describe('pageView', () => {
    it('引数指定がない場合、初期値を使ってリクエストする', () => {
      instance.pageView()
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'impression',
        patternName: 'b',
        contentId: 'content_id',
        distinctId: 'abcd',
        sessionId: 'abcd',
        sessionIdExpiresIn: 1800,
        value: 1,
      })
    })

    it('引数指定がある場合、そちらを優先してリクエストする', () => {
      instance.pageView({
        patternName: 'a',
        contentId: 'content_id_2',
        expires: 3600,
      })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'impression',
        patternName: 'a',
        contentId: 'content_id_2',
        distinctId: 'abcd',
        sessionId: 'abcd',
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
      instance.conversion()
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'conversion',
        patternName: 'b',
        contentId: 'content_id',
        distinctId: 'abcd',
        value: 1,
      })
    })

    it('引数指定がある場合、そちらを優先してリクエストする', () => {
      instance.conversion({
        patternName: 'a',
        contentId: 'content_id_2',
        expires: 3600,
      })
      expect(spyMetric).toHaveBeenCalledWith({
        name: 'conversion',
        patternName: 'a',
        contentId: 'content_id_2',
        distinctId: 'abcd',
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
})
