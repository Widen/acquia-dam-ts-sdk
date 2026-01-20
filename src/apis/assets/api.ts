import { CategoriesApi } from 'apis/categories/api'
import { ListCategoriesResult } from 'apis/categories/responses'
import { CollectionsApi } from 'apis/collections/api'
import { ListCollectionsParams } from 'apis/collections/requests'
import { ListCollectionsResult } from 'apis/collections/responses'
import { AcquiaDAMError, ApiClient } from 'client'
import type {
  CategoriesParams,
  CollectionsParams,
  CompleteChunkedUploadParams,
  CreateAssetParams,
  GetAssetParams,
  IdentifyAsset,
  RegisterIntegrationLinkParams,
  RenameAssetParams,
  SearchAssetsParams,
  UpdateMetadataParams,
  UpdateMetadataTypeParams,
  UpdateSecurityParams,
  UploadAlternatePreviewParams,
  UploadChunkParams,
} from './requests'
import type {
  CompleteChunkedUploadResult,
  CreateAssetResult,
  ListAssetGroupsResult,
  StartChunkedUploadResult,
  UploadChunkResult,
  ListVersionsResult,
  GetAssetResult,
  GetMetadataResult,
  GetSecurityResult,
  ListUploadProfilesResult,
  SearchAssetsResult,
  ListFileFormatsResult,
  ListIntegrationLinksResult,
  RegisterIntegrationLinkResult,
  CreatedAsset,
} from './responses'

export class AssetsApi {
  private _client: ApiClient

  /**
   * Create an instance of the AssetsApi class.
   *
   * Asset objects represent stored files in the DAM system. The API allows you to create, update, and delete Assets. You can search for assets, matching specific search criteria or load an individual asset by unique ID.
   *
   * @param client Provide an instance of ApiClient.
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets}
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Assets}
   */
  constructor(client: ApiClient) {
    this._client = client
  }

  /**
   * Add an asset to one or more categories.
   * For bulk handling of assets, use the CategoriesApi.
   * @param params Information about the request
   * @returns Promise containing no data
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Categories/operation/updateCategoryAssets}
   */
  public async addAssetToCategories(params: CategoriesParams): Promise<void> {
    const { categories } = params
    const id = await this.findAssetId(params)

    return new CategoriesApi(this._client).addOrRemoveAsets({
      assets_to_add: [id],
      categories,
    })
  }

  /**
   * Add an asset to one or more collections.
   * For bulk handling of assets, use the CollectionsApi.
   * @param params Information about the request
   * @returns Promise containing no data
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Collections/operation/addOrRemoveAssetsFromCollections}
   */
  public async addAssetToCollections(params: CollectionsParams): Promise<void> {
    const { collections } = params
    const id = await this.findAssetId(params)

    return new CollectionsApi(this._client).addOrRemoveAssets({
      assets_to_add: [id],
      collections,
    })
  }

  /**
   * Call this after all file chunks have uploaded to signal the completion of a chunked upload session.
   * After calling this endpoint, provide the `file_id` to the `create` function to create a new asset.
   * @param params Information about the request
   * @returns Promise containing the `file_id`
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/uploadChunk3}
   */
  public completeChunkedUpload(
    params: CompleteChunkedUploadParams
  ): Promise<CompleteChunkedUploadResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'uploads/chunks/complete',
      body: params,
    })
  }

  /**
   * Create a new asset using a URL, file data, or a `file_id` provided by a chunked upload.
   * For larger files, use a chunked upload.
   * @param params Information about the request
   * @returns Promise containing the asset's `id`
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/uploadAsset}
   */
  public async createAsset(
    params: CreateAssetParams
  ): Promise<CreateAssetResult> {
    const body = new FormData()
    body.append('profile', params.profile)
    body.append('filename', params.filename)

    if (params.metadata) {
      body.append('metadata', JSON.stringify(params.metadata))
    }

    if (params.file) {
      body.append('file', params.file)
    } else if (params.file_id) {
      body.append('file_id', params.file_id)
    } else if (params.url) {
      body.append('url', params.url)
    } else {
      throw new AcquiaDAMError(
        'SDK Error',
        undefined,
        'One of file, file_id, url must be defined'
      )
    }

    const result = await this._client.sendRequest<CreatedAsset>({
      apiVersion: '2',
      method: 'POST',
      path: 'uploads',
      body,
    })
    const id = result._links.self.split('/').pop() || null

    return {
      ...result,
      id,
    }
  }

  /**
   * Remove an alternate preview from an asset.
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/alternatePreviewDelete}
   */
  public async deleteAlternatePreview(params: IdentifyAsset): Promise<void> {
    const id = await this.findAssetId(params)
    const path = `assets/${id}/alternatepreview`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Send an asset to the Pending Delete queue.
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetDelete}
   */
  public async deleteAsset(params: IdentifyAsset): Promise<void> {
    const id = await this.findAssetId(params)
    const path = `assets/${id}`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'DELETE',
      path,
    })
  }

  /**
   * Find an asset's UUID by searching via filename or embed ID (external ID).
   * @param params Information about the request
   * @returns Promise containing the asset's `id`
   */
  public async findAssetId(params: IdentifyAsset): Promise<string> {
    let query = ''

    if (params.id) {
      return params.id
    } else if (params.external_id) {
      query = `embedid: ${params.external_id}`
    } else if (params.filename) {
      query = `filename: {${params.filename}}`
    } else {
      throw new AcquiaDAMError(
        'SDK Error',
        undefined,
        'One of id, external_id, filename must be defined'
      )
    }

    const result = await this.searchAssets({
      limit: 1,
      query,
    })

    if (!result.items[0]) {
      throw new AcquiaDAMError(
        'SDK Error',
        undefined,
        `Unable to find asset using query ${query}`
      )
    }

    return result.items[0].id
  }

  /**
   * Retrieve information about an individual asset.
   * @param params Information about the request
   * @returns Promise containing the asset data
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetRetrieveById}
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetRetrieveByIdAndVersion}
   */
  public async getAsset(params: GetAssetParams): Promise<GetAssetResult> {
    const {
      external_id: _1,
      filename: _2,
      id: _3,
      version_id,
      ...queryStringParams
    } = params
    const id = await this.findAssetId(params)

    let path = `assets/${id}`

    if (version_id) {
      path += `/versions/${version_id}`
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      queryStringParams,
      path,
    })
  }

  /**
   * Metadata subresource simply returns the `metadata` property of the asset.
   * The object structure returned by search endpoint and this method are identical.
   * All assigned fields for the asset will be included. Empty fields are repesented with an empty array.
   * @param params Information about the request
   * @returns Promise containing the asset's metadata only
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetMetadataRetrieve}
   */
  public async getMetadata(params: IdentifyAsset): Promise<GetMetadataResult> {
    const id = await this.findAssetId(params)
    const path = `assets/${id}/metadata`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Security subresource simply returns the `security` property of the asset.
   * The object structure returned by search endpoint and this method are identical.
   * @param params Information about the request
   * @returns Promise containing the asset's security only
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetRetrieveSecurity}
   */
  public async getSecurity(params: IdentifyAsset): Promise<GetSecurityResult> {
    const id = await this.findAssetId(params)
    const path = `assets/${id}/security`

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path,
    })
  }

  /**
   * Get a list of Asset Groups that the calling User has permission to view.
   * @returns Promise containing a list of security groups
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetGroupsGet}
   */
  public listAssetGroups(): Promise<ListAssetGroupsResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'assets/assetgroups',
    })
  }

  /**
   * Retrieve a list of child categories.
   * @param categoryPath Optional parent category name. If omitted, the top-level categories will be returned.
   * @returns Promise containing a list of asset categories
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Categories/operation/listAssetCategories}
   */
  public listCategories(categoryPath?: string): Promise<ListCategoriesResult> {
    return new CategoriesApi(this._client).listCategories(categoryPath)
  }

  /**
   * Retrieve a list of collections.
   * @param params Information about the request
   * @returns Promise containing a list of collections
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Collections/operation/listCollections}
   */
  public listCollections(
    params: ListCollectionsParams
  ): Promise<ListCollectionsResult> {
    return new CollectionsApi(this._client).listCollections(params)
  }

  /**
   * Retrieve a list of integration links
   * @returns a Promise containing a list of integration links
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Integration-Links/operation/getIntegrationLinks}
   */
  public listIntegrationLinks(): Promise<ListIntegrationLinksResult> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path: 'integrationlink',
    })
  }

  /**
   * Retrieve a list of upload profiles.
   * @returns a Promise containing a list of Upload Profiles
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/uploadAssetProfilesList}
   */
  public listUploadProfiles(): Promise<ListUploadProfilesResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'uploads/profiles',
    })
  }

  /**
   * Retrieve a list of recognized file formats.
   * @returns a Promise containing a list of file formats
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/File-Formats/operation/getFileFormats}
   */
  public listFileFormats(): Promise<ListFileFormatsResult> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path: 'fileformats',
    })
  }

  /**
   * Retrieve a list of asset versions.
   * @param params Information about the request
   * @returns Promise containing a list of asset versions
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Assets/operation/getAssetVersions}
   */
  public async listVersions(
    params: IdentifyAsset
  ): Promise<ListVersionsResult> {
    const id = await this.findAssetId(params)
    const path = `asset/uuid/${id}/assetversions`

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'GET',
      path,
    })
  }

  /**
   * Remove an asset from one or more categories.
   * For bulk handling of assets, use the CategoriesApi.
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Categories/operation/updateCategoryAssets}
   */
  public async removeAssetFromCatgories(
    params: CategoriesParams
  ): Promise<void> {
    const { categories } = params
    const id = await this.findAssetId(params)

    return new CategoriesApi(this._client).addOrRemoveAsets({
      assets_to_remove: [id],
      categories,
    })
  }

  /**
   * Remove an asset from one or more collections.
   * For bulk handling of assets, use the CollectionsApi.
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Collections/operation/addOrRemoveAssetsFromCollections}
   */
  public async removeAssetFromCollections(
    params: CollectionsParams
  ): Promise<void> {
    const { collections } = params
    const id = await this.findAssetId(params)

    return new CollectionsApi(this._client).addOrRemoveAssets({
      assets_to_remove: [id],
      collections,
    })
  }

  /**
   * Remove an integration link.
   * @param uuid The Integration Link UUID
   * @returns a Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Integration-Links/operation/removeLink}
   */
  public removeIntegrationLink(uuid: string): Promise<void> {
    return this._client.sendRequest({
      apiVersion: '1',
      method: 'DELETE',
      path: `integrationlink/${uuid}`,
    })
  }

  /**
   * Register a new Integration Link.
   * @param params Information about the request
   * @returns a Promise containing information about the created Integration Link
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Integration-Links/operation/createLink}
   */
  public async registerIntegrationLink(
    params: RegisterIntegrationLinkParams
  ): Promise<RegisterIntegrationLinkResult> {
    const { description, url } = params
    const assetUuid = await this.findAssetId(params)
    const body = {
      assetUuid,
      description,
      url,
    }

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'POST',
      path: 'integrationlink',
      body,
    })
  }

  /**
   * Change an asset's `filename`
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetRename}
   */
  public async renameAsset(params: RenameAssetParams): Promise<void> {
    const { new_filename } = params
    const id = await this.findAssetId(params)
    const path = `assets/${id}/filename`
    const body = {
      filename: new_filename,
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      body,
      path,
    })
  }

  /**
   * Search for a list of assets via a query
   * @param params Information about the request
   * @returns Promise containing a list of assets that meet the search criteria
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetListBySearchQuery}
   */
  public searchAssets(
    params?: SearchAssetsParams
  ): Promise<SearchAssetsResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'GET',
      path: 'assets/search',
      queryStringParams: params,
    })
  }

  /**
   * Begins a chunked uploading session. The `session_id` in the response must be used for subsequent upload chunk and complete chunk calls. This `session_id` is good for 7 days.
   * @returns Promise containing the `session_id`
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/uploadChunk0}
   */
  public startChunkedUpload(): Promise<StartChunkedUploadResult> {
    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'uploads/chunks/start',
    })
  }

  /**
   * Update an asset's `metadata` fields
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetMetadataUpdate}
   */
  public async updateMetadata(params: UpdateMetadataParams): Promise<void> {
    const { external_id: _1, filename: _2, id: _3, patch, ...body } = params
    const id = await this.findAssetId(params)
    const path = `assets/${id}/metadata`
    const queryStringParams = {
      patch: patch ?? Object.keys(body.fields).join(','),
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      body,
      path,
      queryStringParams,
    })
  }

  /**
   * Change an asset's metadata type
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v1#tag/Assets/operation/updateMetadataType}
   */
  public async updateMetadataType(
    params: UpdateMetadataTypeParams
  ): Promise<void> {
    const { metadata_type_uuid } = params
    const id = await this.findAssetId(params)
    const path = `asset/changemetadatatype/asset/${id}/type/${metadata_type_uuid}`

    return this._client.sendRequest({
      apiVersion: '1',
      method: 'PUT',
      path,
    })
  }

  /**
   * Update an asset's `security` fields
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/assetUpdateSecurity}
   */
  public async updateSecurity(params: UpdateSecurityParams): Promise<void> {
    const { external_id: _1, filename: _2, id: _3, patch, ...body } = params
    const id = await this.findAssetId(params)
    const path = `assets/${id}/security`
    const queryStringParams = {
      patch: patch ?? Object.keys(body),
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'PUT',
      body,
      path,
      queryStringParams,
    })
  }

  /**
   * Upload a new file as an alternate preview to an Asset
   * @param params Information about the request
   * @returns Promise containing no information
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/alternatePreviewUpload}
   */
  public async uploadAlternatePreview(
    params: UploadAlternatePreviewParams
  ): Promise<void> {
    const { file } = params
    const id = await this.findAssetId(params)
    const path = `assets/${id}/alternatepreview`

    const body = new FormData()
    body.append('file', file)

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path,
      body,
    })
  }

  /**
   * Upload each piece of the file. The `tag` in each Upload Chunk response must be used in the Complete Chunked Upload call
   * @param params Information about the request
   * @returns Promise containing the tag for the chunk
   * @see {@link https://docs.acquia.com/acquia-dam/api-v2#tag/Assets/operation/uploadChunk1}
   */
  public uploadChunk(params: UploadChunkParams): Promise<UploadChunkResult> {
    const body = new FormData()
    for (const [k, v] of Object.entries(params)) {
      body.append(k, v)
    }

    return this._client.sendRequest({
      apiVersion: '2',
      method: 'POST',
      path: 'uploads/chunks/upload',
      body,
    })
  }
}
