export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transformIgnorePatterns: [],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['./scripts/jest.setup.ts'],
  moduleNameMapper: {
    '#src/(.*)\\.js$': '<rootDir>/src/$1',
    '#src/framework/(.*)\\.js$': '<rootDir>/src/framework/$1',
    '#src/util/(.*)\\.js$': '<rootDir>/src/util/$1',
    '#src/model/(.*)\\.js$': '<rootDir>/src/model/$1',
    '#src/methods/(.*)\\.js$': '<rootDir>/src/methods/$1',
    '#src/plugins/(.*)\\.js$': '<rootDir>/src/plugins/$1',
    '#temp/(.*)\\.js$': '<rootDir>/temp/$1',
    '#assets/(.*)\\.js$': '<rootDir>/assets/$1',
    '#data/(.*)\\.js$': '<rootDir>/data/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    },
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|js)'],
}
