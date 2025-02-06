export interface AddRemoveAssetsParams {
  /** Array of asset IDs to add to the specified collections */
  assets_to_add?: string[]
  /** Array of assets IDs to remove from the specified collections */
  assets_to_remove?: string[]
  /** Array of 1 or more collections to operate on */
  collections: string[]
}

export interface CreateCollectionParams {
  /** An array of asset UUIDs you'd like to add to the Collection */
  assets?: string[]
  /** A description to assign to the Collection */
  description: string
  /** The title to assign to the Collection */
  title: string
}

export interface ListCollectionsParams {
  /**
   * The number of collections to list
   *
   * Minimum: 1
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
  /** Filter for type of collections */
  type: CollectionType
}

export type CollectionType = 'global' | 'private' | 'shared'
