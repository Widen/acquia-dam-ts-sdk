import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  createProductResultSchema,
  listChannelsResultSchema,
  listProductCategoriesResultSchema,
  listProductsByChannelResultSchema,
  listProductTypesResultSchema,
  productSchema,
  searchProductsResultSchema,
} from '__models__/products-responses.zod'
import { ProductsApi } from 'apis'
import AcquiaDAM from 'index'

let client: ProductsApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ authToken: process.env.API_TOKEN }).products
})

describe('Products: ', () => {
  const testParentProductCategoryId = 'brvzr6rkjsgm'
  let testProductId: string

  it('Creates a product', async () => {
    const result = await client.createProduct({
      name: `sdk-test-${new Date().toISOString()}`,
      sku: `test${new Date().toISOString()}`,
    })

    testProductId = result.product_id

    expect(() => createProductResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves a product', async () => {
    const result = await client.getProduct(testProductId)

    expect(() => productSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists product channels without parameters set', async () => {
    const result = await client.listChannels()

    expect(() => listChannelsResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists product channels with parammeters', async () => {
    const result = await client.listChannels({ limit: 1, offset: 1 })

    expect(() => listChannelsResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists products in a channel without limit and offset set', async () => {
    const channels = await client.listChannels()
    const result = await client.listProductsByChannel({
      channel_id: channels.items[0].channel_id,
    })

    expect(() =>
      listProductsByChannelResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((p) => productSchema.strict().parse(p))
    }).not.toThrow()
  })

  it('Lists products in a channel without limit and offset set', async () => {
    const channels = await client.listChannels()
    const result = await client.listProductsByChannel({
      channel_id: channels.items[0].channel_id,
      limit: 1,
      offset: 1,
    })

    expect(() =>
      listProductsByChannelResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((p) => productSchema.strict().parse(p))
    }).not.toThrow()
  })

  it('Lists products categories without parameters set', async () => {
    const result = await client.listProductCategories()

    expect(() =>
      listProductCategoriesResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists products categories with parameters', async () => {
    const result = await client.listProductCategories({
      limit: 1,
      offset: 1,
      parent_product_category_id: testParentProductCategoryId,
    })

    expect(() =>
      listProductCategoriesResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists product types without parameters set', async () => {
    const result = await client.listProductTypes()

    expect(() =>
      listProductTypesResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists product types with parameters', async () => {
    const result = await client.listProductTypes({
      limit: 1,
      offset: 1,
    })

    expect(() =>
      listProductTypesResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Renames a product', async () => {
    await expect(
      client.renameProduct(testProductId, 'renameTest')
    ).resolves.not.toThrow()
  })

  it('Searches for products without parameters set', async () => {
    const result = await client.searchProducts()

    expect(() =>
      searchProductsResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((p) => productSchema.strict().parse(p))
    }).not.toThrow()
  })

  it('Searches for products with parameters', async () => {
    const result = await client.searchProducts({
      expand: ['attributes'],
      query: 'test',
      limit: 10,
      offset: 1,
      sort: { order: 'ascending', type: 'name' },
    })

    expect(() =>
      searchProductsResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((p) => productSchema.strict().parse(p))
    }).not.toThrow()
  })

  it('Updates product attributes', async () => {
    await expect(
      client.updateAttributes({
        id: testProductId,
        attributes: { klmcxgfklqk7: ['gray'] },
      })
    ).resolves.not.toThrow()
  })

  it('Updates product category', async () => {
    await expect(
      client.updateProductCategory({
        id: testProductId,
        product_categories: [{ product_category_id: '2njwncs5twmd' }],
      })
    ).resolves.not.toThrow()
  })

  it('Updates product featured image', async () => {
    await expect(
      client.updateFeaturedImage({
        id: testProductId,
        asset_id: '0fc38f70-a092-40e5-b579-3fea806b1295',
      })
    ).resolves.not.toThrow()
  })

  it('Updates product type', async () => {
    await expect(
      client.updateProductType({
        id: testProductId,
        product_type_id: 'vlzhkbznz6xd',
      })
    ).resolves.not.toThrow()
  })

  it('Updates parent product', async () => {
    await expect(
      client.updateParentProduct({
        id: testProductId,
        parent_product_id: 'wlzg2kjkwglq',
      })
    ).resolves.not.toThrow()
  })

  it('Deletes a product', async () => {
    await expect(client.deleteProduct(testProductId)).resolves.not.toThrow()
  })
})
