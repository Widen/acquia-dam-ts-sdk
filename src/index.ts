import {
  AnalyticsApi,
  AssetsApi,
  AttributesApi,
  CategoriesApi,
  CollectionsApi,
  MetadataApi,
  OrdersApi,
  ProductsApi,
  SearchConnectorApi,
  UsageApi,
  UsersApi,
  WebhooksApi,
  WorkflowApi,
} from 'apis'
import { ApiClient } from 'client'

export interface AcquiaDAMParams {
  /** Acquia DAM Personal Access Token or OAuth Access Token */
  accessToken?: string
  /** Optionally, provide your own implementation of the API client */
  client?: ApiClient
}

export default class AcquiaDAM {
  private _client: ApiClient

  private _analyticsApi?: AnalyticsApi
  private _assetsApi?: AssetsApi
  private _attributesApi?: AttributesApi
  private _categoriesApi?: CategoriesApi
  private _collectionsApi?: CollectionsApi
  private _metadataApi?: MetadataApi
  private _ordersApi?: OrdersApi
  private _productsApi?: ProductsApi
  private _searchConnectorApi?: SearchConnectorApi
  private _usageApi?: UsageApi
  private _usersApi?: UsersApi
  private _webhooksApi?: WebhooksApi
  private _workflowApi?: WorkflowApi

  /**
   * Create an instance of the Acquia DAM Module.
   *
   * Provides access to all Acquia DAM API functions.
   *
   * @param params Information for creating the client
   */
  public constructor(params?: AcquiaDAMParams) {
    this._client = params?.client ?? new ApiClient(params?.accessToken)
  }

  /**
   * Retrieve the ApiClient instance.
   */
  public get client(): ApiClient {
    return this._client
  }

  /**
   * Retrieve an instance of the AnalyticsApi class.
   *
   * The Analytics endpoints provide information about asset usage from the Insights application. The API will return download, view, and share details for a single asset.
   * Events may take up to 24 hours before appearing in analytics API results.
   * Note: Three years of analytics data is available, starting from January 1, 2021 onward. The default `date_range` filter is from this date until today.
   */
  public get analytics(): AnalyticsApi {
    this._analyticsApi ??= new AnalyticsApi(this._client)
    return this._analyticsApi
  }

  /**
   * Retrieve an instance of the AssetsApi class.
   *
   * Asset objects represent stored files in the DAM system. The API allows you to create, update, and delete Assets. You can search for assets, matching specific search criteria or load an individual asset by unique ID.
   */
  public get assets(): AssetsApi {
    this._assetsApi ??= new AssetsApi(this._client)
    return this._assetsApi
  }

  /**
   * Retrieve an instance of the AttributesApi class.
   *
   * The Attributes API lists all product attributes that have been configured in Entries, and all controlled vocabulary values for any single-select or multi-select attribute.
   */
  public get attributes(): AttributesApi {
    this._attributesApi ??= new AttributesApi(this._client)
    return this._attributesApi
  }

  /**
   * Retrieve an instance of the CategoriesApi class.
   *
   * Provides information about Categories and the Assets contained in them.
   */
  public get categories(): CategoriesApi {
    this._categoriesApi ??= new CategoriesApi(this._client)
    return this._categoriesApi
  }

  /**
   * Retrieve an instance of the CollectionsApi class.
   *
   * Provides information about global, shared, and private Collections.
   */
  public get collections(): CollectionsApi {
    this._collectionsApi ??= new CollectionsApi(this._client)
    return this._collectionsApi
  }

  /**
   * Retrieve an instance of the MetadataApi class.
   *
   * These endpoints allow you to retrieve or modify information about existing metadata fields. If you want to retrieve or modify metadata applied to a specific asset, use the AssetsApi.
   */
  public get metadata(): MetadataApi {
    this._metadataApi ??= new MetadataApi(this._client)
    return this._metadataApi
  }

  /**
   * Retrieve an instance of the OrdersApi class.
   *
   * Provides information about Orders and Conversions.
   */
  public get orders(): OrdersApi {
    this._ordersApi ??= new OrdersApi(this._client)
    return this._ordersApi
  }

  /**
   * Retrieve an instance of the ProductsApi class.
   *
   * The Products API provides access to product information stored in Acquia Entries. The API allows you to create, retrieve, delete, and update products.
   */
  public get products(): ProductsApi {
    this._productsApi ??= new ProductsApi(this._client)
    return this._productsApi
  }

  /**
   * Retrieve an instance of the SearchConnectorApi class.
   *
   * The Instant Search Connector allows external applications access to Acquia DAM Asset search, without having to implement a native search UI.
   */
  public get searchConnector(): SearchConnectorApi {
    this._searchConnectorApi ??= new SearchConnectorApi(this._client)
    return this._searchConnectorApi
  }

  /**
   * Retrieve an instance of the UsageApi class.
   *
   * Retrieve information about the monthly usage of the API.
   */
  public get usage(): UsageApi {
    this._usageApi ??= new UsageApi(this._client)
    return this._usageApi
  }

  /**
   * Retrieve an instance of the UsersApi class.
   *
   * Query for information about users.
   */
  public get users(): UsersApi {
    this._usersApi ??= new UsersApi(this._client)
    return this._usersApi
  }

  /**
   * Retrieve an instance of the WebhooksApi class.
   *
   * Create, list, read, ping, edit, and delete Acquia DAM webhook configurations. Create, List, and Delete Workflow Webhooks
   */
  public get webhooks(): WebhooksApi {
    this._webhooksApi ??= new WebhooksApi(this._client)
    return this._webhooksApi
  }

  /**
   * Retrieve an instance of the WorkflowApi class.
   *
   * Workflow objects represent projects and deliverables stored in the Acquia Workflow system. The API allows you to retrieve, create, delete, and close deliverables and projects.
   */
  public get workflow(): WorkflowApi {
    this._workflowApi ??= new WorkflowApi(this._client)
    return this._workflowApi
  }

  /**
   * Set the client's access token.
   */
  public set accessToken(token: string) {
    this._client.accessToken = token
  }
}
