/** Options for {@link ApiClient.sendRequest} */
export interface ApiRequestParams {
  /** The version of the API being used */
  apiVersion: ApiVersions
  /** The body of the request */
  body?: object
  /** The HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'
  /** The path of the request, excluding the base URL */
  path: string
  /** The query string parameters sent in the URL */
  queryStringParams?: object
}

export type ApiVersions = '1' | '2'

export type JsonPrimitive = string | number | boolean | null
export type JsonPrimitiveWithDate = Date | string | number | boolean | null

export type JsonObject = { [k: string]: Json }
export type JsonObjectWithDate = { [k: string]: JsonWithDate }

export type JsonArray = Array<Json>
export type JsonArrayWithDate = Array<JsonWithDate>

export type Json = JsonPrimitive | JsonObject | JsonArray
export type JsonWithDate =
  | JsonPrimitiveWithDate
  | JsonObjectWithDate
  | JsonArrayWithDate
