module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'esbuild-jest',
  },
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
}
