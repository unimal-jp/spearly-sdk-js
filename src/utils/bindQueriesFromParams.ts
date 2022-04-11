import { SpearlyGetParams } from '../types'
import { camelToSnake } from './'

export const bindQueriesFromParams = (params?: SpearlyGetParams): string => {
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
