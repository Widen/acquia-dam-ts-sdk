import type { Config } from 'jest'

const config: Config = {
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
