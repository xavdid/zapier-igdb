import should = require('should')

import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)

describe('My Test', () => {
  it('should test the auth succeeds', async () => {
    const bundle = {
      authData: {
        userKey: process.env.USER_KEY as string
      }
    }

    const response = await appTester(App.authentication.test, bundle)
    should(response.status).eql(200)
  })

  it('should test the auth fails', async () => {
    const bundle = {
      authData: {
        userKey: 'asdf'
      }
    }

    try {
      await appTester(App.authentication.test, bundle)
      should.fail('No Error', 'A bad auth should throw')
    } catch {
      return
    }
  })
})
