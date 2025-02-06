export interface InstantSearchConnectorParams {
  /** Flag to remove the search bar from the user interface. Useful when used with the optional query parameter to simply present a set of search results */
  hideSearchBar?: boolean
  /** Search term to initially seed the Search Connector results page */
  query?: string
}
