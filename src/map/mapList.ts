import { List, ServerList } from '../types'
import { mapContent } from './mapContent'

export const mapList = (list: ServerList): List => {
  return {
    ...list,
    contents: list.contents.map((content) => mapContent(content)),
  }
}
