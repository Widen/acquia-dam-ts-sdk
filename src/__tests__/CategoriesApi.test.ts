import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  categoryTreeResultSchema,
  categoryV2Schema,
  createEditCategoryResultSchema,
  listCategoriesResultSchema,
} from '__models__/categories-responses.zod'
import { CategoriesApi } from 'apis'
import AcquiaDAM from 'index'

let client: CategoriesApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ authToken: process.env.API_TOKEN }).categories
})

describe('Assets Categories: ', () => {
  const testAssetId = '0fc38f70-a092-40e5-b579-3fea806b1295'
  const testCategoryPath = 'test\\/cat/test2'
  let testCategoryId: string

  it('Retrieves the category tree, excluding empty categories', async () => {
    const result = await client.getCategoryTree()

    expect(() => categoryTreeResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves the category tree, including empty categories', async () => {
    const result = await client.getCategoryTree(true)

    expect(() => categoryTreeResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves a list of root categories', async () => {
    const result = await client.listCategories()

    expect(() =>
      listCategoriesResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((c) => categoryV2Schema.strict().parse(c))
    }).not.toThrow()
  })

  it('Retrieves a list of sub-categories', async () => {
    const result = await client.listCategories(testCategoryPath)

    expect(() =>
      listCategoriesResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((c) => categoryV2Schema.strict().parse(c))
    }).not.toThrow()
  })

  it('Creates a category', async () => {
    const title = `sdk-test-${new Date().toISOString()}`
    const result = await client.createCategory({
      parentCategory: 'root',
      title,
      description: 'SDK Test',
      displayAlphabetically: true,
    })

    testCategoryId = result.uuid

    expect(() =>
      createEditCategoryResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Edits a category', async () => {
    const result2 = await client.editCategory({
      uuid: testCategoryId,
      description: 'Changed description',
    })

    expect(() =>
      createEditCategoryResultSchema.strict().parse(result2)
    ).not.toThrow()
  })

  it('Adds an asset to a category', async () => {
    await expect(
      client.addOrRemoveAsets({
        categories: [testCategoryId],
        assets_to_add: [testAssetId],
      })
    ).resolves.not.toThrow()
  })

  it('Removes an asset from a category', async () => {
    await expect(
      client.addOrRemoveAsets({
        categories: [testCategoryId],
        assets_to_remove: [testAssetId],
      })
    ).resolves.not.toThrow()
  })
})
