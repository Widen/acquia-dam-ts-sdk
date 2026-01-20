import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import { getUsageResultSchema } from '__models__/usage-responses.zod'
import { UsageApi } from 'apis/usage/api'
import { ApiClient } from 'client'

let client: UsageApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new UsageApi(new ApiClient(process.env.API_TOKEN))
})

describe('Get Usage: ', () => {
  it('Retrieves the current API usage', async () => {
    const result = await client.getApiUsage()

    expect(() => getUsageResultSchema.strict().parse(result)).not.toThrow()
  })
})
