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
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Users}
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Users-and-Contacts}
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Returns information about a user
   * @param id Retrieve a specific user's information. If omitted, information for the user associated with the provided access token will be returned.
   * @returns Promise containing the requested user information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Users/operation/getUserById}
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
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Users-and-Contacts/operation/getUserAddress}
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
