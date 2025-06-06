import type {
  ApiRequestParams,
  ApiVersions,
  ErrorTypes,
  Json,
  JsonWithDate,
} from './types'

/*
 * Acquia DAM
 * This is the interface for interacting with the Acquia DAM API.
 * Both [V1](https://widenv1.docs.apiary.io/#) and [V2](https://widenv2.docs.apiary.io/#) APIs are supported.
 *
 * Do not edit this class manually.
 */

/**
 * Manages client-server communication. This class should not be modified directly.
 * @class
 */
export class ApiClient {
  private _accessToken: string = ''
  public readonly __sdkIdentifier = 'dam-ts@development'

  public baseUrlMap: Map<ApiVersions, string> = new Map([
    ['1', 'https://.widencollective.com/api/rest/'],
    ['2', 'https://api.widencollective.com/v2/'],
  ])

  public constructor(accessToken?: string) {
    if (accessToken) {
      this.accessToken = accessToken
    }
  }

  /**
   * Sets the collective key in the v1 API Base URL
   * @param key The collective key
   */
  private set _collectiveKey(key: string) {
    this.baseUrlMap.set('1', `https://${key}.widencollective.com/api/rest/`)
  }

  /**
   * Sets the current access token.
   * @param token The Personal Access Token obtained from the DAM Admin UI or the Access Token obtained from the OAuth Authorization Code Flow.
   */
  public set accessToken(token: string) {
    if (token === '') {
      this._collectiveKey = ''
    } else if (/^wat_[a-z]*_/.test(token)) {
      this._collectiveKey = token.split('_')[1] || ''
    } else if (/^[a-z]*\//.test(token)) {
      this._collectiveKey = token.split('/')[0] || ''
    } else {
      throw new AcquiaDAMError('SDK Error', undefined, 'Malformed Access Token')
    }

    this._accessToken = token
  }

  /**
   * Sends a request to the DAM API
   * @param requestParams Information about the request to send
   * @returns The data in the response body
   */
  public async sendRequest<T>(requestParams: ApiRequestParams): Promise<T> {
    const opts: RequestInit = {
      method: requestParams.method,
      headers: this.buildHeaders(requestParams),
    }
    const url = this.buildUrl(requestParams)

    if (requestParams.body) {
      opts.body = this.buildBody(requestParams)
    }

    const response = await fetch(url, opts)

    if (!response.ok) {
      const content = await this.parseBody<string | object | undefined>(
        response
      )
      throw new AcquiaDAMError('HTTP Error', response.status, content)
    }

    return this.parseBody(response)
  }

  /**
   * Builds the full URL to send to the server
   * @param requestParams Information about the request
   * @returns The full URL to send
   */
  protected buildUrl(requestParams: ApiRequestParams) {
    const base = this.baseUrlMap.get(requestParams.apiVersion)
    const queryString = requestParams.queryStringParams
      ? `?${new URLSearchParams(this.buildParams(requestParams.queryStringParams))}`
      : ''

    return `${base}${requestParams.path}${queryString}`
  }

  /**
   * Builds the request headers
   * @param requestParams Information about the request
   * @returns The necessary headers including authentication
   */
  protected buildHeaders(requestParams: ApiRequestParams) {
    if (!this._accessToken) {
      throw new AcquiaDAMError(
        'SDK Error',
        undefined,
        'Access token is not set'
      )
    }

    const headers = new Headers()

    headers.set('Authorization', `Bearer ${this._accessToken}`)
    headers.set('x-acquia-sdk-client', this.__sdkIdentifier)

    if (requestParams.body && !(requestParams.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }

    return headers
  }

  /**
   * Builds the request body
   * @param requestParams Information about the request
   * @returns The request body to send to the server
   */
  protected buildBody(requestParams: ApiRequestParams) {
    return requestParams.body instanceof FormData
      ? requestParams.body
      : JSON.stringify(requestParams.body)
  }

  /**
   * Builds the request query string
   * @param params The request parameters
   * @returns The query string
   */
  protected buildParams(params: object): Record<string, string> {
    const result: Record<string, string> = {}

    Object.entries(params).forEach(([k, v]) => {
      result[k] = Array.isArray(v) ? v.join(',') : String(v)
    })

    return result
  }

  /**
   * Parse the HTTP Response body
   * @param response The fetch API HTTP Response
   * @returns The body content
   */
  protected async parseBody<T>(response: Response): Promise<T> {
    if (!response.body) {
      return undefined as T
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const bodyContent = (await response.json()) as Json
      return this.parseBodyValues(bodyContent) as T
    }

    return response.text() as T
  }

  /**
   * Transforms all timestamps into date objects
   * @param value The value to transform
   */
  private parseBodyValues(value: Json): JsonWithDate {
    let newValue: JsonWithDate

    if (Array.isArray(value)) {
      newValue = value.map((v) => this.parseBodyValues(v))
    } else if (value && typeof value === 'object') {
      newValue = {}
      for (const [k, v] of Object.entries(value)) {
        newValue[k] = this.parseBodyValues(v)
      }
    } else if (
      typeof value === 'string' &&
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(value)
    ) {
      newValue = new Date(value)
    } else {
      newValue = value
    }

    return newValue
  }
}

export class AcquiaDAMError extends Error {
  public statusCode?: number
  public body?: unknown
  public type: ErrorTypes

  constructor(type: ErrorTypes, statusCode?: number, body?: object | string) {
    const message = Object.entries({
      type,
      statusCode,
      body,
    })
      .map(([k, v]) => {
        if (v === undefined) {
          return `${k}: N/A`
        }
        return `${k}: ${JSON.stringify(v)}`
      })
      .join('\n')
    super(message)

    this.type = type
    this.statusCode = statusCode
    this.body = body
  }
}
