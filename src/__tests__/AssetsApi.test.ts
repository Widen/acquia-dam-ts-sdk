import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  getAssetResultSchema,
  searchAssetsResultSchema,
  completeChunkedUploadResultSchema,
  createAssetResultSchema,
  listAssetGroupsResultSchema,
  listVersionsResultSchema,
  metadataExpandSchema,
  securityExpandSchema,
  startChunkedUploadResultSchema,
  uploadChunkResultSchema,
  uploadProfileSchema,
  registerIntegrationLinkResultSchema,
  listIntegrationLinksResultSchema,
  listFileFormatsResultSchema,
} from '__models__/assets-responses.zod'
import { AssetsApi } from 'apis'
import AcquiaDAM from 'index'

let client: AssetsApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ authToken: process.env.API_TOKEN }).assets
})

describe('Assets: ', () => {
  const testAssetId = '0fc38f70-a092-40e5-b579-3fea806b1295'
  const testFileUrl =
    'https://connell.widen.net/content/xnego8jxfk/jpeg/test_from_node.jpeg'
  const testAssetMetadataUuid = '2eedfe73-cc6a-437a-9968-e35386c12e11'
  let testFilename = `sdk-test-${new Date().toISOString()}`
  let testVersionId: string
  let testModifyAssetId: string
  let testAssetExtId: string
  let testAssetFilename: string
  let testIntegrationLinkId: string

  it('Lists asset groups', async () => {
    const result = await client.listAssetGroups()

    expect(() =>
      listAssetGroupsResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists file formats', async () => {
    const result = await client.listFileFormats()

    expect(() =>
      listFileFormatsResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists upload profiles', async () => {
    const result = await client.listUploadProfiles()

    expect(() => {
      result.forEach((up) => uploadProfileSchema.strict().parse(up))
    }).not.toThrow()
  })

  it('Searches for assets with no parameters set', async () => {
    const result = await client.searchAssets()

    expect(() => searchAssetsResultSchema.strict().parse(result)).not.toThrow()

    expect(() => {
      result.items.forEach((a) => getAssetResultSchema.strict().parse(a))
    }).not.toThrow()
  })

  it('Searches for assets using scroll', async () => {
    const result = await client.searchAssets({
      expand: [
        'asset_properties',
        'file_properties',
        'metadata',
        'metadata_info',
        'metadata_vocabulary',
        'security',
        'thumbnails',
      ],
      limit: 1,
      facet: ['categories', 'file_types', 'metadata'],
      include_archived: true,
      include_deleted: true,
      query: 'test',
      scroll: true,
      search_document_text: true,
      sort: '-created_date',
    })
    expect(() => searchAssetsResultSchema.strict().parse(result)).not.toThrow()

    expect(() => {
      result.items.forEach((a) => getAssetResultSchema.strict().parse(a))
    }).not.toThrow()

    await expect(
      client.searchAssets({ scroll_id: result.scroll_id ?? '' })
    ).resolves.not.toThrow()
  })

  it('Retrieves an asset using UUID', async () => {
    const result = await client.getAsset({
      id: testAssetId,
      expand: [
        'asset_properties',
        'file_properties',
        'metadata',
        'metadata_info',
        'metadata_vocabulary',
        'security',
        'status',
        'thumbnails',
      ],
    })

    testAssetExtId = result.external_id
    testAssetFilename = result.filename

    expect(() => getAssetResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves an asset using External ID', async () => {
    const result = await client.getAsset({
      external_id: testAssetExtId,
    })

    expect(() => getAssetResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves an asset using Filename', async () => {
    const result = await client.getAsset({
      filename: testAssetFilename,
    })

    expect(() => getAssetResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists asset versions', async () => {
    const result = await client.listVersions({
      id: testAssetId,
    })

    testVersionId = result.versions[0].uuid

    expect(() => listVersionsResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Gets asset with version', async () => {
    const result = await client.getAsset({
      id: testAssetId,
      version_id: testVersionId,
    })

    expect(() => getAssetResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Gets asset metadata', async () => {
    const result = await client.getMetadata({ id: testAssetId })

    expect(() => metadataExpandSchema.strict().parse(result)).not.toThrow()
  })

  it('Gets asset security', async () => {
    const result = await client.getSecurity({ id: testAssetId })

    expect(() => securityExpandSchema.strict().parse(result)).not.toThrow()
  })

  it('Creates an asset using chunked upload', async () => {
    const result1 = await client.startChunkedUpload()
    const result2 = await client.uploadChunk({
      chunk_number: 1,
      file: 'test data',
      session_id: result1.session_id,
    })
    const result3 = await client.completeChunkedUpload({
      session_id: result1.session_id,
      tags: [`${result2.tag}`],
    })

    const result4 = await client.createAsset({
      file_id: result3.file_id,
      filename: testFilename,
      profile: 'api',
      metadata: { autocompleterfield: ['microwave'] },
    })

    if (!result4.id) {
      throw new Error('Asset ID is null')
    }

    testModifyAssetId = result4.id

    expect(() =>
      startChunkedUploadResultSchema.strict().parse(result1)
    ).not.toThrow()
    expect(() => uploadChunkResultSchema.strict().parse(result2)).not.toThrow()
    expect(() =>
      completeChunkedUploadResultSchema.strict().parse(result3)
    ).not.toThrow()
    expect(() => createAssetResultSchema.strict().parse(result4)).not.toThrow()
  })

  it('Creates an asset using file content', async () => {
    const result = await client.createAsset({
      file: 'test data 2',
      filename: testFilename,
      profile: 'api',
    })

    expect(() => createAssetResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Creates an asset using URL', async () => {
    const result = await client.createAsset({
      url: testFileUrl,
      filename: testFilename,
      profile: 'api',
    })

    expect(() => createAssetResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Uploads an alternate preview', async () => {
    await expect(
      client.uploadAlternatePreview({
        id: testModifyAssetId,
        file: 'testfiledata',
      })
    ).resolves.not.toThrow()
  })

  it('Deletes an alternate preview', async () => {
    await expect(
      client.deleteAlternatePreview({ id: testModifyAssetId })
    ).resolves.not.toThrow()
  })

  it('Renames an asset', async () => {
    testFilename = `sdk-test-rename-${new Date().toISOString()}`.replaceAll(
      ':',
      ''
    )

    await expect(
      client.renameAsset({
        id: testModifyAssetId,
        new_filename: testFilename,
      })
    ).resolves.not.toThrow()
  })

  it('Updates asset metadata', async () => {
    await expect(
      client.updateMetadata({
        id: testModifyAssetId,
        fields: { textfield: ['test text'] },
      })
    ).resolves.not.toThrow()
  })

  it('Updates asset metadata type', async () => {
    await expect(
      client.updateMetadataType({
        id: testModifyAssetId,
        metadata_type_uuid: testAssetMetadataUuid,
      })
    ).resolves.not.toThrow()
  })

  it('Updates asset security', async () => {
    await expect(
      client.updateSecurity({
        id: testModifyAssetId,
        asset_groups: ['public'],
        expiration_date: new Date(),
        patch: ['all'],
      })
    ).resolves.not.toThrow()
  })

  it('Registers an integration link without URL', async () => {
    const result = await client.registerIntegrationLink({
      id: testModifyAssetId,
      description: 'Testing SDK',
    })

    expect(() =>
      registerIntegrationLinkResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Registers an integration link with URL', async () => {
    const result = await client.registerIntegrationLink({
      id: testModifyAssetId,
      description: 'Testing SDK',
      url: 'https://example.com/abc',
    })

    testIntegrationLinkId = result.uuid

    expect(() =>
      registerIntegrationLinkResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Lists integration links', async () => {
    const result = await client.listIntegrationLinks()

    expect(() =>
      listIntegrationLinksResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Removes an integration link', async () => {
    await expect(
      client.removeIntegrationLink(testIntegrationLinkId)
    ).resolves.not.toThrow()
  })

  it('Deletes an asset', async () => {
    await expect(
      client.deleteAsset({ id: testModifyAssetId })
    ).resolves.not.toThrow()
  })
})
