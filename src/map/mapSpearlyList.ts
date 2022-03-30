import { SpearlyList, ServerSpearlyList } from '../types'
import { mapSpearlyContent } from './mapSpearlyContent'

export const mapSpearlyList = (list: ServerSpearlyList): SpearlyList => {
  return {
    ...list,
    contents: list.contents.map((content) => mapSpearlyContent(content)),
  }
}
