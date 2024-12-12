import { CollectionType } from 'apis/collections/requests'

export interface CreateCollectionResult {
  assets: { uuid: string }[]
  assetsAddedCount: number
  description: string
  name: string
  numResults: number
  type: CollectionType
  uuid: string
}

export interface ListCollectionsResult {
  item_type: string
  items: {
    _links: {
      assets?: string
    }
    id: string
    title: string
    total_items: number
    type: string
  }[]
  limit: number
  offset: number
  total_count: number
}
