export interface ListAssetDownloadsResponse {
  items: DownloadAssetEvent[]
  pagination_token: string | null
  total_count: number
}

export interface ListAssetSharesResponse {
  items: ShareAssetEvent[]
  pagination_token: string | null
  total_count: number
}

export interface ListAssetViewsResponse {
  items: ViewAssetEvent[]
  pagination_token: string | null
  total_count: number
}

export interface DownloadAssetEvent {
  asset_properties: AssetProperties
  conversion_properties: ConversionProperties
  file_properties: FileProperties
  intended_use_properties: IntendedUseProperties
  referrer: string
  timestamp: Date
  user_properties: UserProperties
}

export interface ShareAssetEvent {
  asset_properties: AssetProperties
  referrer: string
  timestamp: Date
  user_properties: UserProperties
}

export interface ViewAssetEvent {
  asset_properties: AssetProperties
  file_properties: FileProperties
  intended_use_properties: IntendedUseProperties
  referrer: string
  timestamp: Date
  user_properties: UserProperties
}

export interface AssetProperties {
  id: string
}

export interface ConversionProperties {
  output_file_format: string | null
  output_file_type: string | null
}

export interface FileProperties {
  file_type: string
  format: string
  size_in_bytes: number
}

export interface IntendedUseProperties {
  value: string | null
}

export interface UserProperties {
  id: string | null
}
