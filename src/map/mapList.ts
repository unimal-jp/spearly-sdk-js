import { List, ServerList } from '../types'
import { mapContent } from './mapContent'

export const mapList = (list: ServerList): List => {
  return {
    ...list,
    data: list.data.map((content) => mapContent(content)),
  }
}
