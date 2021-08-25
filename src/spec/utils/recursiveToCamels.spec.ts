import { recursiveToCamels } from '../../utils'

const snakeObj = {
  id: 1,
  mail_address: 'mail@example.com',
  attrs: {
    name: 'name',
    person_in_charge: 'name_2',
    tags: ['foo', 'bar', { tag_name: 'c' }],
  },
}

const camelizeObj = {
  id: 1,
  mailAddress: 'mail@example.com',
  attrs: {
    name: 'name',
    personInCharge: 'name_2',
    tags: ['foo', 'bar', { tagName: 'c' }],
  },
}

describe('recursiveToCamels', () => {
  it('snake_case to camelCase', () => {
    expect(recursiveToCamels(snakeObj)).toEqual(camelizeObj)
  })

  it('camelCase to camelCase', () => {
    expect(recursiveToCamels(camelizeObj)).toEqual(camelizeObj)
  })
})
