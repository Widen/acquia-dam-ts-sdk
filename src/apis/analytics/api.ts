import { ApiClient } from 'client'
import type { AnalyticsRequestParams } from './requests'
import type {
  ListAssetDownloadsResponse,
  ListAssetSharesResponse,
  ListAssetViewsResponse,
} from './responses'

export class AnalyticsApi {
  private _client: ApiClient

  /**
   * Create an instance of the AnalyticsApi class.
   *
   * The Analytics endpoints provide information about asset usage from the Insights application. The API will return download, view, and share details for a single asset.
   * Events may take up to 24 hours before appearing in analytics API results.
   * Note: Three years of analytics data is available, starting from January 1, 2021 onward. The default `date_range` filter is from this date until today.
   *
   * @param client Provide an instance of ApiClient.
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Analytics}
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Retrieve a list of Asset Download events
   * @param params Information about the request
   * @returns Promise containing the Download Asset events that meet the request criteria
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Analytics/operation/listAssetDownloads}
   */
  public listAssetDownloads(
    params: AnalyticsRequestParams
  ): Promise<ListAssetDownloadsResponse> {
    return this._client.sendRequest({
      apiVersion: '2',
      body: params,
      method: 'POST',
      path: 'analytics/assets/downloads',
    })
  }

  /**
   * Retrieve a list of Asset Share events
   * @param params Information about the request
   * @returns Promise containing the Share Asset events that meet the request criteria
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Analytics/operation/listAssetShares}
   */
  public listAssetShares(
    params: AnalyticsRequestParams
  ): Promise<ListAssetSharesResponse> {
    return this._client.sendRequest({
      apiVersion: '2',
      body: params,
      method: 'POST',
      path: 'analytics/assets/shares',
    })
  }

  /**
   * Retrieve a list of View Asset events
   * @param params Information about the request
   * @returns Promise containing the View Asset events that meet the request criteria
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Analytics/operation/listAssetViews}
   */
  public listAssetViews(
    params: AnalyticsRequestParams
  ): Promise<ListAssetViewsResponse> {
    return this._client.sendRequest({
      apiVersion: '2',
      body: params,
      method: 'POST',
      path: 'analytics/assets/views',
    })
  }
}
