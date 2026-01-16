import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  createCollectionResultSchema,
  listCollectionsResultSchema,
} from '__models__/collections-responses.zod'
import { CollectionsApi } from 'apis/collections/api'
import { ApiClient } from 'client'

let client: CollectionsApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new CollectionsApi(new ApiClient(process.env.API_TOKEN))
})

describe('Assets Collections: ', () => {
  const testAssetId = '0fc38f70-a092-40e5-b579-3fea806b1295'
  let testCollectionId: string

  it('Lists collections with only the type parameter set', async () => {
    const result = await client.listCollections({ type: 'private' })

    expect(() =>
      listCollectionsResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists collections with parameters', async () => {
    const result = await client.listCollections({
      type: 'private',
      limit: 50,
      offset: 1,
    })

    expect(() =>
      listCollectionsResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Creates a collection', async () => {
    const title = `sdk-test-${new Date().toISOString()}`
    const result = await client.createCollection({
      title,
      description: 'SDK Test',
    })

    testCollectionId = result.uuid

    expect(() =>
      createCollectionResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Adds an asset to a collection', async () => {
    await expect(
      client.addOrRemoveAssets({
        collections: [testCollectionId],
        assets_to_add: [testAssetId],
      })
    ).resolves.not.toThrow()
  })

  it('Removes an asset from a collection', async () => {
    await expect(
      client.addOrRemoveAssets({
        collections: [testCollectionId],
        assets_to_remove: [testAssetId],
      })
    ).resolves.not.toThrow()
  })
})
