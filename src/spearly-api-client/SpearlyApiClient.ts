import axios, { AxiosInstance } from 'axios'
import { camelToSnake, recursiveToCamels } from '../utils'
import { mapSpearlyList, mapSpearlyContent, mapSpearlyForm, mapSpearlyFormAnswer } from '../map'
import { ServerSpearlyList, ServerSpearlyContent, ServerSpearlyForm, ServerSpearlyFormAnswer } from '../types'

export type BaseHeaders = {
  Authorization: string
}

export type SpearlyGetParams = {
  limit?: number
  offset?: number
  order?: 'desc' | 'asc'
  orderDirection?: 'desc' | 'asc'
  orderBy?: string
  filterBy?: string
  filterValue?: string
  filterRef?: string
  rangeFrom?: Date
  rangeTo?: Date
}

export class SpearlyApiClient {
  client: AxiosInstance

  constructor(domain: string, version: string, apiKey: string) {
    this.client = axios.create({
      baseURL: `https://${domain}/api/${version}`,
      headers: {
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
    const queries = this.bindQueriesFromParams(params)
    const response = await this.getRequest<ServerSpearlyList>(`/content_types/${contentTypeId}/contents`, queries)
    return mapSpearlyList(response)
  }

  async getContent(contentId: string) {
    const response = await this.getRequest<ServerSpearlyContent>(`/contents/${contentId}`)
    return mapSpearlyContent(response)
  }

  async getContentPreview(contentId: string, previewToken: string) {
    const response = await this.getRequest<ServerSpearlyContent>(
      `/contents/${contentId}`,
      `?preview_token=${previewToken}`
    )
    return mapSpearlyContent(response)
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

  bindQueriesFromParams(params?: SpearlyGetParams): string {
    if (!params) return ''
    let queries = '?'

    Object.keys(params).forEach((param) => {
      const paramName = param as keyof SpearlyGetParams
      const snakeName = camelToSnake(paramName)

      if (typeof params[paramName] === 'number') {
        queries += `${snakeName}=${String(params[paramName])}&`
      } else if (params[paramName] instanceof Date) {
        const year = (params[paramName] as Date).getFullYear()
        const month = String((params[paramName] as Date).getMonth() + 1)
        const date = String((params[paramName] as Date).getDate())
        queries += `${snakeName}=${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}&`
      } else {
        queries += `${snakeName}=${params[paramName]}&`
      }
    })

    return queries.slice(0, -1)
  }
}
