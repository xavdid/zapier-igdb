import { version as platformVersion } from 'zapier-platform-core'
const { version } = require('../package.json')

import Authentication from './authentication'

import findGame from './searches/findGame'

import fetchGameData from './creates/fetchGame'
import fetchCompanyData from './creates/fetchCompany'
import fetchGameBySteamId from './creates/fetchGameBySteamId'

const App = {
  version,
  platformVersion,

  authentication: Authentication.config,

  beforeRequest: Authentication.befores,
  afterResponse: Authentication.afters,

  searches: {
    [findGame.key]: findGame
  },

  creates: {
    fetchGameData,
    fetchCompanyData,
    fetchGameBySteamId
  }
}

export default App
