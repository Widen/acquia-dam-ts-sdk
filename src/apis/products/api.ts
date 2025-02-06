import { ApiClient } from 'client'
import type {
  CreateProductParams,
  ListChannelsParams,
  ListProductsByChannelParams,
  ListProductsCategoryParams,
  ListProductTypesParams,
  SearchProductsParams,
  UpdateAttributesParams,
  UpdateFeaturedImageParams,
  UpdateParentProductParams,
  UpdateProductCategoryParams,
  UpdateProductTypeParams,
} from './requests'
import type {
  CreateProductResult,
  ListChannelsResult,
  ListProductsByChannelResult,
  ListProductCategoriesResult,
  ListProductTypesResult,
  SearchProductsResult,
  GetProductResult,
} from './responses'

export class ProductsApi {
  private _client: ApiClient

  /**
   * Create an instance of the ProductsApi class.
   *
   * The Products API provides access to product information stored in Acquia Entries. The API allows you to create, retrieve, delete, and update products.
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Create a new product
   * @param params Information about the request
   * @returns Promise containing the new Product ID
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/create-a-new-product}
   */
  public createProduct(
    params: CreateProductParams
  ): Promise<CreateProductResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'products',
      body: params,
    })
  }

  /**
   * Delete a product
   * @param id Product ID
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/delete}
   */
  public deleteProduct(id: string): Promise<void> {
    const path = `products/${id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Retrieve information about a product
   * @param id Product ID
   * @returns Promise containing information about a product
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/retrieve-by-id}
   */
  public getProduct(id: string): Promise<GetProductResult> {
    const path = `products/${id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Retrieve a list of channels
   * @param params Information about the request
   * @returns Promise containing a list of channels
   * @see {@link https://widenv2.docs.apiary.io/#reference/channels/channels/list-channels}
   */
  public listChannels(
    params?: ListChannelsParams
  ): Promise<ListChannelsResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'channels',
      queryStringParams: params,
    })
  }

  /**
   * The Channel Products endpoint returns a list of products associated with a given channel in Entries. Only the products and attributes that are configured for the channel will be included in the response
   * @param params Information about the request
   * @returns Promise containing a list of products in the channel
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products-for-channel/list-products-for-channel}
   */
  public listProductsByChannel(
    params: ListProductsByChannelParams
  ): Promise<ListProductsByChannelResult> {
    const { channel_id, ...queryStringParams } = params
    const path = `products/channels/${channel_id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
      queryStringParams,
    })
  }

  /**
   * Retrieve a list of product categories
   * @param params Information about the request
   * @returns Promise containing a list of product categories
   * @see {@link https://widenv2.docs.apiary.io/#reference/categories/product-categories/list-product-categories}
   */
  public listProductCategories(
    params?: ListProductsCategoryParams
  ): Promise<ListProductCategoriesResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'product-categories',
      queryStringParams: params,
    })
  }

  /**
   * Retrieve a list of product types
   * @param params Information about the request
   * @returns Promise containing a list of product types
   * @see {@link https://widenv2.docs.apiary.io/#reference/product-types/product-types/list-product-types}
   */
  public listProductTypes(
    params?: ListProductTypesParams
  ): Promise<ListProductTypesResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'product-types',
      queryStringParams: params,
    })
  }

  /**
   * Change a product's name
   * @param id Product ID
   * @param name New product name
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/rename}
   */
  public renameProduct(id: string, name: string): Promise<void> {
    const path = `products/${id}/rename`
    const body = {
      new_name: name,
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      path,
      body,
    })
  }

  /**
   * Search for products
   * @param params Information about the request
   * @returns Promise containing a list of products
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/list-products-by-search-query}
   */
  public searchProducts(
    params?: SearchProductsParams
  ): Promise<SearchProductsResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'products/search',
      body: params,
    })
  }

  /**
   * Update a product's attribute values
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/update-attribute-values}
   */
  public updateAttributes(params: UpdateAttributesParams): Promise<void> {
    const { id, ...body } = params
    const path = `products/${id}/attributes`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      path,
      body,
    })
  }

  /**
   * Update a product's categories
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/update-product-category}
   */
  public updateProductCategory(
    params: UpdateProductCategoryParams
  ): Promise<void> {
    const { id, ...body } = params
    const path = `products/${id}/product-category`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      path,
      body,
    })
  }

  /**
   * Update a product's featured image
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/update-featured-image}
   */
  public updateFeaturedImage(params: UpdateFeaturedImageParams): Promise<void> {
    const { id, ...body } = params
    const path = `products/${id}/featured-image`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      path,
      body,
    })
  }

  /**
   * Update a product's parent product
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/update-parent-product}
   */
  public updateParentProduct(params: UpdateParentProductParams): Promise<void> {
    const { id, ...body } = params
    const path = `products/${id}/parent-product`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      path,
      body,
    })
  }

  /**
   * Update a product's type
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/products/products/update-product-type}
   */
  public updateProductType(params: UpdateProductTypeParams): Promise<void> {
    const { id, ...body } = params
    const path = `products/${id}/product-type`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      path,
      body,
    })
  }
}
