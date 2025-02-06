export interface AnalyticsRequestParams {
  /** Used to filter the results. Currently types of `asset` (required) and `date_range` (optional) are supported */
  filters: Filter[]
  /**
   * Numeric limit of the total number of results to retrieve.
   *
   * Minumum: 1
   *
   * Maximum: 100
   *
   * @default 100
   */
  limit?: number
  /** Used to pagnitate results. The value supplied in the request is taken from an existing response to this endpoint. */
  pagination_token?: string
}

export interface AssetFilter {
  /** Asset ID */
  id: string
  type: 'asset'
}

export interface DateRangeFilter {
  /** End date */
  end: Date
  /** Start date */
  start: Date
  type: 'date_range'
}

export type Filter = AssetFilter | DateRangeFilter
