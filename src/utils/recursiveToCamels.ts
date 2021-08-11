import { snakeToCamel } from './snakeToCamel'

type AnyObject = {
  [index: string]: unknown
}

export const recursiveToCamels = (data: AnyObject) => {
  const convertedData: AnyObject = {}

  if (Array.isArray(data)) {
    const convertedArrayData: unknown[] = []

    data.forEach((d) => {
      if (typeof d === 'object') {
        convertedArrayData.push(recursiveToCamels(d))
      }
    })

    return convertedArrayData.length ? convertedArrayData : data
  }

  for (const key in data) {
    const camelKey = snakeToCamel(key)
    convertedData[camelKey] = data[key]

    if (typeof data[key] === 'object') {
      if (Array.isArray(data)) continue
      convertedData[camelKey] = recursiveToCamels(convertedData[camelKey] as AnyObject)
    }
  }

  return convertedData
}
