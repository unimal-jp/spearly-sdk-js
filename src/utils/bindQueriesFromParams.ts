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
