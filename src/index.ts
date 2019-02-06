import Authentication from './authentication'
const { version } = require('../package.json')
import { version as platformVersion } from 'zapier-platform-core'

import fetchGame from './creates/fetchGame'
import fetchCompany from './creates/fetchCompany'

process.version

const App = {
  version,
  platformVersion,

  authentication: Authentication,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  triggers: {},

  searches: {},

  creates: {
    [fetchGame.key]: fetchGame,
    [fetchCompany.key]: fetchCompany
  }
}

export default App
