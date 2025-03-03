import { ApiClient } from 'client'
import type { GetContactResult, GetUserResult } from './responses'

export class UsersApi {
  private _client: ApiClient

  /**
   * Create an instance of the UsersApi class
   *
   * Query for information about users
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Returns information about a user
   * @param id Retrieve a specific user's information. If omitted, information for the user associated with the provided access token will be returned.
   * @returns Promise containing the requested user information
   * @see {@link https://widenv2.docs.apiary.io/#reference/users/get-user-by-id/get-user-by-id}
   */
  public getUser(id?: string): Promise<GetUserResult> {
    let path = 'user'

    if (id) {
      path += `/${id}`
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Return the calling user's contact. The UUID field may be used as a recipient to create an order.
   * @returns Promise containing the calling user's contact information
   * @see {@link https://widenv1.docs.apiary.io/#reference/users-&-contacts/user-address/user-address}
   */
  public getContact(): Promise<GetContactResult> {
    const path = 'user/address'

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path,
    })
  }
}
