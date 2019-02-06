import Authentication from './authentication'
const { version } = require('../package.json')
import { version as platformVersion } from 'zapier-platform-core'

import findGame from './searches/findGame'

import fetchGame from './creates/fetchGame'
import fetchCompany from './creates/fetchCompany'
import fetchGameBySteamId from './creates/fetchGameBySteamId'

const App = {
  version,
  platformVersion,

  authentication: Authentication,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  triggers: {},

  searches: {
    [findGame.key]: findGame
  },

  creates: {
    [fetchGame.key]: fetchGame,
    [fetchCompany.key]: fetchCompany,
    [fetchGameBySteamId.key]: fetchGameBySteamId
  }
}

export default App
