import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  getMetadataFieldValueResultSchema,
  listFieldValuesResultSchema,
  listMetadataTypesResultSchema,
  listViewableMetadataFieldsResultSchema,
} from '__models__/metadata-responses.zod'
import { MetadataApi } from 'apis'
import AcquiaDAM from 'index'

let client: MetadataApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ authToken: process.env.API_TOKEN }).metadata
})

describe('Assets Metadata: ', () => {
  let testFieldDisplayKey: string
  let testFieldValue: string

  beforeAll(async () => {
    const fields = await client.listViewableFields({
      field_types: 'all_controlled_vocabulary',
      limit: 1,
    })

    testFieldDisplayKey = fields.fields[0].display_key
  })

  it('Lists metadata types', async () => {
    const result = await client.listMetadataTypes()

    expect(() =>
      listMetadataTypesResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists viewable metadata fields with no parameters set', async () => {
    const result = await client.listViewableFields()

    expect(() =>
      listViewableMetadataFieldsResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists viewable metadata fields with parameters', async () => {
    const result = await client.listViewableFields({
      display_name_after: 'a',
      display_name_starts_with: 'a',
      field_types: ['text', 'text_long'],
      limit: 10,
    })

    expect(() =>
      listViewableMetadataFieldsResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists values for a given field', async () => {
    const result = await client.listFieldValues(testFieldDisplayKey)

    expect(() =>
      listFieldValuesResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Adds a vocabulary value', async () => {
    testFieldValue = `sdk-test-add-${new Date()}`

    await expect(
      client.addValue({
        displayKey: testFieldDisplayKey,
        value: testFieldValue,
        index: 0,
      })
    ).resolves.not.toThrow()
  })

  it('Retrieves a vocabulary value', async () => {
    const result = await client.getValue(testFieldDisplayKey, testFieldValue)

    expect(() =>
      getMetadataFieldValueResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Updates a vocabulary value', async () => {
    const newTestFieldValue = `sdk-test-update-${new Date()}`

    await expect(
      client.updateValue({
        displayKey: testFieldDisplayKey,
        existingValue: testFieldValue,
        value: newTestFieldValue,
        index: 1,
      })
    ).resolves.not.toThrow()

    testFieldValue = newTestFieldValue
  })

  it('Deletes a vocabulary value', async () => {
    await expect(
      client.deleteValue(testFieldDisplayKey, testFieldValue)
    ).resolves.not.toThrow()
  })
})
