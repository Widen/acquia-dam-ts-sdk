import type { ProductSearchFilter, ProductSort } from './requests'

export interface CreateProductResult {
  product_id: string
}

export interface GetProductResult {
  attributes: Record<string, Attribute> | null
  created_date: Date
  featured_image: {
    id: string
    url: string
  } | null
  last_updated_timestamp: Date
  name: string
  parent_product: {
    parent_product_id: string
  } | null
  product_categories: {
    product_categories: ProductCategory[]
  }
  product_id: string
  product_type: {
    name: string
    product_type_id: string
  } | null
  sku: string
}

export interface ProductCategory {
  name: string
  product_category_id: string
  sub_category: ProductCategory | null
}

export interface Attribute {
  attribute_group?: {
    attribute_group_id: string
    name: string
  } | null
  attribute_id: string
  import_only: boolean | null
  name: string
  type: string
  values: string[]
}

export interface ListChannelsResult {
  item_type: string
  items: {
    channel_id: string
    name: string
  }[]
  limit: number
  offset: number
  total_count: number
}

export interface ListProductsByChannelResult {
  channel_id: string
  channel_name: string
  item_type: string
  items: Product[]
  limit: number
  offset: number
  total_count: number
}

export interface ListProductCategoriesResult {
  item_type: string
  items: {
    name: string
    product_category_id: string
  }[]
  limit: number
  offset: number
  total_count: number
}

export interface ListProductTypesResult {
  item_type: string
  items: {
    name: string
    product_type_id: string
  }[]
  limit: number
  offset: number
  total_count: number
}

export interface SearchProductsResult {
  expanded: {
    attributes?: boolean
  }
  filters: ProductSearchFilter[]
  item_type: string
  items: Product[]
  limit: number
  offset: number
  query: string | null
  sort: ProductSort
  total_count: number
}

export type Product = GetProductResult
