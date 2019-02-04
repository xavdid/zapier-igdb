import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)

describe('My Test', () => {
  test('should test the auth succeeds', async () => {
    const bundle = {
      authData: {
        userKey: process.env.USER_KEY as string
      }
    }

    const response = await appTester(App.authentication.test, bundle)
    expect(response.status).toEqual(200)
  })

  test('should test the auth fails', async () => {
    const bundle = {
      authData: {
        userKey: 'asdf'
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
