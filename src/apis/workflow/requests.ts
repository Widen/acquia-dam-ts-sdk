export interface AddDeliverableParams {
  /** Description for the deliverable */
  description?: string
  /** Due date for the deliverable */
  due_date: Date
  /** Name for the deliverable */
  name: string
  /** Project ID to add the deliverable to */
  project_id: string
  /** Email of the user who provides the proof */
  proof_provider: string
  /** Array of stages for the deliverable */
  stages: Stage[]
  /** Date to start the deliverable */
  start_date: Date
}

export interface Stage {
  /** Array of emails for the commentors */
  commenters?: string[]
  /** Due date for the stage */
  due_date: Date
  /** Stage name */
  name: string
  /** Array of emails for the reviewers. At least one reviewer is required */
  reviewers: string[]
}

export interface CloseDeliverableParams {
  /** Deliverable ID */
  deliverable_id: string
  /** Filename to upload the asset with */
  filename?: string
  /** Project ID */
  project_id: string
  /** Upload profile to upload the deliverable with */
  upload_profile?: string
}

export interface CreateProjectParams {
  /** Project description */
  description: string
  /** End date. Must be after the start date */
  end_date: Date
  /** Project name */
  name: string
  /** Owner email. Uses the calling user's email if not provided */
  owner?: string
  /** Project manager email */
  project_manager: string
  /** Must be before the end date and not in the past */
  start_date: Date
  /** List of UUIDs or Names (not both) of workgroups */
  workgroups?: string[]
}

export interface GetProjectParams {
  /** Request additional response data */
  expand?: WorkflowProjectExpands[]
  /** Project ID */
  project_id: string
}

export interface GetDeliverableParams {
  /** Deliverable ID */
  deliverable_id: string
  /** Optional array containing additional fields to add to the response */
  expand?: DeliverableExpand[]
  /** Project ID */
  project_id: string
}

export interface ListDeliverablesParams {
  /** Optional array containing additional fields to add to the response */
  expand?: DeliverableExpand[]
  /** Project ID */
  project_id: string
}

export interface UploadProofParams {
  /** Size of the file in bytes */
  content_length: number
  /** Deliverable ID */
  deliverable_id: string
  /** Filename for the proof */
  filename: string
  /** Project ID */
  project_id: string
  /** URL of the proof to upload. Must be a publicly accessible URL */
  url: string
}

export type DeliverableExpand =
  | 'download_link'
  | 'file_properties'
  | 'proof_url'

export type WorkflowProjectExpands = 'request_fields'
