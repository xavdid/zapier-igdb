import { ZObject, Bundle } from 'zapier-platform-core'
import { endpoint, imageUrl, IMAGE_SIZES } from '../utils'

const STEAM_CATEGORY = 13

interface GameRespone {
  id: number
  name: string
  cover: {
    id: number
    image_id: string
  }
  websites?: Array<{
    id: number
    category: number
    trusted: boolean
    url: string
  }>
  collection?: { id: number; name: string }
}

export default {
  key: 'fetchGameData',
  noun: 'GameData',

  display: {
    label: 'Fetch Game Data From Slug',
    description: 'Pulls data from the IGDB API for a game'
  },

  operation: {
    inputFields: [{ key: 'slug', type: 'string', required: true }],
    // bundle: <{ slug: string }>
    perform: async (z: ZObject, bundle: Bundle) => {
      const rawResult = await z.request(endpoint('games'), {
        method: 'POST',
        body: `fields id, name, cover.image_id, websites.*, collection.name; where slug = "${
          bundle.inputData.slug
        }";`,
        headers: { 'user-key': bundle.authData.userKey }
      })

      const result = (rawResult.json as GameRespone[])[0]

      const res = {
        id: result.id,
        images: {
          cover: imageUrl(result.cover.image_id, IMAGE_SIZES.Cover),
          screenshot: imageUrl(result.cover.image_id, IMAGE_SIZES.Screenshot)
        },
        steamId: '',
        name: result.name,
        series: result.collection
      }

      const steamListing = (result.websites || []).filter(
        w => w.category === STEAM_CATEGORY
      )[0]
      if (steamListing) {
        const maybeSteamId = steamListing.url.match(/ered.com\/app\/(\d+)/)
        if (maybeSteamId) {
          res.steamId = maybeSteamId[1]
        }
      }

      return res
    }
  }
}
