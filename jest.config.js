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
  transformIgnorePatterns: ['node_modules/(?!nanoid/)'],
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
}
