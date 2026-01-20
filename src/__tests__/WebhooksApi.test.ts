import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  assetsWebhookSchema,
  createAssetsWebhookResultSchema,
  workflowWebhookSchema,
  listAssetsWebhooksResultSchema,
  listWorkflowWebhooksResultSchema,
} from '__models__/webhooks-responses.zod'
import { WebhooksApi } from 'apis/webhooks/api'
import { ApiClient } from 'client'

let client: WebhooksApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new WebhooksApi(new ApiClient(process.env.API_TOKEN))
})

describe('Assets Webhooks: ', () => {
  const testDeliveryUrl = 'https://example.com/'
  const testSecretKey = 'my_secret'
  let testId: string

  it('Creates a webhook', async () => {
    const result = await client.createAssetsWebhook({
      delivery_url: testDeliveryUrl,
      event_type: 'asset_created',
    })

    testId = result.id

    expect(() =>
      createAssetsWebhookResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Gets a webhook configuration', async () => {
    const result = await client.getAssetsWebhook(testId)

    expect(() => assetsWebhookSchema.strict().parse(result)).not.toThrow()
  })

  it('Pings a webhook', async () => {
    await expect(client.pingAssetsWebhook(testId)).resolves.not.toThrow()
  })

  it('Edits a webhook configuration', async () => {
    await expect(
      client.editAssetsWebhook({
        id: testId,
        delivery_enabled: false,
        delivery_url: `${testDeliveryUrl}/example`,
        event_type: 'asset_asset_groups_updated',
        secret_key: testSecretKey,
        patch: ['delivery_enabled', 'delivery_url', 'event_type', 'secret_key'],
      })
    ).resolves.not.toThrow()
  })

  it('Deletes a webhook configuration', async () => {
    await expect(client.deleteAssetsWebhook(testId)).resolves.not.toThrow()
  })

  it('Lists webhooks with no parameters set', async () => {
    const result = await client.listAssetsWebhooks()

    expect(() =>
      listAssetsWebhooksResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((c) => assetsWebhookSchema.strict().parse(c))
    }).not.toThrow()
  })

  it('Lists webhooks with parameters', async () => {
    const result = await client.listAssetsWebhooks({
      limit: 4,
      offset: 1,
    })

    expect(() =>
      listAssetsWebhooksResultSchema.strict().parse(result)
    ).not.toThrow()
  })
})

describe('Workflow Webhooks: ', () => {
  const testDeliveryUrl = 'https://example.com/'
  const testEvent = 'DELIVERABLE_STATUS_CHANGED'

  it('Creates and Deletes a webhook', async () => {
    const result = await client.createWorkflowWebhook({
      event: testEvent,
      target: testDeliveryUrl,
    })

    expect(() => workflowWebhookSchema.strict().parse(result)).not.toThrow()
  })

  it('Deletes a webhook', async () => {
    await expect(client.deleteWorkflowWebhook(testEvent)).resolves.not.toThrow()
  })

  it('Lists webhooks', async () => {
    const result = await client.listWorkflowWebhooks()

    expect(() =>
      listWorkflowWebhooksResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((c) => workflowWebhookSchema.strict().parse(c))
    }).not.toThrow()
  })
})
