import type { MetadataFieldType } from 'apis/metadata/requests'

export interface GetMetadataFieldValueResult {
  _links: {
    self: string
    vocabulary: string
  }
  index: number
  value: string
}

export interface ListFieldValuesResult {
  _links: { self: string }
  vocabulary: string[]
}

export interface ListMetadataTypesResult {
  types: {
    fields: {
      discriminator: string
      displayKey: string
      displayName: string
      editable: boolean
      itemList?: { items: { displayName: string; uuid: string }[] }
      required: boolean
      uuid: string
    }[]
    name: string
    use: string
    uuid: string
  }[]
}

export interface ListViewableMetadataFieldsResult {
  fields: {
    display_key: string
    display_name: string
    field_type: MetadataFieldType
    metadata_types: string[]
  }[]
}
