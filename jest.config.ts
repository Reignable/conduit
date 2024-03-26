export default {
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  testEnvironment: '@happy-dom/jest-environment',
  prettierPath: null,
  moduleNameMapper: {
    '^@state': '<rootDir>/src/app/state',
    '^@mocks': '<rootDir>/src/mocks',
  },
}
