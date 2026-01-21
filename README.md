# Acquia DAM SDK

> AcquiaDAM REST API client for JavaScript and TypeScript

## Installation

Install the package from NPM using your package manager:

### NPM

```bash
npm install acquia-dam-sdk
```

### Yarn

```bash
yarn add acquia-dam-sdk
```

## Quick Start Guide

After installing, use the following code to get started

```js
import AcquiaDAM from 'acquia-dam-sdk'

// Create an instance of the Acquia DAM Class
const dam = new AcquiaDAM({ accessToken: 'YOUR ACCESS TOKEN' })

// Start performing actions. For example, search for images
const searchResult = await dam.assets.searchAssets({ query: 'FileType: image' })
```

The AcquiaDAM class provides access to all API features, separated out into components. The following components are available for use:

- analytics
- assets
- attributes
- categories
- collections
- metadata
- orders
- products
- searchConnector
- usage
- users
- webhooks
- workflow

All functions use a promise-based interface.

## Usage

The main functionality is provided by the AcquiaDAM class, which can be accessed using the following statements:

```js
// ESModule Syntax
import AcquiaDAM from 'acquia-dam-sdk'

// CommonJS Syntax
const AcquiaDAM = require('acquia-dam-sdk').default

const dam = new AcquiaDAM({ accessToken: 'YOUR ACCESS TOKEN' })
```

To obtain references to multiple components, use the destructuring syntax:

```js
const { assets, products } = dam
```

From here, you can perform operations on the DAM by calling functions on their respective components.

Types are included for all components. To import a type, use the following syntax:

```ts
import type { SearchAssetsParams } from 'acquia-dam-sdk/assets/requests'
import type { Asset } from 'acquia-dam-sdk/assets/responses'
```

Any function request type can be included by following the pattern:

```ts
import type { xyz } from 'acquia-dam-sdk/[component]/requests'
```

And similarly for function responses:

```ts
import type { xyz } from 'acquia-dam-sdk/[component]/responses'
```

Lastly for types, all Webhook event types can be imported:

```ts
import type { AssetCreatedEvent } from 'acquia-dam-sdk/events/assets'
import type { ProjectCreated } from 'acquia-dam-sdk/events/workflow'
```

## Error Handling

All errors from the package are thrown in AcquiaDAMError class, which includes 3 fields:

- `message`: A string containing all the information in the below fields
- `type`: Either 'HTTP Error' when the API returns a 4xx or 5xx status code, or 'SDK Error' when there is some other error with the input
- `statusCode`: If the `type` is 'HTTP Error', this is the numerical error code returned by the API. Otherwise it is undefined.
- `body`: If the `type` is 'HTTP Error', it is the body returned by the API. Otherwise, it is a string describing the error.

## Request Client

The package includes a fetch-based client to handle communication between the client and the server. This client does not include any automatic retry logic or handling of OAuth token exchanges. The base client may be extended with your own implementation. Then, you may pass an instance of your own client implementation to the AcquiaDAM constructor:

```js
import AcquiaDAM from 'acquia-dam-sdk'
import { ApiClient, AcquiaDAMError } from 'acquia-dam-sdk/client'

class MyClient extends ApiClient {
  // Enhanced Implementation
}

const myClient = new MyClient()

// Create an instance of the AcquiaDAM class that uses the new client implementation
const dam = new AcquiaDAM({
  accessToken: 'ACCESS TOKEN HERE',
  client: myClient,
})
```

## Making custom API calls

The client may be used directly to make a custom API call:

```js
import AcquiaDAM from 'acquia-dam-sdk'

const client = new AcquiaDAM({ accessToken: 'ACCESS TOKEN HERE' }).client

const response = client.sendRequest({
  method: 'GET', // HTTP Method
  apiVersion: '2', // '1', or '2', determines the base URL for the request, corresponding to the API v1 or v2 base URLs
  path: 'path/to/resource', // The path to the resource
  queryStringParams: {}, // Object containing key-value pairs that will be converted into a query string
  body: {}, // JSON data or FormData
})
```

## Underlying Usage of the Acquia DAM API

The SDK makes use of both the V1 and V2 APIs. The `@see` attribute tag is included in each function's documentation linking to the respective API endpoint documentation. The SDK only calls the V1 API for functionality that is exclusive to the V1 API. In all other cases, the V2 API is used.

## Additional Resources

- [Full SDK Documentation](https://docs.acquia.com/acquia-dam/developer/typescript-sdk)
- [V2 API Reference](https://docs.acquia.com/acquia-dam/api-v2)
- [V1 API Reference](https://docs.acquia.com/acquia-dam/api-v1)
- [API FAQ](https://community.acquia.com/acquiadam/s/article/API-FAQs)
- [API Developer Blog](https://dev.acquia.com/blog?f%5B0%5D=product%3A2796&page=0)
