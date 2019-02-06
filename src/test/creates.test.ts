import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)
const userKey = process.env.USER_KEY as string

describe('Creates', () => {
  test('no-op', () => undefined) // jest wants at least 1 test
  // describe('fetchGame', () => {
  //   test('it should fetch data for a steam game', async () => {
  //     const bundle = {
  //       authData: { userKey },
  //       inputData: {
  //         slug: 'cosmic-express'
  //       }
  //     }
  //     const response = await appTester(
  //       App.creates.fetchGameData.operation.perform,
  //       bundle
  //     )
  //     expect(response.id).toBe(27328)
  //     expect(response.steamId).toBe('583270')
  //     expect(response.images.cover).toBeDefined()
  //     expect(response.images.cover.includes('steam')).toBe(true)
  //     expect(response.series).toBeUndefined()
  //   })
  //   test('it should fetch data for series non-steam game', async () => {
  //     const bundle = {
  //       authData: { userKey },
  //       inputData: {
  //         slug: 'god-of-war--1'
  //       }
  //     }
  //     const response = await appTester(
  //       App.creates.fetchGameData.operation.perform,
  //       bundle
  //     )
  //     expect(response.id).toBe(19560)
  //     expect(response.steamId).toBeFalsy()
  //     expect(response.images.cover).toBeDefined()
  //     expect(response.images.cover.includes('steam')).toBe(false)
  //     expect(response.series).toBeDefined()
  //   })
  // })
  //   describe('fetchCompanies', () => {
  //     test('it should fetch company data', async () => {
  //       const bundle = {
  //         authData: { userKey },
  //         inputData: {
  //           igdbId: '19560'
  //         }
  //       }
  //       const response = await appTester(
  //         App.creates.fetchCompanyData.operation.perform,
  //         bundle
  //       )
  //       expect(response.data![0].id).toBeTruthy()
  //       expect(response.data![0].name).toBeTruthy()
  //       expect(response.data![0].logoUrl).toBeUndefined()
  //       expect(response.jsonStr).toBeUndefined()
  //     })
  //     test('it should fetch raw company data', async () => {
  //       const bundle = {
  //         authData: { userKey },
  //         inputData: {
  //           igdbId: '19560',
  //           raw: true
  //         }
  //       }
  //       const response = await appTester(
  //         App.creates.fetchCompanyData.operation.perform,
  //         bundle
  //       )
  //       expect(response.jsonStr).toBeTruthy()
  //       expect(typeof response.jsonStr).toBe('string')
  //       expect(response.data).toBeUndefined()
  //     })
  //   })
  // describe('fetch game by steam', () => {
  //   test('it should fetch data for a steam game', async () => {
  //     const bundle = {
  //       authData: { userKey },
  //       inputData: {
  //         steamId: '368340'
  //       }
  //     }
  //     const response = await appTester(
  //       App.creates.fetchGameBySteamId.operation.perform,
  //       bundle
  //     )
  //     expect(response).toEqual({ slug: 'crosscode' })
  //   })
  // })
  // test('it should fail to find data for a non-existant steam game', async () => {
  //   const bundle = {
  //     authData: { userKey },
  //     inputData: {
  //       steamId: '25'
  //     }
  //   }
  //   const response = await appTester(
  //     App.creates.fetchGameBySteamId.operation.perform,
  //     bundle
  //   )
  //   expect(response).toEqual({})
  // })
})
