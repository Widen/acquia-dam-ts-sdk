import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  downloadAssetEventSchema,
  listAssetDownloadsResponseSchema,
  listAssetSharesResponseSchema,
  listAssetViewsResponseSchema,
  shareAssetEventSchema,
  viewAssetEventSchema,
} from '__models__/analytics-responses.zod'
import { AnalyticsApi } from 'apis/analytics/api'
import { ApiClient } from 'client'

let client: AnalyticsApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AnalyticsApi(new ApiClient(process.env.API_TOKEN))
})

describe('Assets Analytics: ', () => {
  const testAssetId = '0fc38f70-a092-40e5-b579-3fea806b1295'

  it.concurrent(
    'Lists downloads for an asset without a date filter',
    async () => {
      const result = await client.listAssetDownloads({
        filters: [{ type: 'asset', id: testAssetId }],
      })

      expect(() =>
        listAssetDownloadsResponseSchema.strict().parse(result)
      ).not.toThrow()

      expect(() => {
        result.items.forEach((e) => downloadAssetEventSchema.strict().parse(e))
      }).not.toThrow()
    }
  )

  it.concurrent(
    'Lists downloads for an asset with all parameters',
    async () => {
      const result = await client.listAssetDownloads({
        filters: [
          { type: 'asset', id: testAssetId },
          { type: 'date_range', start: new Date('1/1/2022'), end: new Date() },
        ],
        limit: 1,
      })

      expect(() =>
        listAssetDownloadsResponseSchema.strict().parse(result)
      ).not.toThrow()

      expect(() => {
        result.items.forEach((e) => downloadAssetEventSchema.strict().parse(e))
      }).not.toThrow()
    }
  )

  it.concurrent('Lists shares for an asset without a date filter', async () => {
    const result = await client.listAssetShares({
      filters: [{ type: 'asset', id: testAssetId }],
    })

    expect(() =>
      listAssetSharesResponseSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((e) => shareAssetEventSchema.strict().parse(e))
    }).not.toThrow()
  })

  it.concurrent('Lists shares for an asset with all parameters', async () => {
    const result = await client.listAssetShares({
      filters: [
        { type: 'asset', id: testAssetId },
        { type: 'date_range', start: new Date('1/1/2022'), end: new Date() },
      ],
      limit: 1,
    })

    expect(() =>
      listAssetSharesResponseSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((e) => shareAssetEventSchema.strict().parse(e))
    }).not.toThrow()
  })

  it.concurrent('Lists views for an asset without a date filter', async () => {
    const result = await client.listAssetViews({
      filters: [{ type: 'asset', id: testAssetId }],
    })

    expect(() =>
      listAssetViewsResponseSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((e) => viewAssetEventSchema.strict().parse(e))
    }).not.toThrow()
  })

  it.concurrent('Lists views for an asset with all parameters', async () => {
    const result = await client.listAssetViews({
      filters: [
        { type: 'asset', id: testAssetId },
        { type: 'date_range', start: new Date('1/1/2022'), end: new Date() },
      ],
      limit: 1,
    })

    expect(() =>
      listAssetViewsResponseSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((e) => viewAssetEventSchema.strict().parse(e))
    }).not.toThrow()
  })
})
