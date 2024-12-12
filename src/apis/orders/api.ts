import { AcquiaDAMError, ApiClient } from 'client'
import type {
  CreateOrderParams,
  GetOrderDetailsParams,
  ListConversionsForOrderParams,
} from './requests'
import type {
  CleanAssetsResult,
  CreateOrderResult,
  GetOrderDetailsResult,
  GetZipStatusResult,
  ListConversionsForOrderResult,
  ListOrderProfileResult,
} from './responses'

export class OrdersApi {
  private _client: ApiClient

  /**
   * Create an instance of the OrdersApi class
   *
   * Provides information about Orders and Conversions
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * This can be called before attempting to create an order to determine which items will be removed from the order. Situations include an asset that has been deleted or an asset the user does not have permission to order.Any items returned in the removedItems list, will be removed automatically when the order is submitted.
   * @param assets Array of asset UUIDs
   * @returns Promise containing the assets that will not be ordered
   * @see {@link https://widenv1.docs.apiary.io/#reference/orders/create-order/clean-assets-for-order}
   */
  public cleanAssets(assets: string[]): Promise<CleanAssetsResult> {
    const body = {
      uuids: assets,
    }

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path: 'order/items/removals',
      body,
    })
  }

  /**
   * Create an asset order.
   * @param params Information about the request
   * @returns Promise containing information about the created order
   * @see {@link https://widenv1.docs.apiary.io/#reference/orders/create-order/create-order}
   */
  public createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path: 'order',
      body: params,
    })
  }

  /**
   * Used to submit a request to begin the creation of a zip archive for a specific order
   * @param uuid The order UUID
   * @returns Promise containing no information
   * @see {@link https://widenv1.docs.apiary.io/#reference/orders/zip-archives/create-zip-archive}
   */
  public createZipArchive(uuid: string): Promise<void> {
    const path = `order/uuid/${uuid}/zip`

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path,
    })
  }

  /**
   * Gets order information by uuid or sequence number and, if the order conversion status is 'Completed', up to 100 assets and associated conversions and pickup urls for that order. If the order conversion status is not 'Completed', only order details (uuid, conversion status, assets in order, and sequence number) will appear in the response.
   * @param params Information about the request
   * @returns Promise containing information about the order
   */
  public getOrderDetails(
    params: GetOrderDetailsParams
  ): Promise<GetOrderDetailsResult> {
    const { id, seqNum, ...queryStringParams } = params
    let field: string, value: string

    if (id) {
      field = 'uuid'
      value = id
    } else if (seqNum) {
      field = 'seqNum'
      value = seqNum
    } else {
      throw new AcquiaDAMError(
        'SDK Error',
        undefined,
        'One of id, seqNum must be defined'
      )
    }

    const path = `order/${field}/${value}`

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path,
      queryStringParams,
    })
  }

  /**
   * Used to check the status of an archive operation that has previously been submitted. If the archive operation is complete, this call returns a download link for the zip archive.
   * @param uuid The order UUID
   * @returns Promise containing information about the status of the Zip archive
   * @see {@link https://widenv1.docs.apiary.io/#reference/orders/zip-archives/get-zip-archive-status/link}
   */
  public getZipStatus(uuid: string): Promise<GetZipStatusResult> {
    const path = `order/uuid/${uuid}/zip`

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path,
    })
  }

  /**
   * Retrieves the list of conversions available for a specific order profile and set of assets.
   * @param params Information about the request
   * @returns Promise containing the list of available conversions
   * @see {@link https://widenv1.docs.apiary.io/#reference/orders/conversions-for-order/conversions-for-order}
   */
  public listConversionsForOrder(
    params: ListConversionsForOrderParams
  ): Promise<ListConversionsForOrderResult> {
    const { assetIds, profileId } = params
    const path = `conversion/order/profile/uuid/${profileId}`
    const body = {
      uuids: assetIds,
    }

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      body,
      path,
    })
  }

  /**
   * Gets the Order Profiles available for sending orders via the internet
   * @returns Promise containing the list of available order profiles
   * @see {@link https://widenv1.docs.apiary.io/#reference/orders/internet-order-profile-list/internet-order-profile-list}
   */
  public listOrderProfiles(): Promise<ListOrderProfileResult> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path: 'order/profile/internet',
    })
  }
}
