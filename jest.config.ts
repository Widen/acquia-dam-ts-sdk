import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/__models__/'],
  moduleDirectories: ['node_modules'],
  roots: ['src'],
  modulePaths: ['src'],
  setupFiles: ['dotenv/config'],
  testTimeout: 30000,
  silent: true,
}

export default config
