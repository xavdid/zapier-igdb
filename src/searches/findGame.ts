import { ZObject, Bundle } from 'zapier-platform-core'
import { endpoint } from '../utils'

interface GameRespone {
  id: number
  slug: string
}

export default {
  key: 'findGame',
  noun: 'Game',

  display: {
    label: 'Find Game',
    description: 'Search for a game by name'
  },

  operation: {
    inputFields: [
      { key: 'name', label: 'Game Name', type: 'string', required: true },
      { key: 'exact', label: 'Exact Match Only', type: 'boolean' }
    ],
    // bundle: { igdbId: string; raw?: boolean }
    perform: async (z: ZObject, bundle: Bundle) => {
      const rawResult = await z.request(endpoint('games'), {
        method: 'POST',
        body: `search "${bundle.inputData.name}"; fields slug;`,
        headers: { 'user-key': bundle.authData.userKey }
      })

      const games = rawResult.json as GameRespone[]

      if (bundle.inputData.exact && games.length !== 1) {
        return []
      }

      return games
    }
  }
}
