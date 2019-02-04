import should = require('should')

import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)

describe.only('Creates', () => {
  it('should fetch data for a steam game', async () => {
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

    response.id.should.equal(27328)
    response.steamId.should.equal('583270')
    should.exist(response.images.cover)
  })
})
