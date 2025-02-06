import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import { getUsageResultSchema } from '__models__/usage-responses.zod'
import { UsageApi } from 'apis'
import AcquiaDAM from 'index'

let client: UsageApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ authToken: process.env.API_TOKEN }).usage
})

describe('Get Usage: ', () => {
  it('Retrieves the current API usage', async () => {
    const result = await client.getApiUsage()

    expect(() => getUsageResultSchema.strict().parse(result)).not.toThrow()
  })
})
