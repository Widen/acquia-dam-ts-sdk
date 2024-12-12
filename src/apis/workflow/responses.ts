export interface AddDeliverableResult {
  deliverable_id: string
  id: string
  project_id: string
}

export interface CreateProjectResult {
  project_id: string
}

export interface GetDeliverableResult {
  _links: {
    download?: string
    project: string
    self: string
  }
  deliverable_id: string
  deliverable_manager: WorkflowUser
  description?: string
  due_date: Date
  expanded: {
    download_link: boolean
    file_properties: boolean
    proof_url: boolean
  }
  file_properties?: {
    file_type: string
    filename: string
    sizes_in_bytes: number
  }
  id: string
  name: string
  proof_provider: WorkflowUser
  proof_url?: string
  status: string
  thumbnails?: {
    large: string
    medium: string
    small: string
  }
}

export interface GetProjectResult {
  _links: {
    deliverables: string
    self: string
    support_files: string
  }
  deliverables: {
    due_date: Date
    id: string
    name: string
    status: string
  }[]
  description: string
  due_date: Date
  expanded: {
    request_fields: boolean
  }
  id: string
  name: string
  project_id: string
  project_manager: WorkflowUser
  start_date: Date
}

export interface ListDeliverablesResult {
  items: GetDeliverableResult[]
}

export interface UploadProofResult {
  deliverable_id: string
  id: string
  project_id: string
  status: string
  thumbnails: {
    large: string
    medium: string
    small: string
  }
}

export interface SupportingFile {
  _links: {
    download: string
    project: string
    self: string
  }
  format_type: string
  id: string
  name: string
  size_in_bytes: number
  upload_date: Date
  uploader: WorkflowUser
}

export interface WorkflowUser {
  email_address: string
  first_name: string
  last_name: string
}

export type GetSupportingFilesResult = SupportingFile[]
export type Deliverable = GetDeliverableResult
export type Project = GetProjectResult
