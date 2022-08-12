export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transformIgnorePatterns: [],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./scripts/jest.setup.ts'],
  moduleNameMapper: {
    '#src/(.*)\\.js$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|js)'],
}
