export interface ListAttributesParams {
  /**
   * Numeric limit of the total number of results to retrieve
   *
   * Minimum: 1
   *
   * Maximum: 1000
   *
   * @default 100
   */
  limit?: number
  /**
   * Starting position of query result set
   *
   * Minimum: 0
   *
   * @default 0
   */
  offset?: number
}
