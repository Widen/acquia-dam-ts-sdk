import { ApiClient } from 'client'
import type {
  AddRemoveAssetsParams,
  CreateCategoryParams,
  EditCategoryParams,
} from './requests'
import type {
  CategoryTreeResult,
  CreateEditCategoryResult,
  ListCategoriesResult,
} from './responses'

export class CategoriesApi {
  private _client: ApiClient

  /**
   * Create an instance of the CategoriesApi class
   *
   * Provides information about Categories and the Assets contained in them
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Add or remove multiple assets from multiple categories
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv1.docs.apiary.io/#reference/categories/category-assets/adding/removing-assets}
   */
  public addOrRemoveAsets(params: AddRemoveAssetsParams): Promise<void> {
    const { assets_to_add = [], assets_to_remove = [], categories } = params
    const body = {
      categories: {
        uuids: categories,
      },
      add: {
        uuids: assets_to_add,
      },
      remove: {
        uuids: assets_to_remove,
      },
    }

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path: 'category/assets',
      body,
    })
  }

  /**
   * Create a new category
   * @param params Information about the request
   * @returns Promise containing information about the new category
   * @see {@link https://widenv1.docs.apiary.io/#reference/categories/createedit-category/create-category}
   */
  public createCategory(
    params: CreateCategoryParams
  ): Promise<CreateEditCategoryResult> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path: 'category',
      body: params,
    })
  }

  /**
   * Update a category's information
   * @param params Information about the request
   * @returns Promise containing information about the modified category
   * @see {@link https://widenv1.docs.apiary.io/#reference/categories/createedit-category/edit-category}
   */
  public editCategory(
    params: EditCategoryParams
  ): Promise<CreateEditCategoryResult> {
    const { uuid, ...body } = params
    const path = `category/uuid/${uuid}`

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'PUT',
      body,
      path,
    })
  }

  /**
   * Gets the category tree sctructure for the entire site
   * @param includeEmpty `true` if the response should include categories with no assets.
   * @returns Promise containing the category tree structure
   * @see {@link https://widenv1.docs.apiary.io/#reference/categories/category-tree/category-tree}
   */
  public getCategoryTree(includeEmpty?: boolean): Promise<CategoryTreeResult> {
    const queryStringParams = {
      includeEmpty,
    }

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path: 'category/categoryTree',
      queryStringParams,
    })
  }

  /**
   * Retrieve a list of child categories.
   * @param categoryPath Optional parent category path. Slashes in category names must be escaped with a backslash. If omitted, the top-level categories will be returned.
   * @returns Promise containing a list of asset categories
   * @see {@link https://widenv2.docs.apiary.io/#reference/categories/asset-categories/list-asset-categories}
   */
  public listCategories(categoryPath?: string): Promise<ListCategoriesResult> {
    let path = 'categories'

    if (categoryPath) {
      path += `/${this.encodeCategoryPath(categoryPath)}`
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * URL-encodes symbols in the path. Escaped slashes are treated as part of the category's name.
   * @param path The category path
   */
  public encodeCategoryPath(path: string) {
    return path
      .split(/(?<!\\)\//)
      .map((part) => encodeURIComponent(part))
      .join('/')
  }
}
