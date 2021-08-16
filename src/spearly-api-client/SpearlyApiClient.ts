import fetch from 'node-fetch'
import { camelToSnake, recursiveToCamels } from '../utils'
import { List, Content, Form, FormAnswer } from '../types'

export type BaseHeaders = {
  Authorization: string
}

export type GetParams = {
  limit?: number
  offset?: number
  order?: 'desc' | 'asc'
  orderDirection?: 'desc' | 'asc'
  orderBy?: 'latest' | 'popular'
  filterBy?: string
  filterValue?: string
  filterRef?: string
  rangeFrom?: Date
  rangeTo?: Date
}

export class SpearlyApiClient {
  baseURL: string
  baseHeaders: BaseHeaders = {
    Authorization: '',
  }

  constructor(domain: string, version: string, apiKey: string) {
    this.baseURL = `https://${domain}/api/${version}`
    this.baseHeaders.Authorization = `Bearer ${apiKey}`
  }

  async getRequest<T>(endpoint: string, queries = ''): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}${queries}`, { headers: this.baseHeaders })
      if (!response.ok) throw new Error(`${response.status}`)

      return response.json().then((data) => data as T)
    } catch (error) {
      if (error.data) throw error.data
      if (error.response?.data) throw error.response.data
      return Promise.reject(new Error(error))
    }
  }

  async postRequest<T>(endpoint: string, params: { [key: string]: unknown }): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { ...this.baseHeaders, 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error(`${response.status}`)

      return response.json().then((data) => data as T)
    } catch (error) {
      if (error.data) throw error.data
      if (error.response?.data) throw error.response.data
      return Promise.reject(new Error(error))
    }
  }

  async getList(contentTypeId: string, params?: GetParams) {
    const queries = this.bindQueriesFromParams(params)
    const response = await this.getRequest<List>(`/content_types/${contentTypeId}/contents`, queries)
    return recursiveToCamels<List, List>(response)
  }

  async getContent(contentId: string) {
    const response = await this.getRequest<Content>(`/contents/${contentId}`)
    return recursiveToCamels<Content, Content>(response)
  }

  async getFormLatest(publicUid: string) {
    const response = await this.getRequest<Form>(`/forms/${publicUid}/latest`)
    return recursiveToCamels<Form, Form>(response)
  }

  // eslint-disable-next-line
  async postFormAnswers(formVersionId: number, fields: { [key: string]: unknown } & { _spearly_gotcha: string }) {
    if (!('_spearly_gotcha' in fields)) throw new Error('Include "_spearly_gotcha" in the fields.')
    // eslint-disable-next-line
    const { _spearly_gotcha, ...paramFields } = fields

    const response = await this.postRequest<FormAnswer>('/form_answers', {
      form_version_id: formVersionId,
      fields: paramFields,
      _spearly_gotcha,
    })

    return recursiveToCamels<FormAnswer, FormAnswer>(response)
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
      } else {
        queries += `${snakeName}=${params[paramName]}&`
      }
    })

    return queries
  }
}
