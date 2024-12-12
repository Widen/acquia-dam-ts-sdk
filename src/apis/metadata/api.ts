import { ApiClient } from 'client'
import type {
  AddMetadataValueParams,
  ListViewableMetadataFieldsParams,
  UpdateMetadataFieldValueParams,
} from './requests'
import type {
  GetMetadataFieldValueResult,
  ListFieldValuesResult,
  ListMetadataTypesResult,
  ListViewableMetadataFieldsResult,
} from './responses'

export class MetadataApi {
  private _client: ApiClient

  /**
   * Create an instance of the MetadataApi class.
   *
   * These endpoints allow you to retrieve or modify information about existing metadata fields. If you want to retrieve or modify metadata applied to a specific asset, use the AssetsApi
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Add a value to a controlled metadata field's vocabulary
   * @param params Information about the request
   * @returns Promise containing no data
   * @see {@link https://widenv2.docs.apiary.io/#reference/metadata/controlled-vocabulary/add-value}
   */
  public addValue(params: AddMetadataValueParams): Promise<void> {
    const { displayKey, ...body } = params
    const path = `metadata/${displayKey}/vocabulary`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path,
      body,
    })
  }

  /**
   * Remove a value from a controlled metadata field's vocabulary
   * @param displayKey Display key of the controlled vocabulary metadata field
   * @param value The controlled vocabulary value you wish to remove
   * @returns Promise containing no data
   * @see {@link https://widenv2.docs.apiary.io/#reference/metadata/controlled-vocabulary/delete-value}
   */
  public deleteValue(displayKey: string, value: string): Promise<void> {
    const path = `metadata/${displayKey}/vocabulary/${value}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Retrieve a list of controlled vocabulary metadata values
   * @param displayKey Display key of the controlled vocabulary metadata field
   * @returns Promise containing the vocabulary for the given field
   * @see {@link https://widenv2.docs.apiary.io/#reference/metadata/controlled-vocabulary/list-values}
   */
  public listFieldValues(displayKey: string): Promise<ListFieldValuesResult> {
    const path = `metadata/${displayKey}/vocabulary`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Get details for a single controlled vocabulary value
   * @param displayKey Display key of the controlled vocabulary metadata field
   * @param value The controlled vocabulary value
   * @returns Promise containing information for the metadata field value
   * @see {@link https://widenv2.docs.apiary.io/#reference/metadata/controlled-vocabulary/retrieve-single-value}
   */
  public getValue(
    displayKey: string,
    value: string
  ): Promise<GetMetadataFieldValueResult> {
    const path = `metadata/${displayKey}/vocabulary/${value}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Retrieves the list of all MetadataTypes in the system. In addition to the Type's name and use, a listing of all that Type's MetadataFields is provided. For MetadataFields with a controlled list of options, each value is also provided.
   * @returns Promise containing a list of metadata types
   * @see {@link https://widenv1.docs.apiary.io/#reference/metadata/metadata-types-list/metadata-types-list}
   */
  public listMetadataTypes(): Promise<ListMetadataTypesResult> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path: 'metadata/types',
    })
  }

  /**
   * Query for a list of metadata fields that you have permission to see
   * @param params Information about the request
   * @returns Promise containing information for the desired metadata fields
   * @see {@link https://widenv2.docs.apiary.io/#reference/metadata/fields/viewable}
   */
  public listViewableFields(
    params?: ListViewableMetadataFieldsParams
  ): Promise<ListViewableMetadataFieldsResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'metadata/fields/viewable',
      queryStringParams: params,
    })
  }

  /**
   * Update the display value or the index (or both) of a controlled metadata field value
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/metadata/controlled-vocabulary/update-value}
   */
  public updateValue(params: UpdateMetadataFieldValueParams): Promise<void> {
    const { displayKey, existingValue, ...body } = params
    const path = `metadata/${displayKey}/vocabulary/${existingValue}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      body,
      path,
    })
  }
}
