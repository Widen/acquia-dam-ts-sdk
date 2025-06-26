export interface AddMetadataValueParams {
  /** Display key of the controlled vocabulary metadata field */
  displayKey: string
  /** 0-based index of where to insert the new controlled vocabulary value. If omitted, the new value will be added to the end of the list */
  index?: number
  /** The new controlled vocabulary value you wish to add */
  value: string
}

export interface ListViewableMetadataFieldsParams {
  /** A filter that only returns metadata fields with display names alphabetically greater than this value */
  display_name_after?: string
  /** A filter that only returns metadata fields with display names that start with this value  */
  display_name_starts_with?: string
  /** The field type that you want to query */
  field_types?: MetadataFieldType[] | 'all' | 'all_controlled_vocabulary'
  /** The max number of metadata fields returned by this query. Must be between 1 and 100 */
  limit?: number
}

interface BaseUpdateMetadataFieldValue {
  /** Display key of the controlled vocabulary metadata field */
  displayKey: string
  /** The controlled vocabulary value you wish to update */
  existingValue: string
  /** 0-based index of where to re-order the updated controlled vocabulary value. Either `value`, `index`, or both must be provided */
  index?: number
  /** Optional new display name for this controlled vocabulary value. Either `value`, `index`, or both must be provided */
  value?: string
}

export type UpdateMetadataFieldValueParams = BaseUpdateMetadataFieldValue &
  ({ index: number } | { value: string })

export type MetadataFieldType =
  | 'checkboxes'
  | 'date'
  | 'numeric'
  | 'selection_list'
  | 'selection_list_multi'
  | 'text'
  | 'text_long'
  | 'text_multi_line'
  | 'text_short'
