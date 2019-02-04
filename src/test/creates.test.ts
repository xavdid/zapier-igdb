import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)

describe.only('Creates', () => {
  test('should fetch data for a steam game', async () => {
    const bundle = {
      authData: {
        userKey: process.env.USER_KEY as string
      },
      inputData: {
        slug: 'cosmic-express'
      }
    }

    const response = await appTester(
      App.creates.fetchGameData.operation.perform,
      bundle
    )

    expect(response.id).toBe(27328)
    expect(response.steamId).toBe('583270')
    expect(response.images.cover).toBeDefined()
  })
})
