export interface CreateAssetsWebhookResult {
  id: string
}

export interface GetWorkflowWebhookResult {
  event?: 'DELIVERABLE_STATUS_CHANGED' | 'PROJECT_CREATED'
  target: string
}

export interface ListAssetsWebhooksResult {
  item_type: string
  items: GetAssetsWebhookResult[]
  limit: number
  offset: number
  total_count: number
}

export interface ListWorkflowWebhooksResult {
  items: GetWorkflowWebhookResult[]
}

export interface GetAssetsWebhookResult {
  created_by_user: {
    uuid: string
  }
  created_date: Date
  delivery_enabled: boolean
  event_type: string
  last_delivered_date: Date | null
  last_pinged_date: Date | null
  signing_enabled: boolean
  webhook_configuration_id: string
}

export type AssetsWebhook = GetAssetsWebhookResult
export type WorkflowWebhook = GetWorkflowWebhookResult
