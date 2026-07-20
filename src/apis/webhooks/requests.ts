export interface CreateAssetsWebhookParams {
  /** The URL to deliver webhook payloads to */
  delivery_url: string
  /** The event type to monitor */
  event_type: AssetsEvent
  /**
   * Optional list of metadata field display keys to monitor. Only applicable when event_type
   * is `asset_metadata_value_updated`. If empty, all metadata field changes will
   * trigger the webhook. If specified, only changes to fields in this list will trigger a
   * delivery. The user must have permission to view each field specified; if any field is not
   * accessible, the request will be rejected with a 403 error.  */
  monitored_metadata_fields?: string[]
  /** HMAC signing key */
  secret_key?: string
}

export interface CreateWorkflowWebhookParams {
  /** The event name to monitor */
  event: WorkflowEvent
  /** Where to send the event to */
  target: string
}

export interface EditAssetsWebhookParams {
  /** Whether the webhook is actively running */
  delivery_enabled?: boolean
  /** The URL to deliver webhook payloads to */
  delivery_url?: string
  /** The event type to monitor */
  event_type?: AssetsEvent
  /** Webhook Configuration Id */
  id: string
  /** List of fields to update (other fields included in the body will be ignored). If no patch parameter is sent, all fields included in request will be updated */
  patch?: AssetsWebhookPatch[]
  /** HMAC signing key */
  secret_key?: string
}

export interface ListAssetsWebhooksParams {
  /**
   * Numeric limit of the total number of results to retrieve
   *
   * Minimum: 1
   *
   * Maximum: 10
   *
   * @default 10
   */
  limit: number
  /**
   * Starting position of query result set
   *
   * Minimum: 0
   *
   * @default 0
   */
  offset: number
}

export type AssetsEvent =
  | 'asset_asset_groups_updated'
  | 'asset_categories_updated'
  | 'asset_created'
  | 'asset_deleted'
  | 'asset_expiration_date_updated'
  | 'asset_metadata_value_updated'
  | 'asset_release_date_updated'
  | 'asset_tags_updated'
  | 'asset_version_added'

export type WorkflowEvent = 'DELIVERABLE_STATUS_CHANGED' | 'PROJECT_CREATED'

export type AssetsWebhookPatch =
  | 'delivery_enabled'
  | 'delivery_url'
  | 'event_type'
  | 'secret_key'
