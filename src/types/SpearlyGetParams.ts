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
