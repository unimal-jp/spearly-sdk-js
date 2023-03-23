import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { camelToSnake, recursiveToCamels } from '../utils'
import { mapList, mapContent, mapForm, mapFormAnswer } from '../map'
import { ServerList, ServerContent, ServerForm, ServerFormAnswer } from '../types'

const BASE_URL_FALLBACK = 'api.spearly.com'

export type BaseHeaders = {
  Accept: string
  Authorization: string
}

export type GetParams = {
  limit?: number
  offset?: number
  order?: 'desc' | 'asc'
  orderDirection?: 'desc' | 'asc'
  orderBy?: string
  orders?: {
    [key: string]: 'desc' | 'asc'
  }
  filterBy?: string
  filterValue?: string | string[]
  filterRef?: string
  filters?: {
    [key: string]: string | string[]
  }
  filterMode?: 'or' | 'and'
  rangeFrom?: Date
  rangeTo?: Date
}

export class SpearlyApiClient {
  client: AxiosInstance

  constructor(apiKey: string, domain?: string) {
    this.client = axios.create({
      baseURL: `https://${domain || BASE_URL_FALLBACK}`,
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
    } catch (error: any) {
      if (error.data) throw error.data
      if (error.response?.data) throw error.response.data
      return Promise.reject(new Error(error))
    }
  }

  async postRequest<T>(endpoint: string, params: { [key: string]: unknown }): Promise<T> {
    try {
      const response = await this.client.post(endpoint, params)
      return recursiveToCamels(response.data)
    } catch (error: any) {
      if (error.data) throw error.data
      if (error.response?.data) throw error.response.data
      return Promise.reject(new Error(error))
    }
  }

  async getList(contentTypeId: string, params?: GetParams) {
    const queries = this.bindQueriesFromParams(params)
    const response = await this.getRequest<ServerList>(`/content_types/${contentTypeId}/contents`, queries)
    return mapList(response)
  }

  async getContent(contentId: string) {
    const response = await this.getRequest<{ data: ServerContent }>(`/contents/${contentId}`)
    return mapContent(response.data)
  }

  async getContentPreview(contentId: string, previewToken: string) {
    const response = await this.getRequest<{ data: ServerContent }>(
      `/contents/${contentId}`,
      `?preview_token=${previewToken}`
    )
    return mapContent(response.data)
  }

  async getFormLatest(publicUid: string) {
    const response = await this.getRequest<{ form: ServerForm }>(`/forms/${publicUid}/latest`)
    return mapForm(response.form)
  }

  // eslint-disable-next-line camelcase
  async postFormAnswers(formVersionId: number, fields: { [key: string]: unknown } & { _spearly_gotcha: string }) {
    if (!('_spearly_gotcha' in fields)) throw new Error('Include "_spearly_gotcha" in the fields.')
    // eslint-disable-next-line camelcase
    const { _spearly_gotcha, confirmation_email, ...paramFields } = fields

    const response = await this.postRequest<{ answer: ServerFormAnswer }>('/form_answers', {
      form_version_id: formVersionId,
      fields: paramFields,
      _spearly_gotcha,
      confirmation_email,
    })

    return mapFormAnswer(response.answer)
  }

  bindQueriesFromParams(params?: GetParams): string {
    if (!params) return ''
    let queries = '?'

    Object.keys(params).forEach((param) => {
      const paramName = param as keyof GetParams
      const snakeName = camelToSnake(paramName)

      if (typeof params[paramName] === 'number') {
        queries += `${snakeName}=${String(params[paramName])}&`
      } else if (params[paramName] instanceof Date) {
        const year = (params[paramName] as Date).getFullYear()
        const month = String((params[paramName] as Date).getMonth() + 1)
        const date = String((params[paramName] as Date).getDate())
        queries += `${snakeName}=${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}&`
      } else if (paramName === 'orders') {
        const orders = params[paramName]!
        Object.keys(orders).forEach((key) => {
          queries += `order_by_${key}=${orders[key]}&`
        })
      } else if (paramName === 'filterValue' && params[paramName] && params[paramName] instanceof Array) {
        const param = params[paramName] as string[]
        param.forEach((v) => {
          queries += `filter_value[]=${v}&`
        })
      } else if (paramName === 'filters') {
        const group = params[paramName]!

        Object.keys(group).forEach((fieldId) => {
          if (group[fieldId] instanceof Array) {
            ;(group[fieldId] as string[]).forEach((v) => {
              queries += `filter_by_${fieldId}[]=${v}&`
            })
          } else {
            queries += `filter_by_${fieldId}=${group[fieldId]}&`
          }
        })
      } else {
        queries += `${snakeName}=${params[paramName]}&`
      }
    })

    return queries.slice(0, -1)
  }
}
