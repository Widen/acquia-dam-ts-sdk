import { ApiClient } from 'client'
import type {
  CreateAssetsWebhookParams,
  CreateWorkflowWebhookParams,
  EditAssetsWebhookParams,
  ListAssetsWebhooksParams,
  WorkflowEvent,
} from './requests'
import type {
  CreateAssetsWebhookResult,
  GetAssetsWebhookResult,
  GetWorkflowWebhookResult,
  ListAssetsWebhooksResult,
  ListWorkflowWebhooksResult,
} from './responses'

export class WebhooksApi {
  private _client: ApiClient

  /**
   * Create an instance of the WebhooksApi class.
   *
   * Create, list, read, ping, edit, and delete Acquia DAM webhook configurations. Create, List, and Delete Workflow Webhooks
   *
   * @param client Provide an instance of ApiClient.
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Create a new Assets webhook
   * @param params Information about the request
   * @returns Promise containing the new webhook configuration ID
   * @see {@link https://widenv2.docs.apiary.io/#reference/acquia-dam-webhooks/manage-acquia-dam-webhooks/create-webhook}
   */
  public createAssetsWebhook(
    params: CreateAssetsWebhookParams
  ): Promise<CreateAssetsWebhookResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'webhooks/configurations',
      body: params,
    })
  }

  /**
   * Create a Workflow webhook
   * @param params Information about the request
   * @returns Promise containing information about the created webhook
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-webhooks/webhooks/add-new-webhook}
   */
  public createWorkflowWebhook(
    params: CreateWorkflowWebhookParams
  ): Promise<GetWorkflowWebhookResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'workflow/webhooks',
      body: params,
    })
  }

  /**
   * Delete an Assets webhook
   * @param id Assets Webhook configuration ID
   * @returns Promise containing no information
   */
  public deleteAssetsWebhook(id: string): Promise<void> {
    const path = `webhooks/configurations/${id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Delete a Workflow webhook
   * @param event The event name
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-webhooks/webhooks/delete-webhook}
   */
  public deleteWorkflowWebhook(event: WorkflowEvent): Promise<void> {
    const body = { event }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path: 'workflow/webhooks',
      body,
    })
  }

  /**
   * Edit an Assets webhook configuration
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/acquia-dam-webhooks/manage-acquia-dam-webhooks/edit-webhook}
   */
  public editAssetsWebhook(params: EditAssetsWebhookParams): Promise<void> {
    const { id, patch, ...body } = params
    const path = `webhooks/configurations/${id}`
    const queryStringParams = { patch: patch ?? Object.keys(body) }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      body,
      path,
      queryStringParams,
    })
  }

  /**
   * Retrieve information about an Assets webhook
   * @param id Webhook configuration ID
   * @returns Promise containing information about a webhook
   * @see {@link https://widenv2.docs.apiary.io/#reference/acquia-dam-webhooks/manage-acquia-dam-webhooks/get-webhook-by-id}
   */
  public getAssetsWebhook(id: string): Promise<GetAssetsWebhookResult> {
    const path = `webhooks/configurations/${id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Retrieve a list of Assets webhooks
   * @param params Information about the request
   * @returns Promise containing a list of Assets webhooks
   * @see {@link https://widenv2.docs.apiary.io/#reference/acquia-dam-webhooks/manage-acquia-dam-webhooks/list-webhooks}
   */
  public listAssetsWebhooks(
    params?: ListAssetsWebhooksParams
  ): Promise<ListAssetsWebhooksResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'webhooks/configurations',
      queryStringParams: params,
    })
  }

  /**
   * Retrieve a list of active Workflow webhooks
   * @returns Promise containing a list of Workflow webhooks
   * @see {@link https://widenv2.docs.apiary.io/#reference/workflow-webhooks/webhooks/list-all-webhooks}
   */
  public listWorkflowWebhooks(): Promise<ListWorkflowWebhooksResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'workflow/webhooks',
    })
  }

  /**
   * Ping an Assets Webhook
   * @param id Assets Webhook Configuration ID
   * @returns Promise containing no information
   * @see {@link https://widenv2.docs.apiary.io/#reference/acquia-dam-webhooks/manage-acquia-dam-webhooks/ping-webhook-by-id}
   */
  public pingAssetsWebhook(id: string): Promise<void> {
    const path = `webhooks/configurations/${id}/ping`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }
}
