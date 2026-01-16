import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import { getSearchConnectorResultSchema } from '__models__/search-connector-responses.zod'
import { SearchConnectorApi } from 'apis/search-connector/api'
import { ApiClient } from 'client'

let client: SearchConnectorApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new SearchConnectorApi(new ApiClient(process.env.API_TOKEN))
})

describe('Get Search Connector Url: ', () => {
  it('Retrieves search connector url with no parameters set', async () => {
    const result = await client.getSearchConnectorUrl()

    expect(() =>
      getSearchConnectorResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Retrieves search connector url with parameters', async () => {
    const result = await client.getSearchConnectorUrl({
      hideSearchBar: true,
      query: 'test query',
    })

    expect(() =>
      getSearchConnectorResultSchema.strict().parse(result)
    ).not.toThrow()
  })
})
