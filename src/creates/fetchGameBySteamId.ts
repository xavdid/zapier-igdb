import { ZObject, Bundle } from 'zapier-platform-core'
import { endpoint, STEAM_CATEGORY } from '../utils'

interface GameRespone {
  id: number
  slug: string
}

export default {
  key: 'fetchGameBySteamId',
  noun: 'GameData',

  display: {
    label: 'Fetch Game Data From Steam ID',
    description: 'Pulls data from the IGDB API for a game based on a steam ID'
  },

  operation: {
    inputFields: [{ key: 'steamId', type: 'string', required: true }],
    // bundle: <{ slug: string }>
    perform: async (z: ZObject, bundle: Bundle) => {
      const anchoredTry = await z.request(endpoint('games'), {
        method: 'POST',
        body: `fields slug; where websites.url ~ *"/${bundle.inputData.steamId}" & websites.category = 13 & websites.url = *"store.steampowered"*;`
      })
      anchoredTry.throwForStatus()

      const anchoredResult = anchoredTry.json as GameRespone[]

      if (anchoredResult.length === 1) {
        return { slug: anchoredResult[0].slug }
      }

      const unAnchoredTry = await z.request(endpoint('games'), {
        method: 'POST',
        body: `fields slug; where websites.url ~ *"store.steampowered.com/app/${bundle.inputData.steamId}/"* & websites.category = ${STEAM_CATEGORY};`
      })
      unAnchoredTry.throwForStatus()

      const unAnchoredResult = unAnchoredTry.json as GameRespone[]

      if (unAnchoredResult.length === 1) {
        return { slug: unAnchoredResult[0].slug }
      }

      return {}
    }
  }
}
