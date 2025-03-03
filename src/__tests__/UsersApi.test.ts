import { expect, it, describe, beforeAll, jest } from '@jest/globals'
import {
  getContactResultSchema,
  getUserResultSchema,
} from '__models__/users-responses.zod'
import { UsersApi } from 'apis'
import AcquiaDAM from 'index'

let client: UsersApi

jest.retryTimes(3, { logErrorsBeforeRetry: true })

beforeAll(() => {
  if (!process.env.API_TOKEN) {
    throw new Error('API_TOKEN environment variable not set')
  }

  client = new AcquiaDAM({ accessToken: process.env.API_TOKEN }).users
})

describe('Users: ', () => {
  const testUserId = 'f0fbf84f-eaca-4806-a14d-fac5f55ef038'

  it('Retrieves user data for the associated access token', async () => {
    const result = await client.getUser()

    expect(() => getUserResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves user data for the specified user ID', async () => {
    const result = await client.getUser(testUserId)

    expect(() => getUserResultSchema.strict().parse(result)).not.toThrow()
  })

  it('Retrieves contatct data for the associated access token', async () => {
    const result = await client.getContact()

    expect(() => getContactResultSchema.strict().parse(result)).not.toThrow()
  })
})
