import { snakeToCamel } from './snakeToCamel'

export const recursiveToCamels = <T, U>(data: T): T | U | T[] | U[] => {
  if (!data || typeof data !== 'object') return data
  if (data instanceof Date || data instanceof RegExp) return data
  if (Array.isArray(data)) {
    const array: U[] = []
    data.forEach((d) => array.push(recursiveToCamels(d)))
    return array
  }
  const returns: { [key: string]: unknown } = {}

  Object.keys(data).forEach((key) => {
    const camelCase = snakeToCamel(key)
    returns[camelCase] = recursiveToCamels((data as unknown as { [key: string]: unknown })[key])
  }, {})

  return returns as unknown as U
}
