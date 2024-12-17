export interface CreateProductParams {
  /** Object containing attribute IDs and values */
  attributes?: Record<string, string[]>
  /** Product Name */
  name: string
  /** Product ID of the parent product */
  parent_product_id?: string
  /** IDs of product categories */
  product_categories?: {
    /** Product category ID */
    product_category_id: string
  }[]
  /** Product type ID */
  product_type_id?: string
  /** Product SKU */
  sku: string
}

export interface ListChannelsParams {
  /**
   * Numeric limit of the total number of results to retrieve.
   *
   * Minumum: 1
   *
   * Maximum: 1000
   *
   * @default 100
   */
  limit?: number
  /**
   * Starting position of query result set.
   *
   * Minimum: 0
   *
   * @default 0
   */
  offset?: number
}

export interface ListProductsByChannelParams {
  /** Channel ID */
  channel_id: string
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

export interface ListProductsCategoryParams {
  /**
   * Numeric limit of the total number of results to retrieve
   *
   * Minimum: 1
   *
   * Maximum: 50
   *
   * @default 50
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
  /** Parent Product Category ID. If omitted, the top-level categories will be returned */
  parent_product_category_id?: string
}

export interface ListProductTypesParams {
  /**
   * Numeric limit of the total number of results to retrieve
   *
   * Minumum: 1
   *
   * Maximum: 1000
   *
   * @default 100
   */
  limit?: number
  /**
   * Starting position of query result set
   *
   * @default 0
   */
  offset?: number
}

export interface SearchProductsParams {
  /** If included, result set will be expanded with additional data */
  expand?: ProductSearchExpand[]
  /** Filters are AND-ed together. To mimic Entries channel export use the `exclude_variants` filter. To mimic Entries product search page use the `exclude_variant` and `search_parents_via_variants` filters. */
  filters?: ProductSearchFilter[]
  /**
   * Numeric limit of the total number of results to retrieve
   *
   * Minumum: 1
   *
   * Maximum: 100
   *
   * @default 10
   */
  limit?: number
  /**
   * Starting position of query result set
   *
   * Minimum: 0
   *
   * Maximum: 9999
   *
   * @default 0
   */
  offset?: number
  /** Optional term that will search for this string in product name or sku */
  query?: string
  /** Optional term to sort results */
  sort?: ProductSort
}

export interface ProductSort {
  /**
   * The order to sort the query results
   *
   * @default descending
   */
  order: ProductSearchSortOrder
  /**
   * The type of sort to perform
   *
   * @default "last_updated"
   */
  type: ProductSearchSortType
}

export interface ProductSearchFilter {
  /** Required array of one string for the 'contains' or 'after' operator. Required array of one or more strings for the 'in' operator. Not used for all other operators */
  argument?: string[]
  /** Required when type is 'attribute'. Specifies the attribute field to compare */
  attribute_id?: string
  /** The type of comparison to perform */
  operator: ProductSearchFilterOperator
  /** The field on which to filter */
  type: ProductSearchFilterType
}

export interface UpdateAttributesParams {
  /** Object containing attribute IDs and values */
  attributes: Record<string, string[]>
  /** Product ID */
  id: string
}

export interface UpdateProductCategoryParams {
  /** Product ID */
  id: string
  /** IDs of product categories */
  product_categories: {
    /** Product category ID */
    product_category_id: string
  }[]
}

export interface UpdateFeaturedImageParams {
  /** Asset ID */
  asset_id: string
  /** Product ID */
  id: string
}

export interface UpdateParentProductParams {
  /** Product ID */
  id: string
  /** Parent Product ID */
  parent_product_id: string
}

export interface UpdateProductTypeParams {
  /** Product ID */
  id: string
  /** Product Type ID */
  product_type_id: string
}

export type ProductSearchExpand = 'attributes'

export type ProductSearchSortType =
  | 'created'
  | 'last_updated'
  | 'name'
  | 'product_type_name'
  | 'sku'

export type ProductSearchSortOrder = 'ascending' | 'descending'

export type ProductSearchFilterType =
  | 'name'
  | 'sku'
  | 'product_type'
  | 'featured_image'
  | 'attribute'
  | 'search_parents_via_variants'
  | 'exclude_parents'
  | 'exclude_variants'
  | 'created_timestamp'
  | 'last_updated_timestamp'

export type ProductSearchFilterOperator =
  | 'contains'
  | 'has_value'
  | 'in'
  | 'is_empty'
  | 'after'
