import { createAppTester, tools } from 'zapier-platform-core'
tools.env.inject()

import App from '../index'
const appTester = createAppTester(App)
const userKey = process.env.USER_KEY as string

describe('Creates', () => {
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
  //     expect(response.series).toBeDefined()
  //   })
  // })
  // describe('fetchCompanies', () => {
  //   test('it should fetch company data', async () => {
  //     const bundle = {
  //       authData: { userKey },
  //       inputData: {
  //         igdbId: '19560'
  //       }
  //     }
  //     const response = await appTester(
  //       App.creates.fetchCompanyData.operation.perform,
  //       bundle
  //     )
  //     expect(response.data![0].id).toBeTruthy()
  //     expect(response.jsonStr).toBeUndefined()
  //   })
  //   test('it should fetch raw company data', async () => {
  //     const bundle = {
  //       authData: { userKey },
  //       inputData: {
  //         igdbId: '19560',
  //         raw: true
  //       }
  //     }
  //     const response = await appTester(
  //       App.creates.fetchCompanyData.operation.perform,
  //       bundle
  //     )
  //     expect(response.jsonStr).toBeTruthy()
  //     expect(response.data).toBeUndefined()
  //   })
  // })
})
