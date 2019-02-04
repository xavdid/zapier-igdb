import Authentication from './authentication'
const { version } = require('../package.json')
import { version as platformVersion } from 'zapier-platform-core'
import FetchGameData from './creates/fetchGame'

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

  creates: { [FetchGameData.key]: FetchGameData }
}

export default App
