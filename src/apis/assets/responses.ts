import type { MetadataFieldType } from 'apis/metadata/requests'

export interface CompleteChunkedUploadResult {
  file_id: string
}

export interface CreatedAsset {
  _links: {
    self: string
  }
}

export interface CreateAssetResult extends CreatedAsset {
  id: string | null
}

export interface GetAssetResult {
  _links: {
    download?: string
  }
  asset_properties: AssetPropertiesExpand | null
  created_date: Date
  current_version: boolean
  deleted_date: Date | null
  embeds: null
  expanded: {
    asset_properties: boolean
    download_link?: boolean
    file_properties: boolean
    metadata: boolean
    metadata_info: boolean
    metadata_vocabulary: boolean
    security: boolean
    thumbnails: boolean
  }
  external_id: string
  file_properties: FilePropertiesExpand | null
  file_upload_date: Date
  filename: string
  id: string
  last_update_date: Date
  metadata: MetadataExpand | null
  metadata_info: MetadataInfoExpand | null
  released_and_not_expired: boolean
  security: SecurityExpand | null
  status: StatusExpand | null
  thumbnails: ThumbnailsExpand | null
  version_id: string
}

export interface GetMetadataResult {
  fields: Record<string, string[]>
}

export interface GetSecurityResult {
  asset_groups: string[]
  expiration_date: Date | null
  release_date: Date | null
}

export interface ListAssetGroupsResult {
  item_type: string
  items: {
    name: string
    uuid: string
  }[]
  total_count: number
}

export interface ListIntegrationLinksResult {
  integrationLinks: {
    assetUuid: string
    description: string
    updatedDate: Date
    url: string | null
    uuid: string
  }[]
}

export interface UploadProfile {
  asset_groups: string[]
  immediate_release: boolean
  name: string
  release_date: Date | null
}

export interface ListFileFormatsResult {
  count: number
  formats: {
    description: string
    name: string
  }[]
}

export interface ListVersionsResult {
  numResults: number
  uuid: string
  versions: {
    dateAdded: Date
    dateLastEdited: Date
    externalId: string
    fileFormat: string
    finalized: boolean
    name: string
    previews: {
      preview125: string
      preview160: string
      preview300: string
      preview600: string
      preview2048: string
      templated: string
    }
    size: string
    type: string
    uuid: string
    versionNumber: number
  }[]
}

export interface RegisterIntegrationLinkResult {
  assetUuid: string
  description: string
  updatedDate: Date
  url: string | null
  uuid: string
}

export interface SearchAssetsResult {
  facets: {
    categories?: CategoryFacet[]
    file_types?: FileTypeFacet[]
    metadata?: MetadataFacet[]
  } | null
  include_archived: boolean
  include_deleted: boolean
  item_type: string
  items: GetAssetResult[]
  limit: number
  offset: number
  query: string | null
  query_explained: string
  query_syntax_ok: boolean
  scroll_id: string | null
  scroll_timeout: string | null
  sort: string
  sort_explained: string
  total_count: number
}

export interface CategoryFacet {
  count: number
  id: string
  name: string
  path: string
  search_query: string
}

export interface FileTypeFacet {
  count: number
  name: string
  search_query: string
}

export interface MetadataFacet {
  display_key: string
  display_name: string
  values: {
    count: number
    search_query: string
    value?: string
    values?: string[]
  }[]
}

export interface AssetPropertiesExpand {
  cutline_caption: string
  favorite: boolean
  popularity: number
}

export interface FilePropertiesExpand {
  format: string
  format_type: string
  image_properties: {
    aspect_ratio: number
    height: number | null
    width: number | null
  } | null
  size_in_bytes: number
  size_in_kbytes: number
  video_properties: {
    aspect_ratio: number | null
    duration: number | null
    height: number | null
    width: number | null
  } | null
}

export interface MetadataInfoExpand {
  field_set: string
  field_set_fields: {
    controlled_vocabulary: boolean
    editable: boolean
    field_type: MetadataFieldType
    key: string
    label: string
    required: boolean
    type: MetadataFieldType
    vocabulary: string[] | null
  }[]
}

export interface StatusExpand {
  upload_progress: 'pending' | 'verifying' | 'complete'
}

export interface Thumbnail {
  url: string
  valid_until: Date
}

export interface StartChunkedUploadResult {
  session_id: string
}

export interface UploadChunkResult {
  tag: string
}

export interface ThumbnailsExpand {
  '125px': Thumbnail
  '160px': Thumbnail
  '300px': Thumbnail
  '600px': Thumbnail
  '2048px': Thumbnail
}

export type ListUploadProfilesResult = UploadProfile[]
export type Asset = GetAssetResult
export type MetadataExpand = GetMetadataResult
export type SecurityExpand = GetSecurityResult
