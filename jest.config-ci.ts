import type { Config } from 'jest'

const config: Config = {
  changedSince: 'origin/main',
  clearMocks: true,
  collectCoverage: false,
  coveragePathIgnorePatterns: ['/node_modules/', '/__models__/'],
  moduleDirectories: ['node_modules'],
  roots: ['src'],
  modulePaths: ['src'],
  testTimeout: 30_000,
  silent: true,
}

export default config
