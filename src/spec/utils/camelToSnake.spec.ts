import { camelToSnake } from '../../utils'

describe('camelToSnake', () => {
  it('camelCase to snake_case', () => {
    expect(camelToSnake('camelCase')).toBe('camel_case')
  })

  it('snake_case to snake_case', () => {
    expect(camelToSnake('snake_case')).toBe('snake_case')
  })

  it('PascalCase to snake_case', () => {
    expect(camelToSnake('PascalCase')).toBe('pascal_case')
  })
})
