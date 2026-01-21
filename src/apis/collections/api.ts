import { ApiClient } from 'client'
import type {
  AddRemoveAssetsParams,
  CreateCollectionParams,
  ListCollectionsParams,
} from './requests'
import type { CreateCollectionResult, ListCollectionsResult } from './responses'

export class CollectionsApi {
  private _client: ApiClient

  /**
   * Create an instance of the CollectionsApi class
   *
   * Provides information about global, shared, and private Collections
   *
   * @param client Provide an instance of ApiClient.
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Collections}
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Collections}
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Add or remove multiple assets from multiple collections
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Collections/operation/addOrRemoveAssetsFromCollections}
   */
  public addOrRemoveAssets(params: AddRemoveAssetsParams): Promise<void> {
    const { assets_to_add = [], assets_to_remove = [], collections } = params
    const body = {
      collections: {
        uuids: collections,
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
      path: 'collection/assets',
      body,
    })
  }

  /**
   * Create a local (private) collection
   * @param params Information about the request
   * @returns Promise containing information about the created collection
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Collections/operation/createCollection}
   */
  public createCollection(
    params: CreateCollectionParams
  ): Promise<CreateCollectionResult> {
    const { assets, description, title } = params
    const body = {
      assets: {
        uuids: assets,
      },
      description,
      title,
    }

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path: 'collection',
      body,
    })
  }

  /**
   * Retrieve a list of collections.
   * @param params Information about the request
   * @returns Promise containing a list of collections
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Collections/operation/listCollections}
   */
  public listCollections(
    params: ListCollectionsParams
  ): Promise<ListCollectionsResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'collections',
      queryStringParams: params,
    })
  }
}
