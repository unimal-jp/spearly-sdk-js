import { SpearlyApiClient } from '../../spearly-api-client'

const serverContent = {
  attributes: {
    contentAlias: 'content_1',
    createdAt: '2021-08-01 00:00:00',
    fields: {
      data: [
        {
          attributes: {
            identifier: 'title',
            inputType: 'text',
            value: 'title',
          },
          id: '1',
          type: 'field',
        },
        {
          attributes: {
            identifier: 'description',
            inputType: 'text',
            value: 'description',
          },
        },
      ],
    },
    publicUid: 'content_1',
    publishedAt: '2021-08-01 00:00:00',
    updatedAt: '2021-08-01 00:00:00',
  },
  values: {
    title: 'title',
    descritpion: 'description',
  },
} as const

const serverList = {
  totalContentsCount: 50,
  matchingContentsCount: 10,
  limit: 10,
  offset: 0,
  next: 11,
  data: [serverContent],
} as const

const content = {
  attributes: {
    contentAlias: 'content_1',
    createdAt: new Date('2021-08-01 00:00:00'),
    fields: {
      data: [
        {
          attributes: {
            identifier: 'title',
            inputType: 'text',
            value: 'title',
          },
          id: '1',
          type: 'field',
        },
        {
          attributes: {
            identifier: 'description',
            inputType: 'text',
            value: 'description',
          },
        },
      ],
    },
    publicUid: 'content_1',
    publishedAt: new Date('2021-08-01 00:00:00'),
    updatedAt: new Date('2021-08-01 00:00:00'),
  },
  values: {
    title: 'title',
    descritpion: 'description',
  },
} as const

const list = {
  totalContentsCount: 50,
  matchingContentsCount: 10,
  limit: 10,
  offset: 0,
  next: 11,
  data: [content],
} as const

const serverLatestForm = {
  id: 1,
  publicUid: '',
  identifier: '',
  name: '',
  description: '',
  thankYouMessage: '',
  fields: [
    {
      identifier: 'name',
      name: '名前',
      description: '',
      inputType: 'text',
      order: 0,
      required: true,
      options: [],
    },
  ],
  callbackUrl: '',
  startedAt: '2021-08-01 00:00:00',
  endedAt: '2021-08-01 00:00:00',
  createdAt: '2021-08-01 00:00:00',
} as const

const latestForm = {
  id: 1,
  publicUid: '',
  identifier: '',
  name: '',
  description: '',
  thankYouMessage: '',
  fields: [
    {
      identifier: 'name',
      name: '名前',
      description: '',
      inputType: 'text',
      order: 0,
      required: true,
      options: [],
    },
  ],
  callbackUrl: '',
  startedAt: new Date('2021-08-01 00:00:00'),
  endedAt: new Date('2021-08-01 00:00:00'),
  createdAt: new Date('2021-08-01 00:00:00'),
} as const

const serverFormAnswer = {
  formVersionId: 1,
  formPublicUid: 'form_id',
  data: {
    ipAddress: '127.0.0.1',
    userAgent: 'ua',
  },
  createdAt: '2021-08-01 00:00:00',
} as const

const formAnswer = {
  formVersionId: 1,
  formPublicUid: 'form_id',
  data: {
    ipAddress: '127.0.0.1',
    userAgent: 'ua',
  },
  createdAt: new Date('2021-08-01 00:00:00'),
} as const

describe('SpearlyApiClient', () => {
  let apiClient: SpearlyApiClient

  beforeEach(() => {
    apiClient = new SpearlyApiClient('papi.spearly.app', 'API_KEY')
  })

  describe('APIへのアクセスポイント', () => {
    let spyRequest: jest.SpyInstance

    describe('getList: コンテンツリストの取得', () => {
      beforeEach(() => {
        spyRequest = jest.spyOn(SpearlyApiClient.prototype, 'getRequest').mockReturnValue(Promise.resolve(serverList))
      })

      afterEach(() => {
        spyRequest.mockClear()
      })

      it('APIレスポンスが正常系であればListにマッピングされたデータが取得することができる', async () => {
        const res = await apiClient.getList('content_type_id')
        expect(spyRequest).toHaveBeenCalledWith('/content_types/content_type_id/contents', '')
        expect(res).toEqual(list)
      })

      it('paramsを指定している場合は送信可能なクエリでリクエストする', () => {
        apiClient.getList('content_type_id', { limit: 5, offset: 6 })
        expect(spyRequest).toHaveBeenCalledWith('/content_types/content_type_id/contents', '?limit=5&offset=6')
      })
    })

    describe('getContent: コンテンツの取得', () => {
      it('APIレスポンスが正常系であればContentにマッピングされたデータが取得することができる', async () => {
        spyRequest = jest
          .spyOn(SpearlyApiClient.prototype, 'getRequest')
          .mockReturnValue(Promise.resolve({ data: serverContent }))

        const res = await apiClient.getContent('content_id')
        expect(spyRequest).toHaveBeenCalledWith('/contents/content_id')
        expect(res).toEqual(content)
      })
    })

    describe('getFormLatest: フォームの取得', () => {
      it('APIレスポンスが正常系であればFormにマッピングされたデータが取得することができる', async () => {
        spyRequest = jest
          .spyOn(SpearlyApiClient.prototype, 'getRequest')
          .mockReturnValue(Promise.resolve({ form: serverLatestForm }))

        const res = await apiClient.getFormLatest('public_uid')
        expect(spyRequest).toHaveBeenCalledWith('/forms/public_uid/latest')
        expect(res).toEqual(latestForm)
      })
    })

    describe('postFormAnswers: フォームの送信', () => {
      beforeEach(() => {
        spyRequest = jest
          .spyOn(SpearlyApiClient.prototype, 'postRequest')
          .mockReturnValue(Promise.resolve({ answer: serverFormAnswer }))
      })

      it('APIレスポンスが正常系であればFormAnswerにマッピングされたデータが取得することができる', async () => {
        const res = await apiClient.postFormAnswers(1, { name: 'name', content: 'content', _spearly_gotcha: '' })
        expect(spyRequest).toHaveBeenCalledWith('/form_answers', {
          form_version_id: 1,
          fields: { name: 'name', content: 'content' },
          _spearly_gotcha: '',
        })
        expect(res).toEqual(formAnswer)
      })
    })
  })
})
