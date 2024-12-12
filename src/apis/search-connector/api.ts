import { ApiClient } from 'client'
import type { InstantSearchConnectorParams } from './requests'
import type { GetSearchConnectorResult } from './responses'

export class SearchConnectorApi {
  private _client: ApiClient

  /**
   * Create an instance of the SearchConnectorApi class.
   *
   * The Instant Search Connector allows external applications access to Acquia DAM Asset search, without having to implement a native search UI
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Retrieve a url to the Search Connector UI. This UI intended to be displayed in an iframe within the parent application. The returned url is valid for 24 hours and is signed via a one-way hash to prevent modification of its parameters
   * @param params Information about the request
   * @returns Promise containing the URL to the search connector UI.
   * @see {@link https://widenv2.docs.apiary.io/#reference/search-connector/instant-search-connector/instant-search-connector-url}
   */
  public getSearchConnectorUrl(
    params?: InstantSearchConnectorParams
  ): Promise<GetSearchConnectorResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'integrations/url',
      queryStringParams: params,
    })
  }
}
