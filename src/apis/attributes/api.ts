import { ApiClient } from 'client'
import type { ListAttributesParams } from './requests'
import type {
  ListAttributesResult,
  ListAttributeVocabularyResult,
} from './responses'

export class AttributesApi {
  private _client: ApiClient

  /**
   * Create an instance of the AttributesApi class.
   *
   * The Attributes API lists all product attributes that have been configured in Entries, and all controlled vocabulary values for any single-select or multi-select attribute
   *
   * @param client Provide an instance of ApiClient.
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Attributes}
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Retrieve a list of attributes
   * @param params Information about the request
   * @returns Promise containing a list of attributes
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Attributes/operation/listAttributes}
   */
  public listAttributes(
    params?: ListAttributesParams
  ): Promise<ListAttributesResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'attributes',
      queryStringParams: params,
    })
  }

  /**
   * List the vocabulary for a single-select or multi-select attribute
   * @param id Attribute ID
   * @returns Promise containing the vocabulary for the provided attribute field
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Attributes/operation/listVocabulary}
   */
  public listAttributeVocabulary(
    id: string
  ): Promise<ListAttributeVocabularyResult> {
    const path = `attributes/${id}/vocabulary`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }
}
