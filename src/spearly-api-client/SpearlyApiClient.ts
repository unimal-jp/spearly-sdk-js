import axios, { AxiosInstance } from 'axios'
import { recursiveToCamels, bindQueriesFromParams } from '../utils'
import { mapSpearlyList, mapSpearlyContent, mapSpearlyForm, mapSpearlyFormAnswer } from '../map'
import {
  ServerSpearlyList,
  ServerSpearlyContent,
  ServerSpearlyForm,
  ServerSpearlyFormAnswer,
  SpearlyGetParams,
} from '../types'

export type BaseHeaders = {
  Accept: string
  Authorization: string
}

export class SpearlyApiClient {
  client: AxiosInstance

  constructor(domain: string, apiKey: string) {
    this.client = axios.create({
      baseURL: `https://${domain}`,
      headers: {
        Accept: 'application/vnd.spearly.v2+json',
        Authorization: `Bearer ${apiKey}`,
      },
    })
  }

  async getRequest<T>(endpoint: string, queries = ''): Promise<T> {
    try {
      const response = await this.client.get(`${endpoint}${queries}`)
      return recursiveToCamels(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async postRequest<T>(endpoint: string, params: { [key: string]: unknown }): Promise<T> {
    try {
      const response = await this.client.post(endpoint, params)
      return recursiveToCamels(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getList(contentTypeId: string, params?: SpearlyGetParams) {
    const queries = bindQueriesFromParams(params)
    const response = await this.getRequest<ServerSpearlyList>(`/content_types/${contentTypeId}/contents`, queries)
    return mapSpearlyList(response)
  }

  async getContent(contentId: string) {
    const response = await this.getRequest<{ data: ServerSpearlyContent }>(`/contents/${contentId}`)
    return mapSpearlyContent(response.data)
  }

  async getContentPreview(contentId: string, previewToken: string) {
    const response = await this.getRequest<{ data: ServerSpearlyContent }>(
      `/contents/${contentId}`,
      `?preview_token=${previewToken}`
    )
    return mapSpearlyContent(response.data)
  }

  async getFormLatest(publicUid: string) {
    const response = await this.getRequest<{ form: ServerSpearlyForm }>(`/forms/${publicUid}/latest`)
    return mapSpearlyForm(response.form)
  }

  // eslint-disable-next-line camelcase
  async postFormAnswers(formVersionId: number, fields: { [key: string]: unknown } & { _spearly_gotcha: string }) {
    if (!('_spearly_gotcha' in fields)) throw new Error('Include "_spearly_gotcha" in the fields.')
    // eslint-disable-next-line camelcase
    const { _spearly_gotcha, ...paramFields } = fields

    const response = await this.postRequest<{ answer: ServerSpearlyFormAnswer }>('/form_answers', {
      form_version_id: formVersionId,
      fields: paramFields,
      _spearly_gotcha,
    })

    return mapSpearlyFormAnswer(response.answer)
  }
}
