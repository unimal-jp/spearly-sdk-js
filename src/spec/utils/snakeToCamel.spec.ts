import { snakeToCamel } from '../../utils'

describe('snakeToCamel', () => {
  it('snake_case to camelCase', () => {
    expect(snakeToCamel('snake_case')).toBe('snakeCase')
  })

  it('camelCase to camelCase', () => {
    expect(snakeToCamel('camelCase')).toBe('camelCase')
  })

  it('PascalCase to PascalCase', () => {
    expect(snakeToCamel('PascalCase')).toBe('PascalCase')
  })
})
