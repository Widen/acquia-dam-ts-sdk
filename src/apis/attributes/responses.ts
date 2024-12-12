export interface ListAttributesResult {
  item_type: string
  items: Attribute[]
  limit: number
  offset: number
  total_count: number
}

export interface ListAttributeVocabularyResult {
  vocabulary: string[]
}

export interface Attribute {
  attribute_group: {
    attribute_group_id: string
    name: string
  } | null
  attribute_id: string
  import_only: boolean
  name: string
  type: string
}
