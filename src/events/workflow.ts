export interface DeliverableStatusChangedEvent {
  deliverable_key: string
  new_status: DeliverableStatus
  old_status: DeliverableStatus
}

export interface ProjectCreatedEvent {
  project_id: string
  title: string
}

export type DeliverableStatus =
  | 'NEEDS_SETUP'
  | 'NEEDS_PROOF'
  | 'NEEDS_PROOF_WITH_EDITS'
  | 'IN_REVIEW'
  | 'REVIEW_COMPLETE'
  | 'CLOSED'
