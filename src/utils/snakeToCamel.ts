export const snakeToCamel = (text: string) => {
  const snakeToUpper = (str: string) => str.charAt(1).toUpperCase()
  return text.replace(/_./g, snakeToUpper)
}
