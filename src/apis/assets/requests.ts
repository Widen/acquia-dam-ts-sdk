export interface AssetById {
  external_id?: never
  filename?: never
  /** Asset UUID */
  id: string
}

export interface AssetByFilename {
  external_id?: never
  /** Asset Filename */
  filename: string
  id?: never
}

export interface AssetByExtId {
  /** Asset External ID (Embed ID) */
  external_id: string
  filename?: never
  id?: never
}

export type IdentifyAsset = AssetByExtId | AssetByFilename | AssetById

export type CategoriesParams = IdentifyAsset & {
  /** Array of 1 or more category IDs (UUIDs) */
  categories: string[]
}

export type CollectionsParams = IdentifyAsset & {
  /** Array of 1 or more collection IDs (UUIDs) */
  collections: string[]
}

export interface CompleteChunkedUploadParams {
  /** Session ID for this chunked upload as returned by the Start Chunked Upload call Example: eyJhbGciOiJIUzUxMiJ9. */
  session_id: string
  /** Array of tags returned by the Upload Chunk calls. Order is not important  */
  tags: string[]
}

export interface BaseCreateAssetParams {
  /** Asset Filename */
  filename: string
  /** Optional metadata to apply to new Asset */
  metadata?: Record<string, string[]>
  /** Upload Profile Name */
  profile: string
}

export interface CreateAssetWithUrl {
  file?: never
  file_id?: never
  /** Public link to file for upload */
  url: string
}

export interface CreateAssetWithFileContent {
  /** File content for upload */
  file: string | Blob
  file_id?: never
  url?: never
}

export interface CreateAssetWithChunkedUpload {
  file?: never
  /** `file_id` as returned by the Complete Chunked Upload endpoint*/
  file_id: string
  url?: never
}

export type GetAssetParams = IdentifyAsset & {
  /** Optional array containing additional fields to add to the response */
  expand?: AssetExpand[]
  /** Optional parameter specifying the version to be retrieved */
  version_id?: string
}

export type RenameAssetParams = IdentifyAsset & {
  /** The new filename for the asset */
  new_filename: string
}

export interface BasicSearchParams {
  /** List of data items to expand on the result set */
  expand?: AssetSearchExpand[]
  /** List of data items to facet on the result set. For more details on faceting, see this [Acquia Developer Portal post](https://dev.acquia.com/blog/new-faceted-asset-search) */
  facet?: AssetSearchFacet[]
  /**
   * If true, archived assets will be returned in the results, if the user associated with the access token has permission to view archived assets.
   *
   * @default false
   */
  include_archived?: boolean
  /**
   * If true, deleted assets will be returned in the results, if the user associated with the access token has permission to view deleted assets.
   *
   * @default false
   */
  include_deleted?: boolean
  /**
   * Numeric limit of the total number of results to retrieve
   *
   * Minimum: 1
   *
   * Maximum: 100
   *
   * @default 100
   */
  limit?: number
  /**
   * Starting position of query result set. For more details on when to use an offset and when to use scrolling, see this [Acquia Developer Portal post](https://dev.acquia.com/blog/pagination-search)
   *
   * Minimum: 0
   *
   * Maximum: 10000
   *
   * @default 0
   */
  offset?: number
  /** DAM quicksearch query. Uses the same quick search syntax used within the Acquia DAM web UI. For more information on the format of a query string, see [Quick Search Help](https://community.acquia.com/acquiadam/s/article/How-do-I-search-for-assets) */
  query?: string
  /**
   * If true, a scroll_id is included with the results to allow scrolling through large result sets.
   *
   * @default false
   */
  scroll?: boolean
  /**
   * If true, will include searching of document text in your search results.
   *
   * @default false
   */
  search_document_text?: boolean
  /**
   * This field orders the search result set. The value can be prefixed with a negative sign (-) to sort in descending order.
   *
   * @default "-created_date" (newest assets first)
   */
  sort?: string
}

export interface ScrollSearchParams {
  /** List of data items to expand on result set */
  expand?: AssetSearchExpand[]
  /** `scroll_id` as returned by the original List By Search Query request */
  scroll_id: string
}

export type UpdateMetadataParams = IdentifyAsset & {
  /** Key-value pairs. Key is the metadata field key, and the value is the desired value as a string array. */
  fields: Record<string, string[]>
  /** List of fields to update. (Other fields included in the body will be ignored.) If no patch parameter is sent, all fields included in request will be updated */
  patch?: string[]
}

export type UpdateMetadataTypeParams = IdentifyAsset & {
  /** The UUID of the desired metadata type */
  metadata_type_uuid: string
}

export type RegisterIntegrationLinkParams = IdentifyAsset & {
  /** Text to describe the link. Max 255 characters */
  description: string
  /** url to the page containing the Asset link */
  url?: string
}

export type UpdateSecurityParams = IdentifyAsset & {
  /** Updates to Asset Groups require at least one value */
  asset_groups?: string[]
  /** The date and time the asset expires */
  expiration_date?: Date | null
  /** List of properties to update. IMPORTANT: When using `all` properties not sent in the request will be set to `null` */
  patch?: SecurityPatchValues[]
  /** The date and time the asset is released */
  release_date?: Date | null
}

export type UploadAlternatePreviewParams = IdentifyAsset & {
  /** Binary file of the alternate preview file for this asset */
  file: string | Blob
}

export interface UploadChunkParams {
  /** The chunk number. Must be between 1 and 10,000 */
  chunk_number: number
  /** Binary file chunk for upload. Cannot be greater than 100MB, and must be at least 5MB unless it's the last chunk */
  file: string | Blob
  /** Session ID for this chunked upload as returned by the Start Chunked Upload call */
  session_id: string
}

export type SearchAssetsParams = BasicSearchParams | ScrollSearchParams

export type AssetSearchExpand =
  | 'asset_properties'
  | 'file_properties'
  | 'metadata'
  | 'metadata_info'
  | 'metadata_vocabulary'
  | 'security'
  | 'thumbnails'

export type AssetExpand = AssetSearchExpand | 'status'

export type AssetSearchFacet = 'file_types' | 'categories' | 'metadata'

export type CreateAssetParams = BaseCreateAssetParams &
  (
    | CreateAssetWithFileContent
    | CreateAssetWithUrl
    | CreateAssetWithChunkedUpload
  )

export type SecurityPatchValues =
  | 'all'
  | 'asset_groups'
  | 'expiration_date'
  | 'release_date'
