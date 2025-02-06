import { ApiClient } from 'client'
import type { GetUsageResult } from './responses'

export class UsageApi {
  private _client: ApiClient

  /**
   * Create an instance of the UsageApi class.
   *
   * Retrieve information about the monthly usage of the API
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Reveals the total number of API requests made within the current month. Note: Usage data is aggregated periodically and a delay of up to 24 hours may occur
   * @returns Promise containing the monthly request count
   * @see {@link https://widenv2.docs.apiary.io/#reference/usage/get-api-usage}
   */
  public getApiUsage(): Promise<GetUsageResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'usage/api',
    })
  }
}
