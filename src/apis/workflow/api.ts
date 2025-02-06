import { ApiClient } from 'client'
import type {
  AddDeliverableParams,
  CloseDeliverableParams,
  CreateProjectParams,
  GetDeliverableParams,
  GetProjectParams,
  ListDeliverablesParams,
  UploadProofParams,
} from './requests'
import type {
  AddDeliverableResult,
  CreateProjectResult,
  GetDeliverableResult,
  GetProjectResult,
  ListDeliverablesResult,
  GetSupportingFilesResult,
  UploadProofResult,
} from './responses'

export class WorkflowApi {
  private _client: ApiClient

  /**
   * Create an instance of the WorkflowApi class
   *
   * Workflow objects represent projects and deliverables stored in the Acquia Workflow system. The API allows you to retrieve, create, delete, and close deliverables and projects.
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Add a deliverable to a project
   * @param params Information about the request
   * @returns Promise containing information about the added deliverable
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/projects/add-deliverable-to-project}
   */
  public addDeliverable(
    params: AddDeliverableParams
  ): Promise<AddDeliverableResult> {
    const { project_id, ...body } = params
    const path = `workflow/projects/${project_id}/deliverables`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path,
      body,
    })
  }

  /**
   * Close the deliverable. Optionally, provide a `filename` and `upload_profile` to move the deliverable over to Assets
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/deliverables/close-deliverable}
   */
  public closeDeliverable(params: CloseDeliverableParams): Promise<void> {
    const { project_id, deliverable_id, ...body } = params
    const path = `workflow/projects/${project_id}/deliverables/${deliverable_id}/close`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      body,
      path,
    })
  }

  /**
   * Create a new project
   * @param params Information about the request
   * @returns Promise containing the new project's ID
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/projects/create-new-project}
   */
  public createProject(
    params: CreateProjectParams
  ): Promise<CreateProjectResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'workflow/projects',
      body: params,
    })
  }

  /**
   * Delete a deliverable
   * @param project_id Project ID
   * @param deliverable_id Deliverable ID
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/deliverables/delete-deliverable}
   */
  public deleteDeliverable(
    project_id: string,
    deliverable_id: string
  ): Promise<void> {
    const path = `workflow/projects/${project_id}/deliverables/${deliverable_id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Delete a project
   * @param project_id Project ID
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/projects/delete-project}
   */
  public deleteProject(project_id: string): Promise<void> {
    const path = `workflow/projects/${project_id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Retrieve information about a deliverable
   * @param params Information about the request
   * @returns Promise containing information about the deliverable
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/deliverables/retrieve-deliverable-by-id}
   */
  public getDeliverable(
    params: GetDeliverableParams
  ): Promise<GetDeliverableResult> {
    const { deliverable_id, project_id, ...queryStringParams } = params
    const path = `workflow/projects/${project_id}/deliverables/${deliverable_id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
      queryStringParams,
    })
  }

  /**
   * Retrieve information about a project
   * @param params Information about the request
   * @returns Promise containing information about the deliverable
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/projects/retrieve-by-project-id}
   */
  public getProject(params: GetProjectParams): Promise<GetProjectResult> {
    const { project_id, ...queryStringParams } = params
    const path = `workflow/projects/${project_id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
      queryStringParams,
    })
  }

  /**
   * Retrieve all deliverables for a project
   * @param params Information about the request
   * @returns Promise containing a list of deliverables
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/deliverables/retrieve-all-project-deliverables}
   */
  public listDeliverables(
    params: ListDeliverablesParams
  ): Promise<ListDeliverablesResult> {
    const { project_id, ...queryStringParams } = params
    const path = `workflow/projects/${project_id}/deliverables`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
      queryStringParams,
    })
  }

  /**
   * Retrieve all supporting files for a project
   * @param project_id Project ID
   * @returns Promise containing a list of supporting files
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-app-projects/projects/retrieve-supporting-files}
   */
  public listSupportingFiles(
    project_id: string
  ): Promise<GetSupportingFilesResult> {
    const path = `workflow/projects/${project_id}/support-files`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Upload proof to a deliverable
   * @param params Information about the request
   * @returns Promise containing information about the deliverable
   */
  public uploadProof(params: UploadProofParams): Promise<UploadProofResult> {
    const { project_id, deliverable_id, ...body } = params
    const path = `workflow/projects/${project_id}/deliverables/${deliverable_id}/proofs`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path,
      body,
    })
  }
}
