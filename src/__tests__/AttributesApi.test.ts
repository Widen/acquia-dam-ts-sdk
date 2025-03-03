import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  attributeSchema,
  listAttributesResultSchema,
  listAttributeVocabularyResultSchema,
} from '__models__/attributes-responses.zod'
import { AttributesApi } from 'apis'
import AcquiaDAM from 'index'

let client: AttributesApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ accessToken: process.env.API_TOKEN }).attributes
})

describe('Product Attributes: ', () => {
  const testAttributeId = 'knvtpplb5xpq'

  it('Lists attributes with no parameters set', async () => {
    const result = await client.listAttributes()

    expect(() =>
      listAttributesResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((e) => attributeSchema.strict().parse(e))
    }).not.toThrow()
  })

  it('Lists attributes with parameters', async () => {
    const result = await client.listAttributes({
      limit: 10,
      offset: 1,
    })

    expect(() =>
      listAttributesResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((e) => attributeSchema.strict().parse(e))
    }).not.toThrow()
  })

  it('Lists Attribute Vocabulary', async () => {
    const result = await client.listAttributeVocabulary(testAttributeId)

    expect(() =>
      listAttributeVocabularyResultSchema.strict().parse(result)
    ).not.toThrow()
  })
})
