export const camelToSnake = (text: string): string => {
  const upperToSnake = (str: string) => `_${str.charAt(0).toLowerCase()}`
  return text.replace(/[A-Z]/g, upperToSnake)
}
