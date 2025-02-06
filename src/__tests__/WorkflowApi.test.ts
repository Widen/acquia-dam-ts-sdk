import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  addDeliverableResultSchema,
  createProjectResultSchema,
  getDeliverableResultSchema,
  getProjectResultSchema,
  listDeliverablesResultSchema,
  supportingFileSchema,
  uploadProofResultSchema,
} from '__models__/workflow-responses.zod'
import { WorkflowApi } from 'apis'
import AcquiaDAM from 'index'

let client: WorkflowApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ authToken: process.env.API_TOKEN }).workflow
})

describe('Workflow Projects: ', () => {
  const projectWithSupportingFiles = 'CON-0076'
  const testFileUrl =
    'https://connell.widen.net/content/xnego8jxfk/jpeg/test_from_node.jpeg'
  const testUser = 'jacob.williamson@acquia.com'
  let testProjectId: string, testDeliverableId: string

  it('Creates a project', async () => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 1)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 10)

    const result = await client.createProject({
      description: 'sdk-test',
      name: `sdk-test-${new Date().toISOString()}`,
      project_manager: testUser,
      start_date: startDate,
      end_date: endDate,
    })

    testProjectId = result.project_id

    expect(() => createProjectResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Adds a deliverable to a project', async () => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 2)
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 5)
    const result = await client.addDeliverable({
      project_id: testProjectId,
      description: 'test deliverable',
      due_date: dueDate,
      name: 'test deliverable',
      proof_provider: testUser,
      start_date: startDate,
      stages: [
        {
          name: 'stage1',
          reviewers: [testUser],
          due_date: dueDate,
        },
      ],
    })

    testDeliverableId = result.deliverable_id

    expect(() =>
      addDeliverableResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Retrieves project data', async () => {
    const result = await client.getProject({
      project_id: testProjectId,
      expand: ['request_fields'],
    })

    expect(() => getProjectResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists supporting files', async () => {
    const result = await client.listSupportingFiles(projectWithSupportingFiles)

    expect(() => {
      result.forEach((r) => supportingFileSchema.strict().parse(r))
    }).not.toThrow()
  })

  it('Retrieves deliverable data', async () => {
    const result = await client.getDeliverable({
      deliverable_id: testDeliverableId,
      project_id: testProjectId,
    })

    expect(() =>
      getDeliverableResultSchema.strict().parse(result)
    ).not.toThrow()
  })

  it('Uploads proof to a deliverable', async () => {
    const result = await client.uploadProof({
      project_id: testProjectId,
      deliverable_id: testDeliverableId,
      filename: 'sdk-test-file.jpg',
      url: testFileUrl,
      content_length: 1,
    })

    expect(() => uploadProofResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Lists deliverables', async () => {
    const result = await client.listDeliverables({
      project_id: testProjectId,
      expand: ['download_link', 'file_properties', 'proof_url'],
    })

    expect(() =>
      listDeliverablesResultSchema.strict().parse(result)
    ).not.toThrow()

    expect(() => {
      result.items.forEach((c) => getDeliverableResultSchema.strict().parse(c))
    }).not.toThrow()
  })

  it('Closes a deliverable', async () => {
    await expect(
      client.closeDeliverable({
        project_id: testProjectId,
        deliverable_id: testDeliverableId,
      })
    ).resolves.not.toThrow()
  })

  it('Deletes a deliverable', async () => {
    await expect(
      client.deleteDeliverable(testProjectId, testDeliverableId)
    ).resolves.not.toThrow()
  })

  it('Deletes a project', async () => {
    await expect(client.deleteProject(testProjectId)).resolves.not.toThrow()
  })
})
