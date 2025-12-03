module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@ui-kit(.*)$': '<rootDir>/packages/ui-kit$1',
    '^@shared-state(.*)$': '<rootDir>/packages/shared-state$1',
    '^@shared-utils(.*)$': '<rootDir>/packages/shared-utils$1',
    '^@design-tokens(.*)$': '<rootDir>/packages/design-tokens$1',
    '^@config(.*)$': '<rootDir>/packages/config$1',
    '^@api-client(.*)$': '<rootDir>/packages/api-client$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/apps/',
  ],
  collectCoverageFrom: [
    'packages/**/*.ts',
    'packages/**/*.tsx',
    '!packages/**/*.d.ts',
    '!packages/**/node_modules/**',
  ],
};