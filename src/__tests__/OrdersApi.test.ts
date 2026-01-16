import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  cleanAssetsResultSchema,
  createOrderResultSchema,
  getZipStatusResultSchema,
  listConversionsForOrderResultSchema,
  listOrderProfileResultSchema,
  getOrderDetailsResultSchema,
} from '__models__/orders-responses.zod'
import { OrdersApi } from 'apis/orders/api'
import { ApiClient } from 'client'

let client: OrdersApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new OrdersApi(new ApiClient(process.env.API_TOKEN))
})

describe('Assets Orders: ', () => {
  const testAssetId = '0fc38f70-a092-40e5-b579-3fea806b1295'
  const testConversionId = 'fcb42b9c-b053-4d70-b42d-1686b3396746'
  const testProfileId = 'e12e3827-3847-4dad-95ac-c30c39cb4669'
  const testRecipientId = '1681f33d-0cf9-48ba-8668-5ba4d348bafb'
  let testOrderId: string
  let testOrderSequenceNumber: string

  it('Cleans assets', async () => {
    const result = await client.cleanAssets([testAssetId])

    expect(() => cleanAssetsResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Creates an order', async () => {
    const result = await client.createOrder({
      assets: [testAssetId],
      conversions: [testConversionId],
      profile: testProfileId,
      recipients: [testRecipientId],
    })

    testOrderId = result.orders[0].uuid
    testOrderSequenceNumber = result.orders[0].sequenceNumber

    expect(() => createOrderResultSchema.strict().parse(result)).not.toThrow()

    expect(() => {
      result.orders.forEach((c) =>
        getOrderDetailsResultSchema.strict().parse(c)
      )
    }).not.toThrow()
  })

  it('Creates a zip archive', async () => {
    await expect(client.createZipArchive(testOrderId)).resolves.not.toThrow()
  })

  it('Gets order details by ID', async () => {
    const result = await client.getOrderDetails({
      id: testOrderId,
    })

    expect(() => {
      getOrderDetailsResultSchema.strict().parse(result)
    }).not.toThrow()
  })

  it('Gets order details by sequence number', async () => {
    const result = await client.getOrderDetails({
      seqNum: testOrderSequenceNumber,
    })

    getOrderDetailsResultSchema.strict().parse(result)
  })

  it('Gets zip archive status', async () => {
    const result = await client.getZipStatus(testOrderId)

    expect(() => getZipStatusResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists conversions for an order', async () => {
    const result = await client.listConversionsForOrder({
      assetIds: [testAssetId],
      profileId: testProfileId,
    })

    expect(() =>
      listConversionsForOrderResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists order profiles', async () => {
    const result = await client.listOrderProfiles()

    expect(() =>
      listOrderProfileResultSchema.strict().parse(result)
    ).not.toThrow()
  })
})
