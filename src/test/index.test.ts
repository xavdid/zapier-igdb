import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)

describe('My Test', () => {
  test('should test the auth succeeds', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN as string
      }
    }

    const response = (await appTester(App.authentication.test, bundle)) as any
    expect(response.status).toEqual(200)
    expect(response.json.client_id).toEqual(process.env.CLIENT_ID)
  })

  test('should test the auth fails', async () => {
    const bundle = {
      authData: {
        access_token: 'asdf'
      }
    }

    try {
      await appTester(App.authentication.test, bundle)
      throw new Error('bad auth should fail')
    } catch {
      return
    }
  })
})
