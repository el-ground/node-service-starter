export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transformIgnorePatterns: [],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./scripts/jest.setup.ts'],
  moduleNameMapper: {
    '#src/(.*)\\.js$': '<rootDir>/src/$1',
    '#framework/(.*)\\.js$': '<rootDir>/src/framework/$1',
    '#routers/(.*)\\.js$': '<rootDir>/src/routers/$1',
    '#model/(.*)\\.js$': '<rootDir>/src/model/$1',
    '#util/(.*)\\.js$': '<rootDir>/src/util/$1',
    '#temp/(.*)\\.js$': '<rootDir>/temp/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|js)'],
}
