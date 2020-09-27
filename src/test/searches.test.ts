import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)
const access_token = process.env.ACCESS_TOKEN as string

describe('Creates', () => {
  describe('fetchGame', () => {
    test('it should find a bunch of games', async () => {
      const bundle = {
        authData: { access_token },
        inputData: {
          name: 'The Room 2'
        }
      }
      const response = await appTester(
        App.searches.findGame.operation.perform,
        bundle
      )
      expect(response).toBeInstanceOf(Array)
      expect(response.length).toBeGreaterThan(3)
      expect(response[0].slug).toBeTruthy()
    })

    test('it should fail to find ambiguous games', async () => {
      const bundle = {
        authData: { access_token },
        inputData: {
          name: 'The Room 2',
          exact: true
        }
      }
      const response = await appTester(
        App.searches.findGame.operation.perform,
        bundle
      )
      expect(response).toBeInstanceOf(Array)
      expect(response.length).toEqual(0)
    })

    test('it should fetch data for a steam game', async () => {
      const bundle = {
        authData: {
          access_token
        },
        inputData: {
          name: 'The Witcher 3: Game of the Year',
          exact: true
        }
      }
      const response = await appTester(
        App.searches.findGame.operation.perform,
        bundle
      )
      // console.log(response.json)
      expect(response).toBeInstanceOf(Array)
      expect(response.length).toEqual(1)
      expect(response[0].slug).toBeTruthy()
    })
  })
})
