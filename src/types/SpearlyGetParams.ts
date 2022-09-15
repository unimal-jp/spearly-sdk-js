export type SpearlyGetParams = {
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
  filterMode?: 'or' | 'and'
  filters?: {
    [key: string]: string | string[]
  }
  rangeFrom?: Date
  rangeTo?: Date
}
